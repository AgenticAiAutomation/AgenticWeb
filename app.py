from flask import Flask, render_template, abort
from datetime import datetime
import os

app = Flask(__name__)

SITE = {
    "name": "Agentic AI Automation",
    "url": "https://agenticaiautomation.co",
    "email": "Contact@agenticAiAutomation.co",
    "phone": "",
    "wa": "917982881739",
    "calendly": "https://calendly.com/agenticaiautomation",
    "year": datetime.now().year,
}


def ctx(**kwargs):
    d = dict(SITE)
    d.update(kwargs)
    return d


@app.route("/")
def index():
    return render_template("index.html", **ctx(
        title="AI Employees for Your Business — RPA, WhatsApp Automation, Lead Follow-Up & Invoice Processing | Agentic AI Automation",
        description="We deploy AI employees that handle your leads, appointments, invoices and operations — 24/7, automatically. RPA + AI automation for businesses across India, UK, UAE and beyond. Live in 2 weeks.",
        canonical="https://agenticaiautomation.co/",
        page="home",
    ))


@app.route("/about")
def about():
    return render_template("about.html", **ctx(
        title="About Agentic AI Automation | AI Workforce Company",
        description="Agentic AI Automation was built by our founder — 11 years enterprise IT, 9 years automation. We exist to give every business an AI workforce. Learn our story.",
        canonical="https://agenticaiautomation.co/about",
        page="about",
    ))


@app.route("/services")
def services():
    return render_template("services.html", **ctx(
        title="AI Automation Services | RPA, AI Agents, WhatsApp, n8n, UiPath",
        description="Every automation service your business needs — AI Agent Development, UiPath RPA, Power Automate, n8n, WhatsApp AI, Voice AI, Document Automation and more.",
        canonical="https://agenticaiautomation.co/services",
        page="services",
    ))


@app.route("/industries")
def industries():
    return render_template("industries.html", **ctx(
        title="Industry Automation Solutions | AI for E-commerce, Healthcare, Finance & More",
        description="AI automation built for your industry — E-commerce, Healthcare, Law Firms, Manufacturing, Logistics, Finance, Real Estate and Professional Services.",
        canonical="https://agenticaiautomation.co/industries",
        page="industries",
    ))


@app.route("/ai-executives")
def ai_executives():
    return render_template("ai-executives.html", **ctx(
        title="AI Executive Team | Deploy AI Employees | Agentic AI Automation",
        description="Meet your AI Executive Team — Alex (Sales), Maya (Support), Atlas (Ops), Titan (Finance), Nova (Marketing), Orion (HR) and more. Deploy AI Employees in weeks.",
        canonical="https://agenticaiautomation.co/ai-executives",
        page="ai-executives",
    ))


@app.route("/case-studies")
def case_studies():
    return render_template("case-studies.html", **ctx(
        title="Automation Case Studies | Real Results | Agentic AI Automation",
        description="Real automation results — from e-commerce lead qualification to finance invoice processing. See what AI employees deliver across industries.",
        canonical="https://agenticaiautomation.co/case-studies",
        page="case-studies",
    ))


@app.route("/blog")
def blog():
    return render_template("blog.html", **ctx(
        title="AI Automation Blog | Knowledge Hub | Agentic AI Automation",
        description="Deep guides on AI agents, RPA, workflow automation, n8n, UiPath, WhatsApp automation and building your AI workforce. Written by enterprise automation veterans.",
        canonical="https://agenticaiautomation.co/blog",
        page="blog",
    ))


@app.route("/privacy")
def privacy():
    return render_template("privacy.html", **ctx(
        title="Privacy Policy | Agentic AI Automation",
        description="Privacy policy for Agentic AI Automation. How we collect, use and protect your data.",
        canonical="https://agenticaiautomation.co/privacy",
        page="privacy",
    ))


@app.route("/terms")
def terms():
    return render_template("terms.html", **ctx(
        title="Terms of Service | Agentic AI Automation",
        description="Terms of service for Agentic AI Automation. Service agreement, IP ownership, payment terms and governing law.",
        canonical="https://agenticaiautomation.co/terms",
        page="terms",
    ))


@app.route("/sitemap.xml")
def sitemap():
    pages = [
        {"url": "/",               "priority": "1.0",  "changefreq": "weekly"},
        {"url": "/services",       "priority": "0.9",  "changefreq": "monthly"},
        {"url": "/case-studies",   "priority": "0.9",  "changefreq": "weekly"},
        {"url": "/blog",           "priority": "0.9",  "changefreq": "daily"},
        {"url": "/industries",     "priority": "0.85", "changefreq": "monthly"},
        {"url": "/ai-executives",  "priority": "0.85", "changefreq": "monthly"},
        {"url": "/about",          "priority": "0.8",  "changefreq": "monthly"},
        {"url": "/privacy",        "priority": "0.3",  "changefreq": "yearly"},
        {"url": "/terms",          "priority": "0.3",  "changefreq": "yearly"},
    ]
    xml = render_template("sitemap.xml", pages=pages, base_url=SITE["url"])
    return app.response_class(xml, mimetype="application/xml")


@app.route("/robots.txt")
def robots():
    return app.response_class(render_template("robots.txt"), mimetype="text/plain")


@app.errorhandler(404)
def not_found(e):
    return render_template("404.html", **ctx(
        title="Page Not Found | Agentic AI Automation",
        description="The page you are looking for does not exist.",
        canonical="https://agenticaiautomation.co/404",
        page="404",
    )), 404


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
