# Control and Function — Website

Static one-page site for controlandfunction.com. Hosted free on GitHub Pages.

## Stack

- Plain HTML5
- Tailwind CSS via CDN (no build step)
- Inter font via Google Fonts
- Single index.html, no JavaScript framework

## Deploy to GitHub Pages

### One-time setup

1. **Create a new GitHub repository** named `controlandfunction-website` (or any name; the repo name does not affect the public URL because we use a custom domain).

2. **Push these files** to the repo `main` branch:
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin git@github.com:anthonyproctor/controlandfunction-website.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Repo → Settings → Pages
   - Source: `Deploy from a branch`
   - Branch: `main` / root (`/`)
   - Save

4. **Custom domain (controlandfunction.com):**
   - In Settings → Pages → Custom domain field, enter `controlandfunction.com`
   - GitHub will check that the included `CNAME` file is present (it is)
   - Enable "Enforce HTTPS" once the certificate provisions (15 to 60 minutes)

5. **Configure your domain registrar's DNS:**
   - Add four `A` records pointing the apex (`@`) to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Add a `CNAME` record for `www` → `<your-github-username>.github.io`
   - DNS propagation: 5 minutes to 24 hours

6. **Verify:**
   - https://controlandfunction.com should serve the site
   - https://www.controlandfunction.com should redirect to apex

## Editing the site

All content is in `index.html`. Edit the markup directly. No build step, no compile, no rebuild.

To change content sections:
- **Hero copy:** Search for `class="gradient-bg"`
- **About / Anthony:** Search for `id="about"`
- **Services / 4 tiers:** Search for `id="services"`
- **Why Us:** Search for `Why Control and Function`
- **Contact / Calendly:** Search for `id="contact"` and replace the Calendly URL with your real link

To replace the headshot:
1. Save your photo to `assets/headshot.jpg` (square aspect, 600x600 minimum, web-optimized)
2. In `index.html`, find the `[Headshot placeholder]` div and replace with:
   ```html
   <img src="assets/headshot.jpg" alt="Anthony J. Proctor" class="w-full h-full object-cover">
   ```

To update Calendly link:
- Search for `https://calendly.com/anthonyproctor`
- Replace with your actual scheduling link

To update LinkedIn / GitHub:
- Search for `linkedin.com/in/anthonyproctor` and `github.com/anthonyproctor`
- Replace with current handles if different

## Mobile testing

The site is responsive (Tailwind handles all breakpoints). Test on:
- iPhone (Safari)
- Android (Chrome)
- iPad (Safari)
- Desktop browsers (Chrome, Safari, Firefox, Edge)

## Performance

Single HTML file + Tailwind CDN + Google Fonts.
Lighthouse score expected: 90 to 100 across the board.
First Contentful Paint typically under 1.5s.

## Future expansions (when you want to add a blog)

Two paths:
1. **Stay simple:** Convert `index.html` to a directory with `posts/` subfolder, write blog posts as plain HTML
2. **Adopt Jekyll:** GitHub Pages supports Jekyll natively. Add a `_config.yml` and migrate index to Jekyll layout.

For now, keep it static.

## Updates checklist before going live

- [ ] Replace `[Headshot placeholder]` with your photo
- [ ] Update Calendly URL in two places (hero + contact section)
- [ ] Verify LinkedIn URL is correct
- [ ] Verify GitHub URL points to your real repo
- [ ] Update `og:url` in head if your domain differs
- [ ] Set up MX records for anthony@controlandfunction.com (Google Workspace or Fastmail)
- [ ] Test contact form / mailto link works
- [ ] Test all anchor links (#services, #about, #contact)
- [ ] Lighthouse audit + fix any flagged issues

## Future content additions

When you have your first 1 to 2 closed engagements:
- Add a "Case Studies" section (anonymized: "180-user proptech SaaS, SOC 2 Type II driven solo, audit passed clean on first attempt")
- Add a "Frequently Asked Questions" section
- Consider adding a brief blog (1 to 2 posts on SOC 2 readiness for SaaS founders)

Avoid adding:
- Stock photos of generic business people
- Generic compliance jargon ("trusted partner," "industry leader")
- A "Team" section with fake associates
- Logos of customers you have not delivered for
