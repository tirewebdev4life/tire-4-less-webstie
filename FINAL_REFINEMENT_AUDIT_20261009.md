# Final refinement audit — 2026-10-09

## Completed in this correction pass

- Added required `name` fields to the six routed forms that were previously
  rejected by the Node relay validation.
- Added explicit `action="api/request"` and `method="post"` to all 19
  email-bearing customer forms. The existing JavaScript enhancement remains in
  place for the same-origin relay.
- Kept the deployed Apps Script URL server-side as the relay destination and
  changed the public site configuration to document `/api/request` as the
  browser endpoint.
- Made Apps Script response parsing understand the deployed HTML wrapper and
  its authoritative `postMessage` JSON result. The browser status now follows
  the relay's confirmed acceptance result instead of treating the wrapper HTML
  as a failure.
- Extended the relay/client response window to 75 seconds for Apps Script
  processing and Sheet logging.
- Added dropdown `aria-haspopup`/`aria-expanded` state, restored meaningful
  hero-image alt text to the accessibility tree, removed one empty image
  placeholder, strengthened keyboard focus contrast, improved footer and
  finance/policy kicker readability, added reduced-motion support, and
  corrected shared pale-surface icon/control contrast.

## Automated checks passed

- 41 HTML routes parsed.
- 19 email-bearing forms: all have required name fields, `action="api/request"`
  and `method="post"`.
- No duplicate IDs, broken local asset references, missing image sources, or
  unresolved same-page fragments.
- No remote image hotlinks in production `src` attributes; licensed image
  files remain packaged locally.
- Google Maps embeds remain present on Freedom Drive, North Tryon and Concord.
- Finance navigation remains present across all routes.
- `server.js` and `assets/shared/integration.js` pass Node syntax checks.
- JSON control files parse successfully.
- Local server serves the home and Finance routes and returns clear JSON for
  invalid/spam form submissions.

## Launch-only verification still required

- Run one controlled valid submission from each request family against the
  deployed staging host and confirm the business email, customer receipt and
  private Sheet row.
- Confirm the final DNS/host before replacing the provisional sitemap and
  canonical-domain values.
- Replace reserved real-business photo holds only with approved Tires 4 Less
  storefront, team, customer-job and before/after photography.
- Have the owner/legal reviewer approve the plain-language policy pages for
  the final business entity and jurisdiction.
