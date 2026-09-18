"""Published articles, read from the dashboard's output directory.

The dashboard writes one JSON file per published article. This module reads
them. Nothing is written back — the site's relationship to that directory is
read-only, so the two apps cannot corrupt each other's state.

Files are cached in memory and re-read only when their mtime changes, so a
newly published article appears on the next request without restarting the
site, while steady traffic costs one stat() per file rather than a parse.
"""
import json
import os
from datetime import datetime
from typing import Any, Dict, List, Optional

CONTENT_DIR = os.environ.get(
    "SITE_CONTENT_DIR", "/var/www/agenticai-dashboard/published/articles")

# The contract version app.seo.services.publisher writes. A file declaring
# anything else came from a newer dashboard than this site understands, so it
# is skipped rather than rendered with fields silently missing.
SUPPORTED_SCHEMA_VERSION = 1

_cache: Dict[str, Dict[str, Any]] = {}
_mtimes: Dict[str, float] = {}


def _read(path: str) -> Optional[Dict[str, Any]]:
    try:
        mtime = os.path.getmtime(path)
    except OSError:
        return None

    if _mtimes.get(path) == mtime and path in _cache:
        return _cache[path]

    try:
        with open(path, "r", encoding="utf-8") as fh:
            document = json.load(fh)
    except (OSError, json.JSONDecodeError):
        # One malformed file must not take the whole blog down.
        return None

    if document.get("schema_version") != SUPPORTED_SCHEMA_VERSION:
        return None

    _cache[path] = document
    _mtimes[path] = mtime
    return document


def _parse(value: Optional[str]) -> Optional[datetime]:
    if not value:
        return None
    try:
        return datetime.fromisoformat(value)
    except ValueError:
        return None


def get(slug: str, include_drafts: bool = False) -> Optional[Dict[str, Any]]:
    """One article by slug, or None."""
    # Reject anything that is not a bare slug before it reaches the path join,
    # so a crafted request cannot read outside the content directory.
    if not slug or "/" in slug or "\\" in slug or slug.startswith("."):
        return None

    document = _read(os.path.join(CONTENT_DIR, f"{slug}.json"))
    if document is None:
        return None
    if document.get("is_draft") and not include_drafts:
        return None
    return document


def all_articles(include_drafts: bool = False) -> List[Dict[str, Any]]:
    """Every published article, newest first."""
    if not os.path.isdir(CONTENT_DIR):
        return []

    articles = []
    for name in os.listdir(CONTENT_DIR):
        if not name.endswith(".json"):
            continue
        document = _read(os.path.join(CONTENT_DIR, name))
        if document is None:
            continue
        if document.get("is_draft") and not include_drafts:
            continue
        articles.append(document)

    articles.sort(key=lambda d: d.get("published_at") or "", reverse=True)
    return articles


def display_date(document: Dict[str, Any], field: str = "published_at") -> str:
    parsed = _parse(document.get(field))
    return parsed.strftime("%d %B %Y") if parsed else ""


def was_updated(document: Dict[str, Any]) -> bool:
    """True when the article was revised after publication.

    Compared by calendar date, not timestamp: every republish rewrites
    updated_at, so comparing exact times would label a same-day correction as
    "Updated" on the day it first went live, which reads as churn.
    """
    published = _parse(document.get("published_at"))
    updated = _parse(document.get("updated_at"))
    if not published or not updated:
        return False
    return updated.date() > published.date()


def iso_date(document: Dict[str, Any], field: str = "published_at") -> str:
    parsed = _parse(document.get(field))
    return parsed.date().isoformat() if parsed else ""


def reading_minutes(document: Dict[str, Any]) -> int:
    """Rounded up, floored at one. 200 wpm is the usual prose estimate."""
    words = len((document.get("html") or "").split())
    return max(1, round(words / 200))


def related(document: Dict[str, Any], limit: int = 2) -> List[Dict[str, Any]]:
    """Other articles to link to from this one.

    Every article pointing at two others is what keeps the scorer's no-orphan
    rule satisfiable as the blog grows; without it the newest post is always
    orphaned no matter how carefully it was written.
    """
    others = [a for a in all_articles() if a.get("slug") != document.get("slug")]
    return others[:limit]
