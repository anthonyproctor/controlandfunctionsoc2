# SEO and Tracking Deployment Notes

Files added today (2026-04-30) and what you need to do to make them work.

## Files in this directory

| File | Purpose | Action required |
|---|---|---|
| `robots.txt` | Tells crawlers what they can index. Explicitly allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.). | Just push to GitHub; auto-served. |
| `sitemap.xml` | Tells search engines what pages exist. | Just push; submit to Google Search Console once site is live. |
| `llms.txt` | Emerging AI-SEO standard. Provides clean, factual content for LLMs to ingest. | Just push; LLMs that support it will discover via robots.txt. |
| `favicon.svg` | Browser tab icon. Simple "CF" navy logo. | Just push. |

## Files you still need to create

### `assets/og-image.png` — REQUIRED for LinkedIn/Slack previews

Specs: **1200 x 630 pixels, PNG format**, under 300KB.

Suggested design (you can do in Canva, Figma, or any image editor):
- Navy background (#1e3a8a)
- Top: small "CONTROL AND FUNCTION" wordmark in white, semibold caps
- Center: Headline in white, large bold sans-serif: "SOC 2 Readiness for SaaS Companies"
- Below: smaller subhead in slate-300: "Audit-ready in 12 to 16 weeks. Platform-neutral. Denver-based."
- Bottom right: small "controlandfunction.com" in slate-300

Without this file, when someone shares your URL on LinkedIn or Slack, the preview card will be blank/broken. Strong link previews materially improve click-through rates from social sharing.

### `favicon.ico` — REQUIRED for older browsers

The `favicon.svg` covers modern browsers. Some older browsers (and bookmark systems) need `.ico` format.

Quick generation: take the `favicon.svg`, paste into https://realfavicongenerator.net/, download the package, drop the resulting files into root.

### `apple-touch-icon.png` — Optional but nice

180x180 PNG of the same logo for iOS home-screen bookmarks. Same generator tool produces this.

## Tracking — Plausible Analytics setup

The HTML already includes the Plausible script. To activate:

1. Sign up at https://plausible.io (~$9/month for basic plan, 30-day free trial)
2. Add `controlandfunction.com` as a site in your Plausible dashboard
3. Plausible will start tracking visits, traffic sources, top pages, outbound link clicks (Calendly, mailto), etc.
4. No cookies, no GDPR banner needed, fully privacy-compliant — matches your compliance brand.

Alternative: **Cloudflare Web Analytics** (free, similar privacy stance). Replace the Plausible script with Cloudflare's snippet from their dashboard.

Alternative: **Google Analytics 4** (free, more features, less privacy-clean). If you want GA4, replace the Plausible script with the GA4 gtag snippet.

For B2B consulting, Plausible is the right choice. Privacy-respectful matches the compliance brand and you only need basic visitor + outbound-click data anyway.

## What the new HTML head delivers

- **canonical link** → tells Google which URL is authoritative (no duplicate-content penalties)
- **og:image, twitter:card** → rich link previews on LinkedIn, Slack, Twitter, Facebook
- **Schema.org ProfessionalService** → tells Google you are a professional services firm and what services you offer (helps local search + Knowledge Graph)
- **Schema.org FAQPage** → 5 Q&A entries that:
  - Help you appear in Google's rich-result FAQ snippets
  - Get cited by ChatGPT, Claude, Perplexity when users ask "what is SOC 2 readiness consulting"
  - Help LLMs surface your specific pricing and timing claims when relevant
- **Plausible Analytics** → privacy-friendly visitor + outbound link tracking

## AI SEO / GEO (Generative Engine Optimization) strategy

This is real now in 2026. LLMs (ChatGPT, Claude, Perplexity) increasingly mediate B2B searches.

### What you have done already
- ✅ Allow major AI crawlers in robots.txt
- ✅ Provide clean, factual content via llms.txt
- ✅ Use Schema.org structured data (LLMs prefer structured content)
- ✅ FAQ schema (LLMs love Q&A format for citing)
- ✅ Specific, factual claims (no marketing fluff that LLMs filter out)

### Next moves to get cited by LLMs

1. **Get cited on Reddit.** LLMs ingest Reddit heavily. Participate authentically in r/cybersecurity, r/SaaS, r/startups when SOC 2 questions come up. Don't spam — answer questions usefully and let your domain show up in your Reddit profile.

2. **Get cited on industry blogs.** Linford & Co, Securityscorecard, Vanta, Drata all run blog content. Pitch a guest post about "what most SaaS companies get wrong about SOC 2 readiness" — the byline gets you a backlink and citation surface.

3. **Build content with definitive statements.** LLMs prefer specific over vague. "SOC 2 readiness costs $15-25K for a Series A SaaS company" gets cited. "SOC 2 costs vary by company" does not.

4. **Add a /resources or /blog directory.** Each post should:
   - Target one specific question (e.g., "How much does SOC 2 cost for startups?")
   - Be 1500-2500 words
   - Use clear H2/H3 structure
   - Include a TL;DR at top
   - Have FAQ schema markup

5. **Get listed on directories.** Clutch.co, GoodFirms, GetApp consulting directories. LLMs reference these for "best X consultants" queries.

## Traditional SEO action plan (90 days)

| Week | Action |
|---|---|
| 1 | Submit sitemap to Google Search Console + Bing Webmaster Tools. Verify domain ownership. |
| 2 | Set up Google Business Profile (formerly Google My Business) for the Denver location. |
| 3 | Create LinkedIn Company Page for Control and Function. Post the URL. |
| 4-6 | Write 3 blog posts (target: "SOC 2 cost for startups," "SOC 2 vs ISO 27001," "SOC 2 readiness checklist for SaaS"). |
| 7-8 | Pitch 2-3 guest posts to Linford & Co, Vanta blog, etc. for backlinks. |
| 9-12 | Get listed on Clutch.co + GoodFirms. Apply to Vanta + Drata partner directories. |

## Realistic SEO timeline expectation

- **Week 1-4:** site indexed by Google, may rank for very long-tail terms
- **Month 2-3:** ranks for branded queries ("control and function") and very long-tail ("SOC 2 readiness Denver no platform")
- **Month 6-9:** ranks for moderate competition long-tail terms with content + backlinks
- **Month 12+:** competes for "SOC 2 readiness consultant" type terms (assuming consistent content + backlinks)

For a brand-new domain, SEO is a 6-12 month investment. The audit firm partnership and warm-network outreach paths produce revenue much faster.

## What NOT to do

- Don't buy backlinks or use link farms (Google penalty, immediate)
- Don't keyword-stuff (modern Google penalizes this)
- Don't add a "Certifications" page that lists personal credentials (OE leak)
- Don't submit to low-quality directories (no SEO value, lots of spam emails)
- Don't add a blog if you cannot maintain it monthly (an abandoned blog hurts more than no blog)
