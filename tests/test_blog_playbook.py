"""Blog Playbook — site tests for the playbook_html filter.

Run from the repo root:  python -m pytest tests/test_blog_playbook.py -q

The fixtures are real dashboard output: playbook_post.html is the Playbook
sample through the dashboard's Playbook converter, old_post.html is an older
style post through the legacy converter (agenticai-dashboard,
tests/playbook/sample.md and api/app/seo/services/playbook_render.py).
"""
import json
import os
import sys
import tempfile
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

import blog  # noqa: E402
from app import app  # noqa: E402

FIXTURES = Path(__file__).resolve().parent / "fixtures"
PLAYBOOK_HTML = (FIXTURES / "playbook_post.html").read_text(encoding="utf-8")
OLD_HTML = (FIXTURES / "old_post.html").read_text(encoding="utf-8")


# ------------------------------------------------------------ the filter
def test_old_post_is_returned_unchanged():
    assert blog.playbook_html(OLD_HTML) is OLD_HTML


def test_tip_quote_without_tldr_is_left_alone():
    html = "<blockquote>\n<p><strong>Tip:</strong> keep it.</p>\n</blockquote>\n<table></table>"
    assert blog.playbook_html(html) is html


@pytest.mark.parametrize("value", [None, "", "<p>no quotes</p>"])
def test_empty_or_plain_input(value):
    assert blog.playbook_html(value) is value


def test_playbook_post_gets_its_classes():
    html = blog.playbook_html(PLAYBOOK_HTML)
    for css in ("pb-tldr", "pb-who", "pb-tip", "pb-warn", "pb-example", "pb-flow", "pb-cta"):
        assert f'<blockquote class="{css}">' in html, css
    # Tip and Pro tip share a style.
    assert html.count('<blockquote class="pb-tip">') == 2
    assert html.count('<div class="table-scroll"><table>') == 2
    assert html.count("<blockquote>") == 0


def test_filter_only_adds_attributes_and_wrappers():
    html = blog.playbook_html(PLAYBOOK_HTML)
    stripped = (html.replace('<div class="table-scroll">', "").replace("</table></div>", "</table>"))
    for css in blog.PLAYBOOK_CLASSES.values():
        stripped = stripped.replace(f'<blockquote class="{css}">', "<blockquote>")
    assert stripped == PLAYBOOK_HTML


def test_filter_never_raises(monkeypatch):
    class Broken:
        def finditer(self, _):
            raise RuntimeError("boom")
    monkeypatch.setattr(blog, "_LABELLED_QUOTE", Broken())
    assert blog.playbook_html(PLAYBOOK_HTML) is PLAYBOOK_HTML


# ------------------------------------------------------------ the page
def _doc(slug, html):
    return {
        "schema_version": 1, "id": slug, "slug": slug, "title": f"Title {slug}",
        "meta_title": f"Title {slug}", "meta_description": "desc",
        "primary_keyword": "whatsapp automation", "html": html,
        "faqs": [{"question": "Q?", "answer": "A."}], "featured_image": None,
        "featured_image_alt": "", "author": "Agentic AI Automation Editorial",
        "from_author_story": "A story.", "published_at": "2026-10-01T00:00:00+00:00",
        "updated_at": "2026-10-01T00:00:00+00:00", "is_draft": False,
    }


@pytest.fixture
def client(monkeypatch):
    directory = tempfile.mkdtemp(prefix="pb-site-")
    for slug, html in (("old-post", OLD_HTML), ("playbook-post", PLAYBOOK_HTML)):
        with open(os.path.join(directory, f"{slug}.json"), "w", encoding="utf-8") as fh:
            json.dump(_doc(slug, html), fh)
    monkeypatch.setattr(blog, "CONTENT_DIR", directory)
    app.config["TESTING"] = True
    return app.test_client()


def test_old_post_page_is_byte_identical_with_and_without_the_filter(client, monkeypatch):
    with_filter = client.get("/blog/old-post").data
    monkeypatch.setitem(app.jinja_env.filters, "playbook_html", lambda html: html)
    without_filter = client.get("/blog/old-post").data
    assert with_filter == without_filter
    assert OLD_HTML.strip().encode() in with_filter


def test_playbook_post_page_is_styled(client):
    page = client.get("/blog/playbook-post")
    assert page.status_code == 200
    body = page.get_data(as_text=True)
    assert '<blockquote class="pb-tldr">' in body
    assert '<div class="table-scroll"><table>' in body
    assert "/static/assets/css/components.css" in body


def test_stylesheet_carries_the_playbook_rules():
    css = (ROOT / "static/assets/css/components.css").read_text(encoding="utf-8")
    for css_class in ("pb-tldr", "pb-who", "pb-tip", "pb-warn", "pb-example", "pb-flow",
                      "pb-cta", "table-scroll"):
        assert f".{css_class}" in css, css_class
