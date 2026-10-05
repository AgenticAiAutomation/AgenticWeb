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
