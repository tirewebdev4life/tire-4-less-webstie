# Tires 4 Less — FINAL Integrated 19-Page Website

This build integrates the frozen P01–P19 page packages into one deployable multipage website.

## Integration strategy
- P01 owns the only root `index.html`.
- P02–P19 use their canonical named route files.
- Every page keeps its original page-specific CSS, JavaScript, icons, textures and interactions.
- Page implementation assets are namespaced under `assets/pages/Pxx/` to prevent filename collisions.
- One canonical global navigation/footer layer is injected across all 19 pages using `assets/shared/integration.css` and `integration.js`.
- Internal route names are normalized to the canonical 19-page route map.
- Existing page forms continue to behave as originally designed.
- A shared form bridge can POST JSON when a production endpoint is configured; without one, test payloads are safely retained in browser localStorage.

## Production form integration
Set `window.T4L_SITE_CONFIG.formEndpoint` before deployment, or modify `assets/shared/integration.js`.
No production backend endpoint was provided in the source packages, so this dependency is intentionally not fabricated.

## Canonical routes
index.html
tires.html
used-tires.html
new-tires.html
commercial-tires.html
services.html
tire-repair.html
auto-repair.html
rim-repair.html
towing.html
roadside.html
locations.html
road-notes.html
about.html
reviews.html
contact.html
freedom-drive.html
north-tryon.html
concord.html


## Final static integration result
- 19/19 canonical routes present.
- Page-specific implementation assets are isolated under `assets/pages/P01` through `P19`.
- Shared shell assets live under `assets/shared`.
- Canonical navigation/footer is injected on all 19 pages.
- Static local routes, anchors and asset references pass integration QA.


## Transcript-aligned correction pass — 2026-08-27

The website now contains the original 19-page integrated site plus 11 dedicated service-detail routes.

### Service synchronization
- The central source of truth is `assets/shared/service-catalog.json`.
- Appointment/service dropdowns are catalog-driven and grouped by:
  Tire Services → Alignment → Mechanic → Auto Glass → Wheel/Rim → Fleet & Commercial.
- Multi-location appointment forms require location first.
- Wheel Alignment is available only for Freedom Drive.
- North Tryon and Concord reroute Alignment to Freedom.
- P16 Contact now uses five pathways: Tire Availability, Shop Service / Appointment, Auto Glass / Mobile Windshield, 24/7 Roadside, Towing.
- TPMS is now public as Sensor Replacement, Relearn & Programming.
- New Tire brand set: Michelin, Continental, Cooper, Mickey Thompson, Goodyear, BFGoodrich.

### Email / request implementation
- Every real customer request form requires the end-user's email address.
- Browser requests POST to `/api/request`.
- Backend implementation is in `server/server.js`.
- Business destination: `tirewebdev4life@gmail.com`.
- Customer email is used as Reply-To.
- Server sends a customer acknowledgement receipt.
- No Gmail credential is embedded.

### Email is not live until deployment configuration is completed
Required:
1. Gmail 2-Step Verification.
2. Gmail App Password entered as `SMTP_APP_PASSWORD` in a private `.env`.
3. `npm install` inside `server/`.
4. Deploy the Node/API runtime.
5. End-to-end test business inbox + customer receipt.

See:
- `server/EMAIL_SETUP.md`
- `REMAINING_GAPS.md`
- `FINAL_CORRECTION_QA.md`
- `T4L_Final_Integration_Register_v3_Corrections.xlsx` in the delivery bundle.


## V4 public-content / design refinement
The v4 pass removes production scaffolding from the customer experience without redesigning the site architecture.

Completed:
- Site-wide fourth-wall sanitation.
- Removal of visible transition/design notes.
- Reviews / Our Work empty/placeholder policy cleanup.
- Roadside converted to one six-anchor authority page.
- Auto Glass request form styled.
- Home reduced to a 9-family service gateway.
- 11 new service-detail pages expanded with mature SEO/customer content.
- Unique title/meta across all 30 routes.
- Branch LocalBusiness/AutoRepair structured data.
- Full static QA with no route, anchor, asset, duplicate-ID or visible-scaffold failures.

See:
- `PUBLIC_CONTENT_REFINEMENT_AUDIT.md`
- `FINAL_PUBLIC_REFINEMENT_QA.md`
- `REMAINING_GAPS_V4.md`


## V5 SEO / GEO / E-E-A-T content refinement
V5 applies the manual content blueprint to the actual 30-route customer-facing site.

Completed:
- unique titles, meta descriptions, H1s and answer-first copy on all 30 routes;
- section-order corrections on Home, Contact, Locations and branch pages;
- 141 route-specific FAQ answers;
- 11 differentiated service-detail pages;
- Roadside service/hour corrections;
- North Tryon address correction;
- service/local claim guardrails;
- conservative Service JSON-LD on confirmed service routes;
- static route/asset/H1/meta/form/JS QA.

Still pending:
- live email credentials/deployment/E2E test;
- real reviews/work records and photography;
- owner-approved warranty / capability holds;
- final production domain, canonicals, sitemap/robots;
- live browser/device QA.


## V7 final semantic image correction
The licensed-image pass is now semantically QA'd against every corrected title/image pairing. Misleading generic images were replaced or intentionally withheld. Service/gallery titles remain visible. See `V7_FINAL_SEMANTIC_QA.md` and the image license manifest for the final audit and source record.
