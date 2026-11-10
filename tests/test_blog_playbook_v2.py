"""Blog Playbook v2 — site tests: callout label, figures, author boxes,
FAQ HTML and the homepage "Latest from the blog" section.

Run from the repo root:  python -m pytest tests -q

playbook_v2_post.html is real dashboard output: tests/playbook/sample-v2.md
through playbook_render.to_html(md, v2=True) in agenticai-dashboard.
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
V2_HTML = (FIXTURES / "playbook_v2_post.html").read_text(encoding="utf-8")
OLD_HTML = (FIXTURES / "old_post.html").read_text(encoding="utf-8")


def test_free_label_callout_gets_the_callout_class():
    html = blog.playbook_html(V2_HTML)
    assert '<blockquote class="pb-callout">' in html
    assert html.count('<blockquote class="pb-callout">') == 1
    assert '<blockquote class="pb-example">' in html     # reserved labels keep theirs
    assert "<blockquote>" not in html


def test_custom_label_outside_a_playbook_post_is_left_alone():
    html = "<blockquote>\n<p><strong>Clinic hack:</strong> x</p>\n</blockquote>"
    assert blog.playbook_html(html) is html
    assert blog.playbook_html(OLD_HTML) is OLD_HTML


def test_v2_body_carries_figures_bold_and_safe_links():
    assert '<figure class="pb-figure">' in V2_HTML and "<figcaption>" in V2_HTML
    assert 'width="1536" height="1024"' in V2_HTML
    assert "<strong>Short answer:</strong>" in V2_HTML
    assert 'target="_blank" rel="noopener"' in V2_HTML
    assert '<a href="/pricing">pricing</a>' in V2_HTML


def _doc(slug, html, **extra):
    doc = {
        "schema_version": 1, "id": slug, "slug": slug, "title": f"Title {slug}",
        "meta_title": f"Title {slug}", "meta_description": "desc",
        "primary_keyword": "whatsapp automation", "html": html,
        "faqs": [{"question": "Q?", "answer": "A."}], "featured_image": "blog/x.webp",
        "featured_image_alt": "alt", "author": "Agentic AI Automation Editorial",
        "from_author_story": "A story.", "published_at": f"2026-10-0{len(slug) % 9 + 1}T00:00:00+00:00",
        "updated_at": "2026-10-01T00:00:00+00:00", "is_draft": False,
    }
    doc.update(extra)
    return doc


def _write(directory, doc):
    with open(os.path.join(directory, f"{doc['slug']}.json"), "w", encoding="utf-8") as fh:
        json.dump(doc, fh)


@pytest.fixture
def site(monkeypatch):
    directory = tempfile.mkdtemp(prefix="pb2-site-")
    monkeypatch.setattr(blog, "CONTENT_DIR", directory)
    blog._latest.update(at=0.0, posts=[])          # no cache across tests
    app.config["TESTING"] = True
    return app.test_client(), directory


def test_author_extras_empty_renders_nothing(site):
    client, directory = site
    _write(directory, _doc("plain", V2_HTML))
    body = client.get("/blog/plain").get_data(as_text=True)
    assert "authorbox" not in body


def test_author_extras_filled_render_three_boxes(site):
    client, directory = site
    _write(directory, _doc("extras", V2_HTML, author_extras={
        "best_pick": {"option": "WATI <Growth>", "reason_html": "<p><strong>cheapest</strong></p>"},
        "notice_html": "<p>Prices change.</p>",
        "must_do_html": ["<p>Verify</p>", "<p>Export</p>"],
    }))
    body = client.get("/blog/extras").get_data(as_text=True)
    assert body.count('<aside class="authorbox') == 3
    assert "WATI &lt;Growth&gt;" in body            # option is escaped text
    assert "<strong>cheapest</strong>" in body
    assert body.count("<li><p>") == 2


def test_faq_answer_html_on_page_plain_text_in_json_ld(site):
    client, directory = site
    _write(directory, _doc("faq", V2_HTML, faqs=[{
        "question": "Q?", "answer": "It is fast. See docs",
        "answer_html": '<p>It is <strong>fast</strong>. See <a href="/docs">docs</a></p>'}]))
    body = client.get("/blog/faq").get_data(as_text=True)
    assert "<div><p>It is <strong>fast</strong>." in body
    assert '"text": "It is fast. See docs"' in body


def test_old_faq_without_answer_html_unchanged(site):
    client, directory = site
    _write(directory, _doc("oldfaq", OLD_HTML))
    assert "<div><p>A.</p></div>" in client.get("/blog/oldfaq").get_data(as_text=True)


# ------------------------------------------------------------- homepage
def test_homepage_shows_three_latest_posts(site):
    client, directory = site
    for slug in ("a", "bb", "ccc", "dddd"):
        _write(directory, _doc(slug, V2_HTML))
    page = client.get("/")
    assert page.status_code == 200
    body = page.get_data(as_text=True)
    assert "Latest from the blog" in body
    assert body.count('<li class="homepost">') == 3
    assert 'href="/blog"' in body and "View all posts" in body
    assert 'width="1200" height="630"' in body and 'loading="lazy"' in body
    assert "Title dddd" in body and "Title a<" not in body       # newest three


def test_homepage_hides_section_when_source_down(site, monkeypatch):
    client, _ = site
    monkeypatch.setattr(blog, "CONTENT_DIR", "/does/not/exist")
    blog._latest.update(at=0.0, posts=[])

    def boom(*a, **k):
        raise OSError("disk gone")
    monkeypatch.setattr(blog, "all_articles", boom)
    page = client.get("/")
    assert page.status_code == 200
    assert "Latest from the blog" not in page.get_data(as_text=True)


def test_latest_is_cached(site, monkeypatch):
    client, directory = site
    _write(directory, _doc("a", V2_HTML))
    assert len(blog.latest()) == 1
    _write(directory, _doc("bb", V2_HTML))
    assert len(blog.latest()) == 1                               # within 10 minutes
    blog._latest["at"] = 0.0
    assert len(blog.latest()) == 2


def test_stylesheet_carries_the_v2_rules():
    css = (ROOT / "static/assets/css/components.css").read_text(encoding="utf-8")
    for rule in (".pb-callout", ".pb-figure", ".authorbox", ".homeposts"):
        assert rule in css, rule
