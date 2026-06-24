from flask import Flask, render_template
from datetime import datetime
import os

app = Flask(__name__)

WA = "917982881739"


@app.route("/")
def home():
    return render_template("index.html", year=datetime.now().year, wa=WA)


@app.route("/services/ai-agent-development")
def ai_agents():
    return render_template("services/ai-agents.html", year=datetime.now().year, wa=WA)


@app.route("/services/uipath-consulting")
def uipath():
    return render_template("services/uipath.html", year=datetime.now().year, wa=WA)


@app.route("/services/n8n-automation")
def n8n():
    return render_template("services/n8n.html", year=datetime.now().year, wa=WA)


@app.route("/services/power-automate")
def power_automate():
    return render_template("services/power-automate.html", year=datetime.now().year, wa=WA)


@app.route("/services/whatsapp-ai-chatbots")
def whatsapp():
    return render_template("services/whatsapp.html", year=datetime.now().year, wa=WA)


@app.route("/sitemap.xml")
def sitemap():
    pages = [
        {"url": "/", "priority": "1.0", "changefreq": "weekly"},
        {"url": "/services/ai-agent-development", "priority": "0.9", "changefreq": "monthly"},
        {"url": "/services/uipath-consulting", "priority": "0.9", "changefreq": "monthly"},
        {"url": "/services/n8n-automation", "priority": "0.9", "changefreq": "monthly"},
        {"url": "/services/power-automate", "priority": "0.9", "changefreq": "monthly"},
        {"url": "/services/whatsapp-ai-chatbots", "priority": "0.9", "changefreq": "monthly"},
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
