# Freera Consultancy — Website

A 4-page static site, deploy-ready. No build tools, no dependencies beyond Google Fonts.

## Files

```
freera-site/
├── index.html      ← Home page
├── services.html   ← Services detail page
├── about.html      ← About page
├── contact.html    ← Contact page (booking + form)
└── styles.css      ← Shared design system
```

## Quick setup checklist

Before going live, fill in these placeholders (search your code for them):

### 1. Contact email
**Find:** `hello@freera.com`
**Where:** All four HTML files (footer + contact page)
**Do:** Replace with your real email address.

### 2. Booking link (contact.html)
**Find:** `https://cal.com/freera/discovery`
**Do:** Replace with your actual booking URL. Options:
- [Cal.com](https://cal.com) — free, clean, recommended
- [Calendly](https://calendly.com) — most popular
- [SavvyCal](https://savvycal.com) — premium feel

### 3. Contact form endpoint (contact.html)
**Find:** `https://formspree.io/f/your-form-id`
**Do:** The form currently points to Formspree. To activate:
1. Sign up free at [formspree.io](https://formspree.io)
2. Create a new form, copy your endpoint URL
3. Replace `your-form-id` in `contact.html`

Alternatives:
- **Netlify Forms** — if hosting on Netlify, add `data-netlify="true"` to the `<form>` tag
- **Web3Forms** — free, no signup, another simple option
- **Your own backend** — point the form action to any endpoint

### 4. Social links (contact.html)
**Find:** The LinkedIn card at the bottom of the contact page
**Do:** Replace `href="#"` with your LinkedIn URL.

### 5. Legal pages (footer)
**Find:** `Privacy` and `Terms` links in every footer
**Do:** Either link to your privacy/terms pages (create `privacy.html` and `terms.html`), or remove if not needed yet.

## Deployment

This is pure HTML/CSS — you can deploy it anywhere:

- **Netlify** — drag & drop the folder at [app.netlify.com/drop](https://app.netlify.com/drop)
- **Vercel** — `vercel --prod` in the folder, or drag & drop
- **Cloudflare Pages** — connect a repo or upload directly
- **GitHub Pages** — push to a repo, enable Pages in settings
- **Traditional hosting** — upload all files to your `public_html` or `www` directory via FTP/cPanel

## Customisation tips

**Colors** — all defined at the top of `styles.css` as CSS variables. Change once, applied everywhere.
Primary palette: coral `#FF6B4A`, cobalt `#1E3AFF`, butter `#FFD966`, cream `#FFF5EB`, ink `#121726`.

**Fonts** — `Fraunces` (serif display) + `Plus Jakarta Sans` (body). Loaded from Google Fonts; change the `@import` at the top of `styles.css` to swap.

**Logo** — currently a text wordmark "Freera" with a coral dot. Swap for an SVG or image whenever you have one ready — just replace the `.logo` element in each file's nav.

## SEO quick wins

Before launching, also:
- Replace the `<title>` and `<meta description>` on each page with your final copy
- Add a `favicon.ico` to the root
- Create a `robots.txt` and `sitemap.xml`
- Add Google Analytics or Plausible to `styles.css`'s parent folder

## Next iterations to consider

1. **Case studies page** once you have 1–2 clients to feature
2. **Blog / insights** for SEO (even 1 post/month helps)
3. **Pricing transparency** — research shows visible starting prices convert better
4. **Real testimonials** — even short quotes with a name + photo boost conversion meaningfully
5. **Multi-language** if your target markets speak different languages

That's it. Good luck with the launch — Freera's off to a strong start.
