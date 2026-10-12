# Correction Pass — Footer, Finance and Policy Pages

Date: October 8, 2026

## Completed

- Removed runtime policy-footer injection from `assets/shared/integration.js`.
- Kept one static policy row directly below the original global footer bottom.
- Aligned the policy row and disclosure to the same content width as the footer.
- Restored `FINANCING` in the global header and footer on every public route.
- Added a limited Home financing feature linking to the dedicated Finance page.
- Preserved local American First artwork and Snap QR artwork.
- Corrected stale North Tryon 24/7 wording in public pages.
- Normalized duplicate doctype lines left in legacy HTML files.
- Added all six Road Notes articles and four policy pages to the route registry.
- Reworked Privacy, Accessibility, Website Terms and Cookies pages into
  customer-facing, responsive notices with skip links, dates, navigation and
  readable mobile layouts.

## Verification

- 41 HTML routes present.
- One global footer per regular route; one policy footer per policy route.
- Zero `t4l-policy-links` runtime injection blocks.
- Finance link present in every regular route's header and footer.
- Zero broken local links or local image paths.
- Zero remote production image sources.
- Zero missing image alt attributes.
- All four policy routes, Finance, sitemap and robots return HTTP 200 through
  the Node preview server.
- Node syntax checks pass for the root server and shared scripts.

## Still required before legal publication

The policy pages are accurate plain-language website notices, not a legal
compliance certification. The owner or counsel must approve the legal entity,
mailing address, retention rules, state-specific rights, governing law and any
provider-required finance disclosures before launch.
