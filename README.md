# Rozi Accounting Services — website

Static site (no build step). Upload all files to any host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, or your current host).

Pages: index.html, about.html, services.html, contact.html, intake.html (new client intake form), portal.html (secure client portal page), pay.html (online payment page)
Shared: styles.css (all colors and fonts are set at the top), script.js (mobile menu, animations, forms), logo.svg (Rozi sea turtle logo, used in the header, footer and as the browser tab icon)

Brand colors: deep navy #214187 from the sea turtle logo (buttons, links, highlights), dark navy #111c33 (footer), and a muted gold accent #b08d57 used sparingly for small details.

Before going live:
- Contact form and new client intake form send submissions to Formspree (FORM_ENDPOINT in script.js: https://formspree.io/f/xaeqqjop). Formspree emails each submission and keeps a copy in the Formspree dashboard.
- Client portal (portal.html): this page links clients to a secure document portal service; it does not store files itself. Paste your portal provider's sign-in link into PORTAL_URL at the bottom of script.js. Until then, the "Sign in to the portal" button asks clients to call (805) 919-6009.
- Payments (pay.html): this page sends clients to your payment processor's secure checkout; the website never handles card numbers. Paste your payment link (Stripe, Square, QuickBooks Payments, etc.) into PAYMENT_URL at the bottom of script.js. Until then, the "Pay now" button asks clients to call (805) 919-6009.
