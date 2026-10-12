# T4L V5 — REMAINING GAPS

| ID | Area | Priority | Status | Gap | Required Next Action | Owner |
|---|---|---|---|---|---|---|
| GAP-001 | Email Delivery | BLOCKER | Open | Gmail App Password / SMTP credential is not supplied. | Securely configure SMTP_APP_PASSWORD or approved transactional email credentials. | Owner / Deployment |
| GAP-002 | Email API Deployment | BLOCKER | Open | `/api/request` exists in code but is not deployed to the public runtime. | Deploy the Node/serverless request API with the site. | Deployment |
| GAP-003 | Email End-to-End QA | BLOCKER | Open | Business email + customer receipt cannot be live-tested until credentials and deployment are ready. | Test Tire, Service and Auto Glass requests in staging and verify both inboxes. | QA |
| GAP-004 | Server Dependencies | High | Open | Deployment environment still needs backend dependencies installed. | Run `npm install` in `server/` as part of the deployment/build. | Deployment |
| GAP-005 | Live Appointment Calendar | Future | Deferred | Preferred date/time is still a request, not a real-time slot reservation. | Connect an authoritative calendar/internal scheduler only if live booking is desired. | Product / Ops |
| GAP-006 | New Tire Database | Future | Deferred | New Tire lookup remains request-based. | Connect the future authoritative New Tire inventory/API when ready. | Inventory |
| GAP-007 | Used Tire Warranty | Content Hold | Open | Exact written used-tire warranty terms remain unapproved. | Supply the current duration, exclusions and claim process before publishing specific terms. | Owner |
| GAP-008 | Rim Repair Warranty | Content Hold | Open | Exact Rim Repair warranty terms remain unapproved. | Supply the current written warranty terms before publishing specifics. | Owner |
| GAP-009 | Heavy / Diesel Scope | Capability Hold | Open | Heavy/Diesel repair remains separately unconfirmed. | Confirm technician, locations and exact public scope. | Owner / Ops |
| GAP-010 | Heavy / Commercial Towing | Capability Hold | Open | Exact towing equipment / heavy vehicle classes remain unconfirmed. | Confirm before publishing heavy/commercial towing as a standard capability. | Owner / Ops |
| GAP-011 | Commercial Roadside Extras | Capability Hold | Open | Commercial-specific mobile Roadside scope remains unconfirmed. | Confirm exact fleet/commercial Roadside capability before publishing extras. | Owner / Ops |
| GAP-012 | Verified Reviews / Work Records | Content Hold | Open | No approved review/work record set is loaded for real on-page proof. | Supply real source records, job context and location tags where supported. | Content |
| GAP-013 | Real Photography | Content Hold | Open | Several proof/gallery sections are intentionally hidden until real media is supplied. | Add approved branch, service, Roadside, Towing and completed-work photography. | Content |
| GAP-014 | Team Profiles / Business History | Content Hold | Open | Approved names, roles, bios, photos and verified business-history details are incomplete. | Add only approved people/history information. | Owner / Content |
| GAP-015 | Road Notes Articles | Content Hold | Open | The Road Notes hub is refined, but full authoritative articles are not yet supplied. | Publish real tire-buying, tire-care and Roadside guides with author/reviewer and updated date. | Content |
| GAP-016 | Roadside / Towing Geographic Coverage | Operations Hold | Open | Exact geographic service zones remain unpublished. | Keep call-to-confirm wording until authoritative coverage is supplied. | Owner / Ops |
| GAP-017 | Mobile Auto Glass Coverage | Operations Hold | Open | Mobile Auto Glass is confirmed; exact service area remains unpublished. | Confirm active mobile coverage before adding areaServed/radius copy. | Owner / Ops |
| GAP-018 | Towing Contact Routing | Operations Hold | Open | Final dedicated Towing phone/routing remains unresolved. | Confirm the public Towing phone or approved request/dispatch path. | Owner / Ops |
| GAP-019 | Production Domain / Canonicals | Launch | Open | Final public domain is not supplied. | Add absolute canonical URLs, BreadcrumbList URLs, sitemap and robots rules after domain is known. | Deployment / SEO |
| GAP-020 | Structured Data Validation | Launch | Open | Service and branch JSON-LD is syntactically valid but needs deployed-domain validation. | Validate final markup after canonicals/URLs are added. | SEO / QA |
| GAP-021 | Live Browser / Device QA | Launch | Open | Static QA passes; live-host visual, responsive and interaction QA is still required. | Test desktop/mobile nav, forms, anchors, calls, maps, schema and email on staging. | QA |
