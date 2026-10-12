# T4L V4 — REMAINING GAPS REGISTER

| ID | Area | Priority | Status | Gap | Required next action | Owner |
|---|---|---|---|---|---|---|
| GAP-001 | Email Delivery | BLOCKER | Open | Gmail App Password / SMTP credential is not supplied. | Securely configure SMTP_APP_PASSWORD (or an approved email provider) before launch. | Owner / Deployment |
| GAP-002 | Email API Deployment | BLOCKER | Open | The `/api/request` email endpoint exists in code but is not deployed to a public runtime. | Deploy the Node/serverless API with the website. | Deployment |
| GAP-003 | Email End-to-End QA | BLOCKER | Open | Business email + customer receipt cannot be verified until credentials and deployment are live. | Submit real Tire, Service and Auto Glass requests and verify both inboxes. | QA |
| GAP-004 | Server Dependencies | High | Open | Deployment environment still needs the backend dependencies installed. | Run `npm install` in `server/` during deployment/build. | Deployment |
| GAP-005 | Appointment Calendar | High | Open | Current appointment flow is a preferred date/time request, not a live slot reservation calendar. | Keep request-based confirmation or connect an approved calendar/internal scheduling source later. | Product / Ops |
| GAP-006 | New Tire Database | Future | Deferred | New Tire lookup does not yet use the future internal inventory database. | Build an authoritative New Tire inventory/API and connect only the New Tire flow. | Inventory |
| GAP-007 | Used Tire Warranty | Content Hold | Open | Exact used-tire warranty terms remain unapproved. | Insert only owner-approved duration, exclusions and claim process. | Owner |
| GAP-008 | Rim Repair Warranty | Content Hold | Open | Exact rim-repair warranty terms remain unapproved. | Insert only owner-approved terms, exclusions and duration. | Owner |
| GAP-009 | Heavy / Diesel Scope | Capability Hold | Open | Heavy/Diesel repair remains separately unconfirmed. | Confirm technician, location and exact customer-facing scope before publishing. | Owner / Ops |
| GAP-010 | Heavy / Commercial Towing | Capability Hold | Open | Exact towing equipment and vehicle classes remain unconfirmed. | Confirm before publishing heavy/commercial towing claims. | Owner / Ops |
| GAP-011 | Commercial Roadside Extras | Capability Hold | Open | Commercial-specific Roadside capability remains unconfirmed. | Confirm exact fleet/commercial mobile Roadside scope. | Owner / Ops |
| GAP-012 | Verified Reviews | Content Hold | Open | No approved review records were supplied for actual on-page placement. | Load real review records and place them by service/location without inventing quotes or scores. | Content |
| GAP-013 | Real Photography | Content Hold | Open | Approved branch/service photography has not been supplied for all proof/gallery positions. | Add real location, service, Roadside, Towing and completed-work photography. | Content |
| GAP-014 | Team Profiles | Content Hold | Open | Approved team names, roles, photos and bios are not supplied. | Add only approved team profiles. | Content |
| GAP-015 | Road Notes Articles | Content Hold | Open | The landing page is customer-facing, but full published Road Notes articles are not supplied. | Add approved long-form Buying Guide, Tire Care and Roadside articles. | Content |
| GAP-016 | Roadside / Towing Zones | Operations Hold | Open | Exact geographic coverage zones are not verified. | Keep call-to-confirm routing until authoritative zones are supplied. | Owner / Ops |
| GAP-017 | Auto Glass Mobile Coverage | Operations Hold | Open | Mobile Auto Glass is confirmed, but the exact mobile service area is not supplied. | Keep location-request routing until the mobile coverage area is confirmed. | Owner / Ops |
| GAP-018 | Towing Contact Routing | Operations Hold | Open | A separate final Towing phone/routing path has not been supplied. | Confirm whether Towing uses a dedicated number or the current Contact/Towing route. | Owner / Ops |
| GAP-019 | Production Domain / Canonicals | Launch | Open | Final production domain is not supplied, so canonical URLs, sitemap and robots rules are not final. | Add canonical URLs, sitemap and robots configuration after staging/production domain is known. | Deployment / SEO |
| GAP-020 | Live Browser / Device QA | Launch | Open | Static QA passes, but the live-host environment still needs browser/device testing. | Test navigation, forms, anchors, responsiveness, maps, calls and email on staging. | QA |

## Hidden source holds preserved but not shown to customers
- `team-profiles` — about.html — awaiting-owner-approved-team-names-roles-photos-bios — public visibility: No
- `heavy-diesel` — auto-repair.html — awaiting-owner-confirmed-heavy-diesel-repair-capability — public visibility: No
- `commercial-roadside-extra` — commercial-tires.html — awaiting-owner-confirmed-commercial-roadside-capability — public visibility: No
- `verified-reviews` — reviews.html — awaiting-approved-review-records — public visibility: No
- `rim-repair-warranty` — rim-repair.html — awaiting-owner-approved-rim-repair-warranty-terms — public visibility: No
- `road-notes-posts` — road-notes.html — awaiting-published-road-notes-records — public visibility: No
- `heavy-commercial-towing` — towing.html — awaiting-owner-confirmed-heavy-commercial-towing-equipment-and-vehicle-classes — public visibility: No
- `used-tire-warranty` — used-tires.html — awaiting-owner-approved-terms — public visibility: No
