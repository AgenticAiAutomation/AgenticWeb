from flask import Flask, render_template
from datetime import datetime
import os

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html", year=datetime.now().year)

@app.route("/sitemap.xml")
def sitemap():
    pages = [
        {"url": "/", "priority": "1.0", "changefreq": "weekly"},
        {"url": "/services/rpa", "priority": "0.9", "changefreq": "monthly"},
        {"url": "/services/ai-agents", "priority": "0.9", "changefreq": "monthly"},
        {"url": "/services/whatsapp-automation", "priority": "0.9", "changefreq": "monthly"},
        {"url": "/services/lead-generation", "priority": "0.9", "changefreq": "monthly"},
        {"url": "/services/website-development", "priority": "0.9", "changefreq": "monthly"},
        {"url": "/services/business-operations", "priority": "0.85", "changefreq": "monthly"},
        {"url": "/blog", "priority": "0.9", "changefreq": "daily"},
        {"url": "/case-studies", "priority": "0.85", "changefreq": "weekly"},
        {"url": "/about", "priority": "0.7", "changefreq": "monthly"},
    ]
    xml = render_template("sitemap.xml", pages=pages, base_url="https://agenticaiautomation.co")
    return app.response_class(xml, mimetype="application/xml")

@app.route("/robots.txt")
def robots():
    txt = render_template("robots.txt")
    return app.response_class(txt, mimetype="text/plain")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
