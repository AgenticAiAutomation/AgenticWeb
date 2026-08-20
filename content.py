"""Site copy and navigation data.

Kept out of app.py so a copy edit is never a routing change. Everything here
is plain data — no Flask imports — so it can be linted, diffed and reviewed by
someone who does not read Python fluently.

RULE, from spec 03: no number appears on this site without a client who has
signed off on it. Unverified figures are marked PENDING_PROOF and the template
omits them entirely rather than rendering a placeholder to the public.
"""

# ---------------------------------------------------------------------------
# Brand language — FIXED. Do not reword.
#
# The tagline is used verbatim across the website and every social profile, so
# it has to match character for character. Changing it here changes it in one
# place on the site but nowhere else, which silently breaks that consistency.
# If it ever does change, it changes on every profile on the same day.
# ---------------------------------------------------------------------------
BRAND = {
    "tagline": "Build your AI workforce in weeks, not years.",
    # The homepage H1 is part of the brand voice, not SEO copy to be tuned.
    "h1": "Your business runs 24/7. Your team doesn't.",
}

# ---------------------------------------------------------------------------
# Location — the single source of truth for NAP.
#
# There is no Google Business Profile yet. When one is created it MUST use
# these exact values, character for character — a mismatch between the site,
# the GBP listing and directory citations is the most common cause of a listing
# losing map-pack visibility, and a fabricated address is grounds for
# suspension. Faridabad is the real office; everything in `served` is a service
# area, not a location, and the copy must never imply otherwise.
#
# `served` lists countries we take clients in. These are areaServed, NOT
# offices, and the copy must never imply otherwise: we have no staff outside
# India. Listing served countries is honest and supports the schema; it does
# not on its own earn local rankings in those countries, and nothing here
# pretends it does.
# ---------------------------------------------------------------------------
LOCATION = {
    "city": "Faridabad",
    "region": "Haryana",
    "country": "India",
    "served": "India, the United Kingdom, the United States, the UAE and Singapore",
}

# The blog is WordPress at /blog/, served by nginx from /var/www/blog — not a
# Flask route. WordPress is not installed on the VPS yet, so linking to it
# would put a 404 in the main navigation of every page: bad for users, and
# Google treats soft-404s reached from sitewide nav as a quality signal.
#
# Flip this to True in the same change that installs WordPress. The nav,
# footer and sitemap all read it, so one edit turns the blog on everywhere.
BLOG_ENABLED = False

NAV_ITEMS = [
    {"key": "services",     "label": "Services",     "url": "/services"},
    {"key": "industries",   "label": "Industries",   "url": "/industries"},
    {"key": "case-studies", "label": "Case studies", "url": "/case-studies"},
    {"key": "about",        "label": "About",        "url": "/about"},
]

if BLOG_ENABLED:
    # Trailing slash matters: bare /blog 301s to /blog/, and a redirect on
    # every nav click is waste.
    NAV_ITEMS.insert(3, {"key": "blog", "label": "Blog", "url": "/blog/"})

# Footer service list. Anchors into /services rather than inventing leaf pages
# that do not exist yet — a nav link to a 404 is a crawl budget leak.
SERVICES_NAV = [
    {
        "label": "WhatsApp AI automation",
        "url": "/services#whatsapp",
        "blurb": "Business API setup, conversation design and CRM handoff. Qualifies "
                 "enquiries and books appointments without a human reading every "
                 "message first.",
    },
    {
        "label": "AI agent development",
        "url": "/services#ai-agents",
        "blurb": "Agents scoped to one job with defined inputs, a defined output and "
                 "a human checkpoint where the cost of being wrong is high.",
    },
    {
        "label": "n8n workflow builds",
        "url": "/services#n8n",
        "blurb": "Self-hosted on your infrastructure, versioned in your repository. "
                 "No per-task pricing and no vendor holding your integrations.",
    },
    {
        "label": "UiPath & RPA",
        "url": "/services#uipath",
        "blurb": "New bots, and rescue work on bots that fail every time a source "
                 "system changes its layout.",
    },
    {
        "label": "Document processing",
        "url": "/services#documents",
        "blurb": "Invoices, claims, KYC packets and contracts. Extraction with a "
                 "confidence threshold and a review queue below it.",
    },
    {
        "label": "RPA to AI migration",
        "url": "/services#migration",
        "blurb": "Moving the brittle parts of an existing RPA estate onto models, and "
                 "leaving the parts that work exactly where they are.",
    },
]

# Verified against the live site at agenticaiautomation.co on 2026-08-19.
# These same URLs feed Organization.sameAs, so they must stay in sync with the
# profiles that actually exist — a sameAs pointing at a dead profile weakens
# the entity rather than strengthening it.
#
# DELIBERATELY EXCLUDED: the GitHub organisation. Source repositories are not a
# public marketing channel; linking one hands anyone reading the footer a map
# of the codebase, its dependencies and its commit history. It is also not on
# the live site, so nothing is lost by leaving it out. Do not re-add it to
# SOCIALS or to sameAs.
SOCIALS = [
    {
        "name": "LinkedIn",
        "url": "https://www.linkedin.com/company/agenticaiautomation/",
        "path": "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 "
                "0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 "
                "1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 "
                "7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 "
                "13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 "
                "1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 "
                "22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    },
    {
        "name": "X",
        "url": "https://x.com/AgenticAIGlobal",
        "path": "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 "
                "21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 "
                "17.52h1.833L7.084 4.126H5.117z",
    },
    {
        "name": "YouTube",
        "url": "https://youtube.com/@agenticaiautomation",
        "path": "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 "
                "3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 "
                "12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 "
                "9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 "
                "12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    },
    {
        "name": "Facebook",
        "url": "https://www.facebook.com/BestAgenticAIAutomationOfficial",
        "path": "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 "
                "10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 "
                "4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925"
                "-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 "
                "24 12.073z",
    },
    {
        "name": "Instagram",
        "url": "https://www.instagram.com/agenticaiautomationofficial/",
        "path": "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 "
                "4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 "
                "3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 "
                "0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07"
                "-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 "
                "4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 "
                "7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 "
                "3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 "
                "24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28"
                ".073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78"
                "-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 "
                "6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 "
                "1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
    },
    {
        "name": "Pinterest",
        "url": "https://www.pinterest.com/agenticaiautomation/",
        "path": "M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2"
                "-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0"
                "-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 "
                "2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 "
                "3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 "
                "5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22"
                "-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 "
                "7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 "
                "7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35"
                "-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 "
                "12 0z",
    },
    {
        "name": "Reddit",
        "url": "https://www.reddit.com/user/agenticaiautomation/",
        "path": "M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 "
                "0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597"
                "-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491"
                ".968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 "
                "1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0"
                "-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 "
                "1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885"
                "-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 "
                "0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 "
                "1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 "
                "0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249"
                "-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 "
                "0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105"
                "-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533"
                "-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z",
    },
    {
        "name": "Tumblr",
        "url": "https://www.tumblr.com/agenticaiautomation",
        "path": "M14.563 24c-5.093 0-7.031-3.756-7.031-6.411V9.747H5.116V6.648c3.63-1.313 "
                "4.512-4.596 4.71-6.469C9.84.051 9.941 0 9.999 0h3.517v6.114h4.801v3.633h"
                "-4.82v7.47c.016 1.001.375 2.371 2.207 2.371h.09c.631-.02 1.486-.205 "
                "1.936-.419l1.156 3.425c-.436.636-2.4 1.374-4.156 1.404h-.178z",
    },
]

# ---------------------------------------------------------------------------
# Homepage
# ---------------------------------------------------------------------------
HERO = {
    # Brand-fixed. Sourced from BRAND so the site and the social profiles
    # cannot drift apart.
    "h1": BRAND["h1"],
    "lede": "We deploy AI employees that handle your leads, appointments, invoices "
            "and operations — 24/7, automatically. Scoped in a week, in production "
            "in four, handed over with documentation you own.",
}

# Claims that need no client permission because they describe us, not results.
# Kept deliberately unglamorous — every one of these is checkable.
CREDENTIALS = [
    {"figure": "11 years", "label": "in enterprise IT",
     "note": "Banking, healthcare and logistics delivery teams."},
    {"figure": "9 years",  "label": "building RPA and automation",
     "note": "UiPath, Power Automate, n8n — production, not pilots."},
    {"figure": "6 markets", "label": "India, UK, US, UAE, Singapore, Saudi Arabia",
     "note": "Remote delivery, overlapping working hours by arrangement."},
]

# Populate from signed case studies only. Spec 03 step 4 gates the site launch
# on two named clients; until those exist this list stays empty and the
# homepage renders the credentials block instead of a results block.
RESULTS = []  # PENDING_PROOF — see 03-trust-signals.md §"Named case studies"

# Published case studies. Same rule, enforced by the template: an empty list
# renders an honest "none yet" page rather than anonymous filler.
#
# Shape, when the first one is signed off:
#   {
#     "headline": "...",
#     "summary": "...",
#     "measurement": "How the numbers were measured, and over what period.",
#     "metrics": [{"metric": "...", "before": "...", "after": "..."}],
#     "quote": "...", "quote_author": "...", "quote_role": "...",
#   }
CASE_STUDIES = []  # PENDING_PROOF — two engagements awaiting client sign-off

HOW_WE_WORK = [
    {
        "title": "Audit, 45 minutes, free",
        "body": "We walk one process end to end with the person who actually runs it. "
                "You leave with a written scope and a cost range whether or not you "
                "hire us.",
    },
    {
        "title": "Scope and fixed price",
        "body": "One process, one price, one delivery date. If discovery shows "
                "automation is the wrong answer, we say so — that has happened and "
                "we will tell you about it on the call.",
    },
    {
        "title": "Build in the open",
        "body": "You get access to the repository and the workflow from day one. "
                "Weekly demo against real data, not a slide.",
    },
    {
        "title": "Handover and exit",
        "body": "Documentation, runbook and a named owner on your side who can change "
                "it without us. Support is a choice you make afterwards, not a "
                "dependency we design in.",
    },
]

# ---------------------------------------------------------------------------
# /services — one entry per anchor in SERVICES_NAV. `id` must match the anchor.
# ---------------------------------------------------------------------------
SERVICES = [
    {
        "id": "whatsapp",
        "name": "WhatsApp AI automation",
        "summary": "A WhatsApp number that answers, qualifies and books without a "
                   "person reading every message first.",
        "includes": [
            "WhatsApp Business API provisioning and Meta verification",
            "Conversation design reviewed against your real message history",
            "Handoff to a human with full context when the agent is unsure",
            "CRM or spreadsheet write-back so nothing lives only in chat",
            "Two weeks of tuning after go-live against live conversations",
        ],
        "timeline": "2 to 3 weeks",
        "price": "₹50,000 – ₹1,50,000",
        "good_fit": "Clinics, coaching institutes, D2C brands and dealerships taking "
                    "more than 50 enquiries a day on WhatsApp.",
        "bad_fit": "Businesses whose enquiries need a quote calculated by a human "
                   "before anything useful can be said.",
    },
    {
        "id": "ai-agents",
        "name": "AI agent development",
        "summary": "Agents scoped to a single job, with a defined input, a defined "
                   "output and a checkpoint wherever being wrong is expensive.",
        "includes": [
            "Process mapping with the person who currently does the work",
            "Model selection and prompt design, evaluated against your data",
            "Guardrails: confidence thresholds, refusal paths, audit logging",
            "Human review queue for anything below the confidence threshold",
            "Evaluation set you keep, so you can test changes after we leave",
        ],
        "timeline": "4 to 6 weeks",
        "price": "₹1,50,000 – ₹5,00,000",
        "good_fit": "Repetitive judgement work — triage, classification, drafting, "
                    "summarising — done by several people to an inconsistent standard.",
        "bad_fit": "Processes with no written rules and no examples of past decisions. "
                   "There is nothing to evaluate against.",
    },
    {
        "id": "n8n",
        "name": "n8n workflow builds",
        "summary": "Integration and workflow automation, self-hosted on your "
                   "infrastructure and versioned in your repository.",
        "includes": [
            "Self-hosted n8n on your cloud account, or your existing instance",
            "Workflows exported to JSON and committed to your Git repository",
            "Error handling and alerting that names the failing step",
            "Credential management that does not leave keys inside workflows",
            "Runbook covering each workflow's failure modes",
        ],
        "timeline": "1 to 3 weeks",
        "price": "₹40,000 – ₹2,00,000",
        "good_fit": "Teams paying per-task pricing on Zapier or Make and feeling it, "
                    "or needing data to stay inside their own network.",
        "bad_fit": "Single two-step integrations. Use the SaaS connector — it is "
                   "cheaper than our invoice.",
    },
    {
        "id": "uipath",
        "name": "UiPath and RPA",
        "summary": "New bots where rules genuinely are stable, and rescue work on "
                   "bots that break every time a screen changes.",
        "includes": [
            "Process discovery and automation feasibility assessment",
            "Attended or unattended bot development in UiPath or Power Automate",
            "Selector hardening so a UI change does not take the bot down",
            "Orchestrator setup, scheduling and exception queues",
            "Handover to your team, including the parts we got wrong first time",
        ],
        "timeline": "3 to 8 weeks",
        "price": "₹1,00,000 – ₹6,00,000",
        "good_fit": "Stable, high-volume, rule-based work in systems with no API.",
        "bad_fit": "Processes changing monthly. The maintenance will cost more than "
                   "the work it saves.",
    },
    {
        "id": "documents",
        "name": "Document processing",
        "summary": "Invoices, claims, KYC packets and contracts turned into structured "
                   "data, with a review queue for anything uncertain.",
        "includes": [
            "Extraction tuned on a sample of your own documents, not a demo set",
            "Confidence scoring per field, with a threshold you choose",
            "Review interface for anything below threshold",
            "Validation against your master data before anything is written",
            "Accuracy measured on a held-out set and reported honestly",
        ],
        "timeline": "3 to 6 weeks, or 2 to 3 if the layouts are consistent",
        "price": "₹1,00,000 – ₹4,00,000",
        "good_fit": "More than 200 documents a month. Consistent layouts are the "
                    "easiest win — they read faster and more accurately than manual "
                    "entry and cost the least to build. Inconsistent formats take "
                    "longer to get right, and are where the larger saving sits.",
        "bad_fit": "Data you already receive as a feed — an API, EDI or database "
                   "export. Parse the feed; there is no document to process.",
    },
    {
        "id": "migration",
        "name": "RPA to AI migration",
        "summary": "Moving the brittle parts of an existing RPA estate onto models, "
                   "and leaving the parts that work exactly where they are.",
        "includes": [
            "Audit of the existing estate, ranked by maintenance cost per bot",
            "A keep / migrate / retire recommendation for each bot, with reasoning",
            "Migration of the bots where the case is clear, one at a time",
            "Parallel running until the replacement matches the original",
            "Licence reduction plan, if the migration earns one",
        ],
        "timeline": "6 to 12 weeks",
        "price": "Quoted after the audit",
        "good_fit": "Estates of 10+ bots where maintenance now exceeds the original "
                    "build cost.",
        "bad_fit": "Estates under five bots that are working. Leave them alone.",
    },
]

# ---------------------------------------------------------------------------
# /industries
# ---------------------------------------------------------------------------
INDUSTRIES = [
    {
        "name": "Healthcare and clinics",
        "first": "Appointment reminders and pre-consultation intake on WhatsApp.",
        "why": "Both are high volume, low judgement and directly tied to no-show "
               "rate, which is a number the practice already tracks.",
        "caution": "Anything touching diagnosis or triage stays with a clinician. "
                   "We build the scheduling around them, not the decision.",
    },
    {
        "name": "E-commerce and D2C",
        "first": "Enquiry qualification and order-status answering.",
        "why": "Response time to first enquiry is the single largest controllable "
               "factor in conversion, and it is measurable from day one.",
        "caution": "Returns and refunds involve money and emotion. Route them to a "
                   "person with the context attached.",
    },
    {
        "name": "Law firms",
        "first": "Document intake, classification and clause extraction.",
        "why": "Associates spend hours on first-pass review that a model can narrow "
               "down before a human reads anything.",
        "caution": "Extraction assists review, it does not replace it. Every output "
                   "is checked and the audit trail says by whom.",
    },
    {
        "name": "Manufacturing",
        "first": "Purchase order and goods-receipt matching.",
        "why": "Three-way matching is rule-heavy, high volume and currently done by "
               "people reading PDFs against an ERP screen.",
        "caution": "Anything touching production line control is out of scope. "
                   "We stay in the back office.",
    },
    {
        "name": "Logistics",
        "first": "Proof-of-delivery capture and exception handling.",
        "why": "PODs arrive as photographs of paper. Extraction plus validation "
               "removes a data entry team's worth of work.",
        "caution": "Route optimisation is a solved problem with mature vendors. "
                   "Buy it, do not commission it.",
    },
    {
        "name": "Professional services",
        "first": "Timesheet chasing, proposal assembly and CRM hygiene.",
        "why": "Unbilled time and stale pipeline data are direct revenue leaks that "
               "nobody owns.",
        "caution": "If the underlying process is undefined, automating it just makes "
                   "the mess arrive faster.",
    },
]

FAQS = [
    {
        "q": "What does an automation project cost?",
        "a": "A single focused process runs ₹50,000 to ₹1.5 lakh. A multi-process "
             "build across a department runs ₹2.5 lakh to ₹8 lakh. Ongoing support, "
             "if you want it, is ₹15,000 to ₹40,000 a month depending on scale. "
             "You get the number in writing before any work starts.",
    },
    {
        "q": "How long before something is actually live?",
        "a": "Four weeks is typical: a week of discovery and design, two weeks "
             "building, a week of testing and go-live. A narrow single-process "
             "automation can be live in seven to ten days. Anything quoted at "
             "48 hours is a demo, not a deployment.",
    },
    {
        "q": "We already have UiPath. Do we have to throw it away?",
        "a": "No, and usually you should not. Rule-based bots that work are cheaper "
             "to keep than to rebuild. We migrate the parts that keep breaking — "
             "the ones dealing with unstructured documents, free-text input or "
             "decisions a rule cannot express — and leave the rest alone.",
    },
    {
        "q": "Who owns the code and the workflows?",
        "a": "You do, on delivery, in your own repository and your own accounts. "
             "We do not host your automation on our infrastructure and we do not "
             "hold your credentials after handover.",
    },
    {
        "q": "What happens if it breaks after you leave?",
        "a": "Every build ships with a runbook covering the failure modes we know "
             "about and how to recover from each. Thirty days of defect fixing is "
             "included at no cost. After that you can take a support retainer or "
             "call us per incident — both are available and neither is required.",
    },
    {
        "q": "Do you work with companies outside India?",
        "a": "Yes. Roughly half the work is UK, US, UAE and Singapore. Contracts are "
             "in your currency and jurisdiction, and we hold working hours that "
             "overlap yours by at least four hours a day.",
    },
]
