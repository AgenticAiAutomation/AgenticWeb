# Deploy — Blog Playbook styling (`feat/blog-playbook`)

Adds styling for Blog Playbook posts written in the dashboard. Older posts are
not changed.

## What changed

| File | Change |
|---|---|
| `blog.py` | New Jinja filter `playbook_html(html)` |
| `app.py` | One line registering the filter |
| `templates/blog-post.html` | `{{ article.html \| playbook_html \| safe }}` (was `\| safe`) |
| `static/assets/css/components.css` | `.pb-*` and `.postbody .table-scroll` rules after the `.postbody` table rules |
| `tests/test_blog_playbook.py`, `tests/fixtures/*.html` | Tests |

## What the filter does

It only acts on a post whose HTML has a `TL;DR` blockquote, which every Playbook
post opens with. It adds a class to blockquotes that start with a bold label:

| Label | Class |
|---|---|
| TL;DR | `pb-tldr` |
| Who this is for: | `pb-who` |
| Tip: / Pro tip: | `pb-tip` |
| Watch out: | `pb-warn` |
| Real example: | `pb-example` |
| Flow: | `pb-flow` |
| Next step: | `pb-cta` |

It also wraps each `<table>` in `<div class="table-scroll">` so wide tables scroll
on phones. Unknown blockquotes are untouched, as is any post without a TL;DR. On
any error it returns the input unchanged.

The CSS is in `static/assets/css/components.css` because that is what
`blog-post.html` loads. `static/css/theme.css` is not loaded by blog posts.

## Order

Deploy after the dashboard API (flag off) and before the dashboard frontend.
The order is not critical: with no Playbook posts published, nothing here
changes any page.

## Check

```
python -m pytest tests/test_blog_playbook.py -q
```

After the deploy, an existing post must look exactly as before. Browsers may hold
the old `components.css` until a hard refresh; that only affects Playbook posts.

## Rollback

Fastest: remove `| playbook_html` from `templates/blog-post.html` and restart.
Full: revert the commit.

---

# Blog Playbook v2 (`feat/blog-playbook-v2`, 2026-11-10)

Deploy **after** the dashboard API (migration 004 → API → web → this repo).
Nothing here needs the dashboard flag: a v2 post carries its HTML in the
published JSON, and the new fields are optional.

| File | Change |
|---|---|
| `blog.py` | Any non-reserved bold label on a blockquote in a Playbook post → `pb-callout` (the article's one free-label callout). `latest(limit)` for the homepage, cached 10 minutes, returns `[]` on any error. |
| `app.py` | Index route passes `latest_posts=blog.latest(3)` and `blog`. |
| `templates/index.html` | "Latest from the blog" before the FAQ: 3 newest posts (image 1200×630 lazy, title, author, date) + "View all posts" → `/blog`. Not rendered when there are no posts or the source fails. No other homepage change. |
| `templates/blog-post.html` | Author boxes (Best pick / Notice from the author / Must do) after "From the author", each only when filled. FAQ answer uses `answer_html` when present, else the old escaped `answer`. FAQPage JSON-LD unchanged (reads `answer`, plain text for v2). |
| `static/assets/css/components.css` | `.pb-callout`, `.pb-figure`, `.authorbox*`, `.homeposts` / `.homepost`. |
| `tests/test_blog_playbook_v2.py`, `tests/fixtures/playbook_v2_post.html` | Tests (fixture = dashboard v2 renderer output). |

`/blog` is served by this app (`blog.py`), not WordPress — the comment at the
top of `app.py` is out of date (see its NOTE further down).

**Media:** inline images arrive as `/static/blog/inline/<file>.webp`. The
dashboard writes them to `SITE_MEDIA_DIR/inline/`, the same directory nginx
already serves as `/static/blog/` for featured images — no nginx change.

**Rollback:** revert this branch's commit and restart the site. Posts keep
their HTML; author boxes and FAQ HTML simply stop showing.

Tests: `python -m pytest tests -q` (22 pass).
