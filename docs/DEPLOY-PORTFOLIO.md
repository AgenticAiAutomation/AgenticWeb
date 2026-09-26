# Deploying `/portfolio` and the case-studies CTA

Replaces the `DEPLOY-CASE-STUDIES.md` that shipped inside `CaseStudy.zip`. That
document was written against assumptions that are no longer true on this box —
see [What changed from the zip's guide](#what-changed-from-the-zips-guide) at
the bottom before following anything you remember from it.

**Site:** `agenticaiautomation.co` — Flask/Gunicorn, service `agenticai`,
VPS path `/var/www/agenticai`, port 5001, running as root.
**Branch the VPS tracks:** `main`.
**Branch this work is on:** `feat/portfolio-page`.

---

## What ships

| Change | File |
|---|---|
| New `/portfolio` page | `templates/portfolio.html` (new), route in `app.py` |
| `SEE OUR WORK` banner + rewritten hero on `/case-studies` | `templates/case-studies.html` |
| `/portfolio` in the sitemap | `app.py` (`sitemap_core`) |
| Footer link to `/portfolio` on all 14 pages | every `templates/*.html` |
| Discovery files list the new page | `static/llms.txt`, `static/llms-full.txt` |

Nothing is served from `static/pages/`. The page is a normal Jinja template
behind a normal route, so it inherits the site's analytics, verification tags,
schema partials and canonical handling like every other page.

---

## 0. Before you touch anything

```bash
ssh root@187.127.173.209
```

Then, on the server:

```bash
cd /var/www/agenticai
git status
git branch --show-current
curl -sI https://agenticaiautomation.co/case-studies | head -3
systemctl status agenticai --no-pager | head -5
```

`git branch --show-current` must say `main`. If it says anything else, stop —
the deploy assumptions below are wrong and the pull will not do what you expect.

If that `curl` is not `200`, fix the live site first. Do not stack a release on
top of an already-broken page.

Take a backup of the one template this release rewrites:

```bash
mkdir -p /var/www/agenticai/backups
cp /var/www/agenticai/templates/case-studies.html /var/www/agenticai/backups/case-studies.html.bak.$(date +%Y%m%d_%H%M%S)
```

---

## 1. Push from the local clone

Local clone: `Documents/Agentic Automation/AgenticWeb-deploy`.

```bash
git checkout main
git merge --no-ff feat/portfolio-page
git push origin main
```

---

## 2. Pull and restart on the VPS

Three commands, one at a time, on the server:

```bash
cd /var/www/agenticai
```

```bash
git pull origin main
```

```bash
systemctl restart agenticai
```

---

## 3. Verify

```bash
systemctl status agenticai --no-pager | head -5
curl -sI https://agenticaiautomation.co/portfolio | head -3
curl -sI https://agenticaiautomation.co/case-studies | head -3
curl -s https://agenticaiautomation.co/sitemap-core.xml | grep portfolio
curl -s https://agenticaiautomation.co/llms.txt | grep -i portfolio
```

All three `curl -sI` calls must return `200`, and the last two must print a
line each.

Then open both pages in a real browser. `curl` proves the server answered; it
does not prove the flow diagrams animate, the phone mockup sits above its
caption, or the banner links where it should. Check on a phone too — the hero,
the trust row and the flow strips all reflow below 560px.

Last, submit the new URL so it gets picked up rather than waiting on a crawl:

- Google Search Console → URL Inspection → `https://agenticaiautomation.co/portfolio` → Request indexing
- Bing Webmaster Tools → Submit URL (or let IndexNow pick it up from the sitemap)

---

## 4. Rollback

The release is one merge commit, so the clean path is a revert:

```bash
cd /var/www/agenticai
git log --oneline -5
git revert --no-edit <the merge commit>
systemctl restart agenticai
curl -sI https://agenticaiautomation.co/case-studies | head -3
```

If you need `/case-studies` back immediately and want to think about the rest
later, restore just that template from the backup:

```bash
cp /var/www/agenticai/backups/case-studies.html.bak.<timestamp> /var/www/agenticai/templates/case-studies.html
systemctl restart agenticai
```

`/portfolio` will still answer 200 after that — it is a separate route and
template, and it does not depend on anything in `case-studies.html`.

---

## 5. Changelog entry

```
[2026-09-26] Added /portfolio — four automation builds (Kaushik Diagnostics,
  CA firm compliance RPA, WhatsApp lead funnel, insurance settlement
  extraction) with animated flow diagrams, the staff-side control room view,
  capacity/fallback specs and an objections FAQ. Rewrote the /case-studies
  hero so the two pages agree, and added a SEE OUR WORK banner above it.
  Replaced the site-wide footer line "No case studies published yet" with a
  link to /portfolio on all 14 templates. Added /portfolio to sitemap-core,
  llms.txt and llms-full.txt.
  Deployed via: normal Jinja template + Flask route on main.
  Rollback: git revert the merge commit, restart agenticai.
```

---

## What changed from the zip's guide

The guide in `CaseStudy.zip` was written against a stale picture of this box.
Recorded here so nobody follows it from memory later:

1. **Branch.** It says push to `server-state-20260824-pre-expand`. The VPS has
   tracked `main` since 2026-09-18 (`315e830`); that old branch is left in
   place only as an ancestor.
2. **Template filename.** It says to edit `templates/case_studies.html`. The
   file is `templates/case-studies.html`, with a hyphen.
3. **Serving method.** It proposes `send_from_directory('static/pages', ...)`
   as the "zero-risk" option. On this site that costs more than it saves: a
   raw static file gets no GTM container, no `google-site-verification` or
   `msvalidate.01` tag, no Organization/WebSite schema, no canonical, and no
   place in the sitemap. The page is a template behind a route instead.
4. **Editorial conflict.** It says to paste the banner above the existing
   `/case-studies` content and leave that content alone. The page's H1 was
   "We have no case studies published. That is deliberate," and its thesis is
   that a case study needs a named client, a stated measurement and written
   approval. A "SEE OUR WORK — live client builds" banner directly above that
   argues with it in the same viewport, on the one page whose whole job is
   credibility. The hero was rewritten so the two agree: the portfolio is the
   *work*, described as designed and scoped; the approved *numbers* are still
   pending.
5. **Banner styling.** The supplied snippet is a teal gradient taken from the
   portfolio page's palette. `/case-studies` renders on `--void` (#0a0908)
   with orange accents, so the banner uses the site's own tokens instead. The
   glowing text-pulse was dropped — the `.kicker` pip already animates, and
   two pulses on one banner is noise.
6. **NAP.** The supplied page said "Gurugram" in the header and
   "Gurugram / Faridabad" in the footer. Every other page, and the
   `ProfessionalService` schema, says Faridabad, Haryana. Now consistent.
7. **Phone number.** The supplied page had a `tel:` CTA. `SITE["phone"]` is
   deliberately empty on `main` (commits `47b1329`, `09c5b0c`): no public
   phone number, WhatsApp is the channel. The CTA is now a `wa.me` link.
8. **Two fixes to the supplied page itself**, both real rendering bugs:
   - `.phone-wrap` was `display:flex` with no `flex-direction`, so the caption
     rendered *beside* the phone and overflowed the grid column instead of
     sitting under it.
   - Every case study sits in a `.reveal` block at `opacity:0` until
     IntersectionObserver fires. With JS off that is a blank page, so there is
     now a `<noscript>` rule that unhides them.
