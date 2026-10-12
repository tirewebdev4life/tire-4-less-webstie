# V6 LOCAL SMOKE TEST

Run the website with the Node server, then test at `http://localhost:3200`.

1. Reviews: click AUTO / TRUCK; only the Mechanic Services card should remain. Click RIM, Roadside, Towing, Commercial and confirm one matching category card each. Choose a specific location and confirm the empty state appears until real location-tagged work is loaded.
2. Road Notes: confirm 6 article cards. Buying Guides, Tire Care and Roadside should each show 2. Open at least 3 article pages.
3. All Services: confirm 26 cards, including Towing, with different color accents and useful microcopy.
4. Service detail pages: confirm media layout (1 large + 2 small), no blue/teal developer-writing instructions, three real request steps and service-specific FAQs.
5. Freedom / North Tryon / Concord: confirm each branch gallery shows 6 visual slots.
6. Contact scheduler: North Tryon and Concord must not show Wheel Alignment; Freedom Drive must show it.
7. Auto Glass: choose Mobile and confirm Current Vehicle Location appears and becomes required.
8. Roadside: confirm all six service-card anchors jump within the same Roadside page.
9. Forms: confirm end-user email is required. With SMTP configured, submit Tire Availability, Shop Service and Auto Glass and verify business email + customer receipt.
10. Mobile: test nav, card grids, media galleries and forms at a narrow viewport.
