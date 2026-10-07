// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
}

// Scroll reveal
const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 }) : null;
document.querySelectorAll('.reveal').forEach((el) => io ? io.observe(el) : el.classList.add('in'));

// Footer year
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

// Form submissions go to Formspree, which emails them to you and keeps a copy in your Formspree dashboard.
const FORM_ENDPOINT = 'https://formspree.io/f/xaeqqjop';

// Contact form
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.querySelector('.form-status');
    const button = form.querySelector('button[type="submit"]');
    const d = new FormData(form);
    d.append('_subject', `Website inquiry${d.get('service') ? ' — ' + d.get('service') : ''} from ${d.get('name')}`);
    d.append('Form', 'Contact page');
    button.disabled = true;
    try {
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: d, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error();
      form.reset();
      status.textContent = "Thanks! Your message was sent. We'll get back to you within one business day.";
    } catch {
      status.textContent = "We couldn't send your message. Please try again, or call us at (805) 919-6009.";
    }
    status.classList.add('show');
    button.disabled = false;
  });
}

// New client intake form
const INTAKE_ENDPOINT = FORM_ENDPOINT;
const intake = document.querySelector('#intake-form');
if (intake) {
  const biz = document.querySelector('#business-section');
  const renumber = () => {
    const showBiz = ['My business', 'Both'].includes(intake.querySelector('input[name="Client type"]:checked')?.value);
    biz.hidden = !showBiz;
    intake.querySelectorAll('[data-renumber]').forEach((el, i) => { el.textContent = i + (showBiz ? 4 : 3); });
  };
  intake.querySelectorAll('input[name="Client type"]').forEach((r) => r.addEventListener('change', renumber));
  renumber();

  intake.addEventListener('input', (e) => e.target.classList.remove('invalid'));
  intake.addEventListener('change', (e) => { if (e.target.name === 'Services') document.querySelector('#services-error').hidden = true; });

  intake.addEventListener('submit', async (e) => {
    e.preventDefault();
    let ok = true;
    intake.querySelectorAll('input[required], select[required], textarea[required]').forEach((el) => {
      const valid = el.type === 'radio' ? !!intake.querySelector(`input[name="${el.name}"]:checked`) : el.checkValidity();
      const target = el.type === 'radio' || el.type === 'checkbox' ? el.closest('.checks, .check') : el;
      target.classList.toggle('invalid', !valid);
      if (!valid) ok = false;
    });
    const anyService = !!intake.querySelector('input[name="Services"]:checked');
    document.querySelector('#services-error').hidden = anyService;
    if (!anyService) ok = false;
    document.querySelector('#form-error').hidden = ok;
    if (!ok) { intake.querySelector('.invalid, #services-error:not([hidden])')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }

    const data = new FormData(intake);
    if (biz.hidden) ['Business name', 'Business structure', 'Industry', 'Employees', 'Current bookkeeping', 'Annual revenue'].forEach((k) => data.delete(k));
    const lines = [];
    for (const key of new Set(data.keys())) {
      const val = data.getAll(key).filter(Boolean).join(', ');
      if (val) lines.push(`${key}: ${val}`);
    }
    const name = data.get('First name');
    data.append('_subject', `New client intake: ${name} ${data.get('Last name')}`);
    data.append('_replyto', data.get('Email'));
    data.append('Form', 'New client intake');

    if (INTAKE_ENDPOINT) {
      try {
        intake.querySelector('button[type="submit"]').disabled = true;
        const res = await fetch(INTAKE_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error();
      } catch {
        document.querySelector('#form-error').textContent = "We couldn't send your form. Please try again, or call us at (805) 919-6009.";
        document.querySelector('#form-error').hidden = false;
        intake.querySelector('button[type="submit"]').disabled = false;
        return;
      }
    } else {
      window.location.href = `mailto:info@roziglobal.com?subject=${encodeURIComponent('New client intake: ' + name + ' ' + data.get('Last name'))}&body=${encodeURIComponent(lines.join('\n'))}`;
    }
    document.querySelector('#done-name').textContent = name;
    intake.hidden = true;
    document.querySelector('#intake-done').hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Secure client portal
// Paste the sign-in link from your portal provider (for example SmartVault, ShareFile, TaxDome or Canopy)
// between the quotes. Every "Sign in to the portal" button on the site uses this one link.
const PORTAL_URL = '';
document.querySelectorAll('[data-portal-link]').forEach((a) => {
  if (PORTAL_URL) {
    a.href = PORTAL_URL;
    a.target = '_blank';
    a.rel = 'noopener';
  } else {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('[data-portal-pending]').forEach((p) => { p.hidden = false; });
    });
  }
});

// Online payments
// Paste your payment link from Stripe, Square, QuickBooks Payments or a similar service between the quotes.
// Every "Pay now" button on the site uses this one link.
const PAYMENT_URL = '';
document.querySelectorAll('[data-pay-link]').forEach((a) => {
  if (PAYMENT_URL) {
    a.href = PAYMENT_URL;
    a.target = '_blank';
    a.rel = 'noopener';
  } else {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('[data-pay-pending]').forEach((p) => { p.hidden = false; });
    });
  }
});
