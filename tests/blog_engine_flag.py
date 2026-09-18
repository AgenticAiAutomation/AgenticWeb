"""BLOG_ENGINE_V2 flag: off means today's site, on means pre-rendered files
are served and everything else is untouched.

    python -m tests.blog_engine_flag

Builds a throwaway content directory with one legacy JSON article and one
pre-rendered v2 article, imports the app twice with the flag off and on, and
compares. No network, no server.
"""
import importlib
import json
import os
import shutil
import sys
import tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ROOT)
os.chdir(ROOT)

passed, failed = [], []


def check(name, condition, detail=""):
    (passed if condition else failed).append(name)
    print(f"  {'PASS' if condition else 'FAIL'}  {name}" + (f"   {detail}" if detail and not condition else ""))


def load_app(flag: str, content_dir: str):
    os.environ["SITE_CONTENT_DIR"] = content_dir
    os.environ["BLOG_ENGINE_V2"] = flag
    for m in ("app", "blog"):
        sys.modules.pop(m, None)
    import blog  # noqa: F401
    importlib.reload(blog)
    import app as site
    importlib.reload(site)
    return site.app.test_client()


tmp = tempfile.mkdtemp()
try:
    legacy = {
        "schema_version": 1, "id": 1, "slug": "legacy-post", "title": "Legacy post",
        "meta_title": "Legacy post", "meta_description": "d" * 150, "primary_keyword": "k",
        "html": "<h2>Overview</h2><p>Legacy body.</p>", "faqs": [], "featured_image": None,
        "featured_image_alt": "", "author": "Editorial", "from_author_story": "",
        "published_at": "2026-08-12T09:00:00+00:00", "updated_at": "2026-08-12T09:00:00+00:00",
        "is_draft": False,
    }
    with open(os.path.join(tmp, "legacy-post.json"), "w", encoding="utf-8") as fh:
        json.dump(legacy, fh)
    os.makedirs(os.path.join(tmp, "v2-post"))
    with open(os.path.join(tmp, "v2-post", "index.html"), "w", encoding="utf-8") as fh:
        fh.write("<!DOCTYPE html><html><body class=\"page-blog-v2\">v2 rendered</body></html>")

    off = load_app("false", tmp)
    legacy_off = off.get("/blog/legacy-post")
    check("flag off: legacy article renders", legacy_off.status_code == 200)
    check("flag off: pre-rendered file is ignored (404)", off.get("/blog/v2-post").status_code == 404)

    on = load_app("true", tmp)
    legacy_on = on.get("/blog/legacy-post")
    check("flag on: legacy article still renders", legacy_on.status_code == 200)
    check("flag on: legacy article byte-identical to flag off", legacy_on.data == legacy_off.data)
    v2 = on.get("/blog/v2-post")
    check("flag on: pre-rendered file served", v2.status_code == 200 and b"v2 rendered" in v2.data)
    check("flag on: served as html", v2.content_type.startswith("text/html"))
    check("flag on: must-revalidate cache header", "must-revalidate" in v2.headers.get("Cache-Control", ""))
    check("flag on: ETag present", bool(v2.headers.get("ETag")))
    check("flag on: conditional GET returns 304",
          on.get("/blog/v2-post", headers={"If-None-Match": v2.headers["ETag"]}).status_code == 304)
    check("flag on: unknown slug still 404", on.get("/blog/nope").status_code == 404)
    check("flag on: traversal blocked", on.get("/blog/..%2F..%2Fetc").status_code == 404)
    check("flag on: blog index unchanged (lists legacy only)",
          b"/blog/legacy-post" in on.get("/blog").data and b"/blog/v2-post" not in on.get("/blog").data)
    # send_file responses hold the file open until closed; Windows will not
    # delete an open file.
    for r in (v2, legacy_on, legacy_off):
        r.close()
finally:
    shutil.rmtree(tmp, ignore_errors=True)

print("\n" + "=" * 60)
print(f"  {len(passed)} passed, {len(failed)} failed")
sys.exit(1 if failed else 0)
