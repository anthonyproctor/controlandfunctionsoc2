# Publishing checklist

Run this in the same sitting a page ships. Not later, not from memory.

## Why this file exists

On 2026-08-27 both content pages were found sitting at "discovered, currently not indexed" on Google and Bing after weeks live. Nothing was technically wrong: valid sitemap, correct canonicals, no noindex, schema present. **The homepage was indexed and the deep pages were not, because every external link pointed at the root and nothing pointed at the articles.**

On 2026-09-09 three new articles shipped and the same thing happened again, in the same day. Google URL inspection said **"URL is unknown to Google"** for all three. Bing had never received four of the five articles on the site. The lesson had been written down and it still did not survive contact with a busy afternoon, which is why it is now a checklist next to the code instead of a paragraph in a memory file.

**Publishing is not indexing. A page nothing links to does not exist.**

## Every new page

- [ ] **Title** 15 to 70 characters, and a real one. It is the line an assistant reads when deciding whether to name you.
- [ ] **Meta description** 110 to 165 characters. Longer truncates in search.
- [ ] **Canonical** pointing at the page's own final URL.
- [ ] **Article schema** as well as FAQPage, if it is an article. Author, publisher, datePublished, dateModified, mainEntityOfPage.
- [ ] **Inbound links, at least one from a page that is already indexed.** The site footer carries every guide, so adding it there gives the new page a link from all seven pages at once. This is the step that actually matters and the one that keeps getting skipped.
- [ ] **Cross-link** from the one or two existing articles the topic genuinely relates to, both directions.
- [ ] **sitemap.xml** entry with today's lastmod.
- [ ] **llms.txt** entry under Resources, with a one line description of what the page answers. AI recommendation is the only channel with a confirmed lead behind it, and this file is what it reads.
- [ ] **No em dashes or en dashes** anywhere. House style.
- [ ] **Rebuild CSS** if any new Tailwind classes were used: `npm run build:css`.

## After it deploys

- [ ] **Confirm it is actually live**, by fetching the URL, not by trusting the push. GitHub Pages lags a minute or two behind the commit.
- [ ] **Google Search Console** → URL inspection → paste the URL → Request Indexing. Confirm it says "added to a priority crawl queue."
- [ ] **Bing Webmaster Tools** → URL Submission → Submit URLs. It takes several at once and the daily quota is generous, so submit anything else that has been missed while you are there.
- [ ] **Run the QA audit** below and get to zero fail, zero warn.

## QA audit

`scripts/audit.py` checks every page for: HTTP status, title and meta description length, canonical correctness, broken internal links, JSON-LD validity, image alt text, lang and viewport, h1 count, sitemap against reality, dash characters, and a claim wall pass.

```
python3 scripts/audit.py
```

Zero fail and zero warn before you walk away. It catches the things that are invisible in a browser, including structured data that has drifted out of step with the visible page, which happened on 2026-09-09 when the homepage schema still advertised a price tier that had been replaced.

## The claim wall, which the audit also checks

Never on this site, in any wording:

- That Control and Function performs audits, examinations, or attestations, or issues SOC 2 reports. A licensed CPA firm does that, the client engages them directly, and we never assess our own preparation work.
- That anyone can be "HIPAA certified." No such thing exists.
- That we issue ISO 27001 certificates. An accredited certification body does.
- That we perform penetration testing, vulnerability scanning, red teaming, security monitoring, or incident response. We scope and manage the vendor, we never run the test.
- Any reference to CMMC, a security clearance, military service, or a named employer.
- Any invented client count, team size, or metric.
