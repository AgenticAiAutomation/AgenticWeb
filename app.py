"""Agentic AI Automation — marketing site.

Routing, SEO endpoints and the shared context every template renders against.
The WordPress blog lives separately at /blog (nginx proxies it to
/var/www/blog); this app owns everything else.

Content lives in content.py so that copy edits never touch routing.
"""
import io
import os
from datetime import datetime

from flask import Flask, Response, abort, redirect, render_template, request

import blog
import content

app = Flask(__name__)

# Google Preferred Sources. Read through config.get() in templates so a missing
# key degrades to the button simply not rendering, rather than raising.
# See https://developers.google.com/search/docs/appearance/preferred-sources
app.config["PREFERRED_SOURCES_ENABLED"] = True

SITE = {
    "name": "Agentic AI Automation",
    "url": "https://agenticaiautomation.co",
    "email": "Contact@agenticAiAutomation.co",
    # Deliberately empty on main: the phone number is not shown publicly, and
    # WhatsApp is the contact channel. Do not repopulate this.
    "phone": "",
    "wa": "917982881739",
    "calendly": "https://calendly.com/agenticaiautomation",
    # The founder's name is not published on the site — main removed it from
    # the About page, titles and meta descriptions deliberately. Schema uses
    # the organisation as publisher rather than naming a Person.
    "founder_name": "",
    "brand": content.BRAND,
    "verification": content.VERIFICATION,
    "analytics": content.ANALYTICS,
    "blog_enabled": content.BLOG_ENABLED,
    "location": content.LOCATION,
    "nav_items": content.NAV_ITEMS,
    "services_nav": content.SERVICES_NAV,
    "socials": content.SOCIALS,
}


def ctx(**kwargs):
    """Merge page context over the site-wide defaults."""
    data = dict(SITE)
    data["year"] = datetime.now().year
    data.update(kwargs)
    return data


# ---------------------------------------------------------------------------
# 301 redirects — spec 01 §2. Never break a live URL; add here, never delete.
# ---------------------------------------------------------------------------
REDIRECTS_301 = {
    # The mascot page tested badly on trust — the audit called it out
    # explicitly. Its equity folds into /services.
    "/ai-executives": "/services",
    "/index.html": "/",
    "/services.html": "/services",
    # No blog exists. BLOG_ENABLED is False and nginx has no /blog location,
    # so this used to 301 into a 404. Points at the homepage instead.
    "/blog.html": "/",
    "/about.html": "/about",
}


CANONICAL_HOST = "agenticaiautomation.co"


@app.before_request
def apply_redirects():
    """One 301, never a chain.

    The host check runs first and redirects straight to the *final* path, so
    https://www.example/services/ becomes https://example/services in a single
    hop rather than www->www-no-slash->apex. Redirect chains leak a little
    PageRank per hop, which is exactly what this exists to avoid.
    """
    path = request.path.rstrip("/") or "/"
    target = REDIRECTS_301.get(path, path)

    query = request.query_string.decode("latin-1")
    suffix = ("?" + query) if query else ""

    # Canonical host. Always https: nginx terminates TLS and proxies over
    # http, so request.scheme here is http and cannot be trusted.
    host = request.host.split(":")[0].lower()
    if host != CANONICAL_HOST and host.endswith(CANONICAL_HOST):
        return redirect("https://%s%s%s" % (CANONICAL_HOST, target, suffix), code=301)

    if target != request.path:
        return redirect(target + suffix, code=301)
    return None


# ---------------------------------------------------------------------------
# Pages
# ---------------------------------------------------------------------------
@app.route("/")
def index():
    return render_template("index.html", **ctx(
        # Keeps main's positioning ("AI Employees for Your Business") but fits
        # the 60-char limit. The full 118-char version was truncated by Google
        # mid-phrase, so the words after "Business" never reached a searcher.
        title="AI Employees for Your Business | Agentic AI Automation",
        description="AI employees that handle your leads, appointments, invoices "
                    "and operations — 24/7, automatically. Live in 2 weeks. Book a "
                    "free automation audit.",
        canonical=f"{SITE['url']}/",
        page="home",
        hero=content.HERO,
        credentials=content.CREDENTIALS,
        results=content.RESULTS,
        how_we_work=content.HOW_WE_WORK,
        faqs=content.FAQS,
    ))


@app.route("/services")
def services():
    return render_template("services.html", **ctx(
        title="Automation Services — WhatsApp AI, n8n, UiPath, RPA",
        description="AI agent development, WhatsApp Business API automation, n8n "
                    "workflow builds, UiPath RPA and document processing. See scope, "
                    "timelines and what each engagement costs.",
        canonical=f"{SITE['url']}/services",
        page="services",
        crumbs=[{"name": "Home", "url": "/"}, {"name": "Services"}],
        services=content.SERVICES,
    ))


@app.route("/industries")
def industries():
    return render_template("industries.html", **ctx(
        title="Industry Automation — Healthcare, D2C, Legal, Logistics",
        description="How automation actually lands in healthcare, e-commerce, law "
                    "firms, manufacturing and logistics — the processes worth "
                    "automating first and the ones that are not.",
        canonical=f"{SITE['url']}/industries",
        page="industries",
        crumbs=[{"name": "Home", "url": "/"}, {"name": "Industries"}],
        industries=content.INDUSTRIES,
    ))


@app.route("/case-studies")
def case_studies():
    return render_template("case-studies.html", **ctx(
        title="Automation Case Studies | Agentic AI Automation",
        description="Named clients, measured before-and-after numbers, and what we "
                    "would do differently. Every figure here is signed off by the "
                    "client it belongs to.",
        canonical=f"{SITE['url']}/case-studies",
        page="case-studies",
        crumbs=[{"name": "Home", "url": "/"}, {"name": "Case studies"}],
        case_studies=content.CASE_STUDIES,
    ))


@app.route("/about")
def about():
    return render_template("about.html", **ctx(
        title="About — Automation Built by Practitioners | Agentic AI",
        description="Agentic AI Automation was built by our founder — 11 years in "
                    "enterprise IT, 9 building RPA. Read how we scope, price and "
                    "hand over automation work.",
        canonical=f"{SITE['url']}/about",
        page="about",
        crumbs=[{"name": "Home", "url": "/"}, {"name": "About"}],
    ))


@app.route("/contact")
def contact():
    return render_template("contact.html", **ctx(
        title="Contact Agentic AI Automation | Book an Automation Audit",
        description="Book a 45-minute automation audit, message us on WhatsApp, or "
                    "email the team directly. We reply within one business day.",
        canonical=f"{SITE['url']}/contact",
        page="contact",
        crumbs=[{"name": "Home", "url": "/"}, {"name": "Contact"}],
    ))


# NOTE: there is deliberately no /blog route here, and there is no blog. The
# WordPress install this once described was never created: /var/www/blog does
# not exist, nginx has no /blog location, and infra/nginx-blog-subfolder.conf
# is not on disk. content.BLOG_ENABLED stays False and nothing links to /blog.


@app.route("/privacy")
def privacy():
    return render_template("privacy.html", **ctx(
        title="Privacy Policy | Agentic AI Automation",
        description="How Agentic AI Automation collects, uses, stores and deletes "
                    "your data, and how to request a copy or removal.",
        canonical=f"{SITE['url']}/privacy",
        page="privacy",
        crumbs=[{"name": "Home", "url": "/"}, {"name": "Privacy policy"}],
    ))


@app.route("/terms")
def terms():
    return render_template("terms.html", **ctx(
        title="Terms of Service | Agentic AI Automation",
        description="Service agreement, IP ownership, payment terms and governing "
                    "law for Agentic AI Automation engagements.",
        canonical=f"{SITE['url']}/terms",
        page="terms",
        crumbs=[{"name": "Home", "url": "/"}, {"name": "Terms of service"}],
    ))



# ---------------------------------------------------------------------------
# Blog
#
# Articles are written by the dashboard into its published/ directory as JSON
# and read from there. No database, no CMS and no API call in the request path
# - the blog's only dependency is a directory this app reads and never writes.
# ---------------------------------------------------------------------------
@app.route("/blog")
def blog_index():
    articles = blog.all_articles()
    title = "Automation Blog - n8n, UiPath, WhatsApp API | Agentic AI"
    description = ("Workflow teardowns, RPA migration post-mortems and practical "
                   "write-ups on n8n, UiPath and WhatsApp automation, written from "
                   "production deployments.")
    return render_template("blog.html", **ctx(
        title=title,
        description=description,
        page_title=title,
        page_description=description,
        canonical=f"{SITE['url']}/blog",
        og_image=f"{SITE['url']}/static/images/og-default-v1.png",
        og_type="website",
        noindex=False,
        page="blog",
        crumbs=[{"name": "Home", "url": "/"}, {"name": "Blog"}],
        articles=articles,
        blog=blog,
    ))


@app.route("/blog/<slug>")
def blog_post(slug):
    # Drafts are reachable by direct URL so they can be previewed before
    # go-live, but they carry noindex and appear in neither the blog index nor
    # the sitemap.
    article = blog.get(slug, include_drafts=True)
    if article is None:
        abort(404)

    title = article.get("meta_title") or article["title"]
    description = article.get("meta_description") or ""
    image = (f"{SITE['url']}/static/blog/" + article["featured_image"].replace("blog/", "")
             if article.get("featured_image")
             else f"{SITE['url']}/static/images/og-default-v1.png")

    return render_template("blog-post.html", **ctx(
        title=title,
        description=description,
        page_title=title,
        page_description=description,
        canonical=f"{SITE['url']}/blog/{slug}",
        og_image=image,
        og_type="article",
        noindex=bool(article.get("is_draft")),
        page="blog",
        crumbs=[{"name": "Home", "url": "/"},
                {"name": "Blog", "url": "/blog"},
                {"name": article["title"]}],
        article=article,
        related=blog.related(article),
        blog=blog,
    ))


# ---------------------------------------------------------------------------
# Market pages - spec 09. Explicit routes, not a "/<slug>" converter, which
# would swallow every unmatched path and turn 404s into 500s.
#
# These are service pages of the same India-based company. There is no local
# office, entity or team in any of these markets and no page claims one.
# ---------------------------------------------------------------------------
@app.route("/uk")
def market_uk():
    return render_template("uk.html", **ctx(
        title="AI Automation for UK Businesses | Agentic AI Automation",
        canonical=f"{SITE['url']}/uk",
        page="market-uk",
        crumbs=[{"name": "Home", "url": "/"}, {"name": "United Kingdom"}],
    ))


@app.route("/uae")
def market_uae():
    return render_template("uae.html", **ctx(
        title="AI Automation for UAE Businesses | Agentic AI Automation",
        canonical=f"{SITE['url']}/uae",
        page="market-uae",
        crumbs=[{"name": "Home", "url": "/"}, {"name": "United Arab Emirates"}],
    ))


@app.route("/singapore")
def market_singapore():
    return render_template("singapore.html", **ctx(
        title="AI Automation for Singapore Businesses | Agentic AI",
        canonical=f"{SITE['url']}/singapore",
        page="market-singapore",
        crumbs=[{"name": "Home", "url": "/"}, {"name": "Singapore"}],
    ))


# ---------------------------------------------------------------------------
# SEO endpoints — spec 01 §3, §4
# ---------------------------------------------------------------------------
def _xml(body: str) -> Response:
    return Response(body, mimetype="application/xml")


def _url_entry(loc, lastmod, changefreq, priority):
    return (f"  <url>\n"
            f"    <loc>{loc}</loc>\n"
            f"    <lastmod>{lastmod}</lastmod>\n"
            f"    <changefreq>{changefreq}</changefreq>\n"
            f"    <priority>{priority}</priority>\n"
            f"  </url>")


@app.route("/sitemap.xml")
def sitemap_index():
    """Index only. Points at the core sitemap and, once anything is published,
    the blog sitemap."""
    today = datetime.utcnow().strftime("%Y-%m-%d")
    base = SITE["url"]
    entries = [f"{base}/sitemap-core.xml"]
    # Only advertise the blog sitemap once something is published. A sitemap
    # that resolves to an empty urlset gets flagged in Search Console.
    if blog.all_articles():
        entries.append(f"{base}/sitemap-blog.xml")
    body = "\n".join(
        f"  <sitemap><loc>{e}</loc><lastmod>{today}</lastmod></sitemap>"
        for e in entries
    )
    return _xml('<?xml version="1.0" encoding="UTF-8"?>\n'
                '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
                f"{body}\n</sitemapindex>")


@app.route("/sitemap-core.xml")
def sitemap_core():
    today = datetime.utcnow().strftime("%Y-%m-%d")
    base = SITE["url"]
    pages = [
        ("/",             "weekly",  "1.0"),
        ("/services",     "monthly", "0.9"),
        ("/case-studies", "weekly",  "0.9"),
        ("/industries",   "monthly", "0.8"),
        ("/about",        "monthly", "0.8"),
        ("/blog",         "daily",   "0.8"),
        ("/contact",      "yearly",  "0.6"),
        ("/privacy",      "yearly",  "0.3"),
        ("/terms",        "yearly",  "0.3"),
        # Market pages (spec 09). Phase 2 - /us and /saudi-arabia - not yet built.
        ("/uk",           "monthly", "0.8"),
        ("/uae",          "monthly", "0.8"),
        ("/singapore",    "monthly", "0.8"),
        # Plain-text discovery files, listed so crawlers and models find them
        # without having to guess the convention.
        ("/llms.txt",      "weekly",  "0.5"),
        ("/llms-full.txt", "weekly",  "0.5"),
    ]
    body = "\n".join(
        _url_entry(f"{base}{path}", today, freq, pri) for path, freq, pri in pages
    )
    return _xml('<?xml version="1.0" encoding="UTF-8"?>\n'
                '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
                f"{body}\n</urlset>")


# ---------------------------------------------------------------------------
# Discovery endpoints - spec 07
#
# llms.txt is a proposed convention: a plain-text map of the site for language
# models, the way robots.txt is for crawlers. llms-full.txt is the whole site in
# one fetch. Both are regenerated by the build from the same source as the pages,
# so they cannot drift from the published prices.
#
# They live in static/ rather than templates/ because they are generated files,
# not Jinja templates, and must go out as text/plain rather than HTML.
# ---------------------------------------------------------------------------
INDEXNOW_KEY = "3450cb2a4278b045ab4801bff82e4816"


def _static_plain(filename):
    """Serve a generated file out of static/ as text/plain."""
    path = os.path.join(app.static_folder, filename)
    if not os.path.isfile(path):
        abort(404)
    with io.open(path, encoding="utf-8") as fh:
        return Response(fh.read(), mimetype="text/plain")


@app.route("/sitemap-blog.xml")
def sitemap_blog():
    """Every published article. Drafts are excluded by blog.all_articles()."""
    base = SITE["url"]
    body = "\n".join(
        _url_entry(f"{base}/blog/{a['slug']}",
                   blog.iso_date(a, "updated_at") or blog.iso_date(a),
                   "monthly", "0.7")
        for a in blog.all_articles()
    )
    return _xml('<?xml version="1.0" encoding="UTF-8"?>\n'
                '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
                f"{body}\n</urlset>")


@app.route("/llms.txt")
def llms_txt():
    return _static_plain("llms.txt")


@app.route("/llms-full.txt")
def llms_full_txt():
    return _static_plain("llms-full.txt")


@app.route("/<key>.txt")
def indexnow_key(key):
    """IndexNow ownership proof. The key is public by design - it only proves
    that whoever submits URLs for this host can also write to this host."""
    if key != INDEXNOW_KEY:
        abort(404)
    return Response(INDEXNOW_KEY, mimetype="text/plain")


@app.route("/robots.txt")
def robots():
    return Response(render_template("robots.txt", url=SITE["url"]),
                    mimetype="text/plain")


@app.errorhandler(404)
def not_found(_):
    return render_template("404.html", **ctx(
        title="Page not found | Agentic AI Automation",
        description="That page does not exist. Browse services, case studies or "
                    "the blog instead.",
        canonical=f"{SITE['url']}/404",
        page="404",
        noindex=True,
    )), 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=False)
