require('dotenv').config();
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3200;
const SITE_ROOT = path.resolve(__dirname, '..');
const T4L_INBOX = process.env.T4L_INBOX || 'tirewebdev4life@gmail.com';

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '200kb' }));
app.use(express.urlencoded({ extended: false, limit: '200kb' }));
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, limit: 60, standardHeaders: true, legacyHeaders: false }));

function clean(value, max = 4000) {
  if (value === undefined || value === null) return '';
  return String(value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').slice(0, max).trim();
}
function escapeHtml(s) {
  return clean(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}
function isEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean(s, 320));
}
function labelFor(key) {
  return key.replace(/^_/,'').replace(/_/g,' ').replace(/\b\w/g,m=>m.toUpperCase());
}
function subjectFor(body) {
  const page = clean(body._page, 120);
  const service = clean(body.service || body.problem || body.need || 'Request', 160);
  const location = clean(body.location || body.branch || 'Location not selected', 120);
  const condition = clean(body.condition || body.type || '', 80);
  const size = clean(body.full_size || body.tire_size || [body.width,body.profile,body.rim].filter(Boolean).join('/'), 80);
  const qty = clean(body.qty || body.quantity || '', 30);

  if (/auto-glass/i.test(clean(body._formId)) || /glass/i.test(service)) {
    return `[T4L AUTO GLASS] ${clean(body.service_method || 'Request')} — ${clean(body.vehicle || location)}`;
  }
  if (/tire/i.test(clean(body._formId)) || body.condition || body.full_size || (body.width && body.rim)) {
    return `[T4L TIRE REQUEST] ${condition || 'TIRE'} — ${size || 'SIZE NEEDED'}${qty ? ` — Qty ${qty}` : ''} — ${location}`;
  }
  return `[T4L SERVICE REQUEST] ${location} — ${service}`;
}
function buildRows(body) {
  const skip = new Set(['_operationalEmail','_customerReceiptRequested']);
  return Object.entries(body)
    .filter(([k,v]) => !skip.has(k) && clean(v) !== '')
    .map(([k,v]) => `<tr><td style="padding:7px 10px;border:1px solid #ddd;font-weight:700">${escapeHtml(labelFor(k))}</td><td style="padding:7px 10px;border:1px solid #ddd">${escapeHtml(Array.isArray(v)?v.join(', '):v)}</td></tr>`)
    .join('');
}

let transporter = null;
function getTransporter() {
  if (transporter) return transporter;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_APP_PASSWORD;
  if (!user || !pass || /PASTE_/.test(pass)) {
    const err = new Error('SMTP_NOT_CONFIGURED');
    err.code = 'SMTP_NOT_CONFIGURED';
    throw err;
  }
  transporter = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });
  return transporter;
}

app.post('/api/request', async (req, res) => {
  const body = req.body || {};
  const customerEmail = clean(body.email, 320);
  if (!isEmail(customerEmail)) {
    return res.status(400).json({ ok:false, error:'A valid customer email is required.' });
  }

  try {
    const tx = getTransporter();
    const subject = subjectFor(body);
    const rows = buildRows(body);

    await tx.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'Tires 4 Less'}" <${process.env.SMTP_USER}>`,
      to: T4L_INBOX,
      replyTo: customerEmail,
      subject,
      text: Object.entries(body).map(([k,v]) => `${labelFor(k)}: ${Array.isArray(v)?v.join(', '):v}`).join('\n'),
      html: `<h2>${escapeHtml(subject)}</h2><table style="border-collapse:collapse">${rows}</table>`
    });

    await tx.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'Tires 4 Less'}" <${process.env.SMTP_USER}>`,
      to: customerEmail,
      subject: 'Tires 4 Less — We received your request',
      text: 'We received your Tires 4 Less request. A requested appointment is not confirmed until the shop responds, and a tire request does not confirm inventory or pricing. Tires 4 Less will respond using the contact information you provided.',
      html: `<h2>We received your request.</h2>
             <p>A requested appointment is not confirmed until the shop responds.</p>
             <p>A tire request does not confirm inventory or pricing.</p>
             <p>Tires 4 Less will respond using the contact information you provided.</p>
             <p><strong>24-hour Roadside:</strong> (980) 319-0381</p>`
    });

    return res.json({ ok:true, receiptSent:true });
  } catch (err) {
    console.error(err);
    if (err.code === 'SMTP_NOT_CONFIGURED') {
      return res.status(503).json({ ok:false, error:'Email server credentials are not configured.' });
    }
    return res.status(500).json({ ok:false, error:'Unable to send the request email.' });
  }
});

app.use('/server', (req,res) => res.sendStatus(404));
app.use(express.static(SITE_ROOT, { extensions:['html'], dotfiles:'deny' }));
app.use((req,res,next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(SITE_ROOT, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Tires 4 Less website running on http://localhost:${PORT}`);
  console.log(`Business request inbox: ${T4L_INBOX}`);
});
