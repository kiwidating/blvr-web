import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import assert from "node:assert/strict";

const output = resolve("dist");
const html = readFileSync(resolve(output, "index.html"), "utf8");
const ids = new Set();
const references = [];
let headings = 0;
let canonical;
let socialImage;
let appLinks = 0;
let waitlistLinks = 0;

// Inspect the built page: broken assets, copied destinations and executable
// scripts should fail the same gate locally and in CI.
const page = new HTMLRewriter()
  .on("[id]", {
    element(element) {
      const id = element.getAttribute("id");
      assert(!ids.has(id), `Duplicate element id: ${id}`);
      ids.add(id);
    },
  })
  .on("h1", {
    element() {
      headings++;
    },
  })
  .on("a, link, img", {
    element(element) {
      const reference =
        element.getAttribute("href") ?? element.getAttribute("src");
      if (reference) references.push(reference);
      if (element.tagName === "img")
        assert(element.hasAttribute("alt"), "Image missing alt attribute");
      if (element.getAttribute("rel") === "canonical") canonical = reference;
      if (reference === "https://blvr.app") appLinks++;
      if (reference === "https://blvr.app/signin/waitlist") waitlistLinks++;
    },
  })
  .on('meta[property="og:image"]', {
    element(element) {
      socialImage = element.getAttribute("content");
    },
  })
  .on("script", {
    element(element) {
      assert.equal(
        element.getAttribute("type"),
        "application/ld+json",
        "The static site must not ship executable scripts",
      );
    },
  })
  .transform(new Response(html));
await page.text();
assert.equal(headings, 1, "Expected one primary heading");
assert.equal(
  canonical,
  "https://info.blvr.app/",
  "Unexpected canonical destination",
);
assert(appLinks > 0, "Missing application link");
assert(waitlistLinks > 0, "Missing waitlist link");
assert(!/BLVR/.test(html), "Incorrect brand capitalization");
assert(ids.has("main-content"), "Missing skip-link destination");
assert(socialImage, "Missing social preview");
references.push(new URL(socialImage).pathname);
for (const reference of references) {
  const url = new URL(reference, canonical);
  if (url.origin !== new URL(canonical).origin) continue;
  if (url.hash)
    assert(
      ids.has(decodeURIComponent(url.hash.slice(1))),
      `Broken anchor: ${reference}`,
    );
  const asset = resolve(
    output,
    "." + (url.pathname === "/" ? "/index.html" : url.pathname),
  );
  assert(existsSync(asset), `Missing local file: ${reference}`);
}
function checkFiles(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) checkFiles(path);
    else
      assert(
        !/\.(?:m?js)$/i.test(entry.name),
        `Unexpected client JavaScript: ${path}`,
      );
  }
}
checkFiles(output);
console.log(
  "Static-site checks passed: links, assets, metadata, accessibility structure, and no client JavaScript.",
);
