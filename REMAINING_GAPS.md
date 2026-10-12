# T4L REMAINING GAPS REGISTER

| ID | Area | Priority | Status | Gap | Required next action |
|---|---|---|---|---|---|
| GAP-001 | Email Delivery | BLOCKER | Open | Gmail App Password / SMTP credential is not supplied. | Configure Gmail 2-Step Verification + App Password in server/.env, or swap to approved email provider. |
| GAP-002 | Email Deployment | BLOCKER | Open | The Node email API is implemented but not deployed to a public runtime. | Deploy server/ with the site on Node-capable hosting or convert /api/request to the chosen serverless platform. |
| GAP-003 | Email E2E Test | BLOCKER | Open | No live SMTP credentials means business-email + customer-receipt delivery cannot be end-to-end verified yet. | After GAP-001/002, submit real tests for service, tire and Auto Glass flows and verify both inboxes. |
| GAP-004 | Server Dependencies | High | Open | server/package.json is included; dependencies still need npm install in the deployment environment. | Run npm install in server/ during deployment/build. |
| GAP-005 | New Tire Database | Future | Deferred | New Tire internal inventory lookup/database is intentionally future work. | Build authoritative new-tire data source/API, then connect only New Tires to it. |
| GAP-006 | Used Tire Inventory | Locked Rule | No Build | Used Tires should not use a maintained public inventory. | Keep request/email flow; do not convert Used Tires to live inventory without new owner direction. |
| GAP-007 | Used Tire Warranty | Content Hold | Open | Exact used-tire warranty terms remain unapproved. | Insert only owner-approved duration, exclusions and claim process. |
| GAP-008 | Rim Repair Warranty | Content Hold | Open | Exact rim-repair warranty terms remain unapproved. | Insert only owner-approved terms. |
| GAP-009 | Heavy / Diesel | Capability Hold | Open | Heavy/diesel service remains separately unconfirmed despite commercial/basic-maintenance services being confirmed. | Confirm technician, locations and exact service scope before publishing. |
| GAP-010 | Heavy / Commercial Towing | Capability Hold | Open | Exact towing equipment / vehicle classes remain unconfirmed. | Confirm before publishing heavy/commercial towing claims. |
| GAP-011 | Commercial Roadside Extras | Capability Hold | Open | Commercial-specific Roadside capability remains separately unconfirmed. | Confirm exact fleet/commercial mobile roadside scope. |
| GAP-012 | Reviews | Content Hold | Open | Verified review records are not loaded. | Connect approved review records only; no fabricated quotes/scores. |
| GAP-013 | Road Notes | Content Hold | Open | Production article records are not loaded. | Connect approved Road Notes/CMS content. |
| GAP-014 | Team Profiles | Content Hold | Open | Approved team names/roles/photos/bios are not loaded. | Insert approved profiles only. |
| GAP-015 | Branch Photography | Content Hold | Open | Location/property image placeholders still await real branch photos. | Replace placeholders with approved real photography. |
| GAP-016 | Service Zones | Operations Hold | Open | Exact Roadside/Towing geographic zones remain unpublished/unverified. | Keep call-to-confirm until authoritative zone data is supplied. |
| GAP-017 | Hosting Domain / SEO Canonicals | Launch | Open | Final public domain/environment is not supplied. | After staging/live URL exists, add canonical URLs/sitemap/robots as appropriate and smoke-test. |
| GAP-018 | Live Browser/Device QA | Launch | Open | Static integration QA passes, but final live-host browser/device behavior needs staging validation. | Test desktop/mobile nav, every scheduler, forms, filters, maps, calls and email flow on staging. |

## Remaining source holds detected in the final HTML
- `used-tire-warranty` on P03 Used Tires — awaiting-owner-approved-terms — USED TIRE WARRANTY Public warranty terms and exclusions must be inserted only after owner approval.
- `commercial-roadside-extra` on P05 Semi & Commercial — awaiting-owner-confirmed-commercial-roadside-capability — COMMERCIAL ROADSIDE EXTRAS Publish only when the exact mobile/commercial capability is confirmed.
- `heavy-diesel` on P08 Auto & Truck Repair — awaiting-owner-confirmed-heavy-diesel-repair-capability — HEAVY / DIESEL SERVICE Publish only after exact capability, technician and location are confirmed.
- `rim-repair-warranty` on P09 Rim Repair — awaiting-owner-approved-rim-repair-warranty-terms — RIM REPAIR WARRANTY Publish only after exact terms, exclusions and duration are approved.
- `heavy-commercial-towing` on P10 Towing — awaiting-owner-confirmed-heavy-commercial-towing-equipment-and-vehicle-classes — HEAVY / COMMERCIAL TOWING Publish as a confirmed service only after exact equipment, vehicle class and availability are approved.
- `road-notes-posts` on P13 Road Notes — awaiting-published-road-notes-records — 
- `team-profiles` on P14 About / Team — awaiting-owner-approved-team-names-roles-photos-bios — 
- `verified-reviews` on P15 Reviews / Our Work — awaiting-approved-review-records — VERIFIED REVIEW CMS LIST
