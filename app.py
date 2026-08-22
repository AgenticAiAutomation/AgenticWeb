"""Agentic AI Automation — marketing site.

Routing, SEO endpoints and the shared context every template renders against.
The WordPress blog lives separately at /blog (nginx proxies it to
/var/www/blog); this app owns everything else.

Content lives in content.py so that copy edits never touch routing.
"""
import os
from datetime import datetime

from flask import Flask, Response, redirect, render_template, request

import content

app = Flask(__name__)

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
    "/blog.html": "/blog",
    "/about.html": "/about",
}


@app.before_request
def apply_redirects():
    path = request.path.rstrip("/") or "/"
    if path in REDIRECTS_301:
        return redirect(REDIRECTS_301[path], code=301)
    # Canonicalise away trailing slashes so /services/ and /services are not
    # two indexable URLs. Root is exempt.
    if path != request.path and request.path != "/":
        return redirect(path, code=301)
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


# NOTE: there is deliberately no /blog route here. nginx serves /blog/ from the
# WordPress install at /var/www/blog (see infra/nginx-blog-subfolder.conf), so a
# Flask route on that path could never fire. The nav links straight to /blog/.


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
    """Index only. Blog URLs live in WordPress, which emits its own sitemap
    via Rank Math — we point at it rather than duplicating it, because two
    sitemaps listing the same URL with different lastmod values is worse than
    one."""
    today = datetime.utcnow().strftime("%Y-%m-%d")
    base = SITE["url"]
    entries = [f"{base}/sitemap-core.xml"]
    # Rank Math emits its own sitemap index. Only advertise it once WordPress
    # is actually installed — submitting a sitemap URL that 404s gets the whole
    # index flagged as an error in Search Console.
    if content.BLOG_ENABLED:
        entries.append(f"{base}/blog/sitemap_index.xml")
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
        ("/contact",      "yearly",  "0.6"),
        ("/privacy",      "yearly",  "0.3"),
        ("/terms",        "yearly",  "0.3"),
    ]
    body = "\n".join(
        _url_entry(f"{base}{path}", today, freq, pri) for path, freq, pri in pages
    )
    return _xml('<?xml version="1.0" encoding="UTF-8"?>\n'
                '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
                f"{body}\n</urlset>")


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
