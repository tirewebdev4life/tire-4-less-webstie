# Tires 4 Less Final Recovered Website

This is a static website with a tiny Node relay for the request forms. The relay
forwards form data to the deployed Google Apps Script endpoint; it does not
require npm packages or a Gmail password in production.

## Beginner local preview

### Windows PowerShell (working forms)

From inside this folder, run the included `server.js`:

```powershell
node server.js
```

Then open <http://localhost:8080>.

If Windows blocks `npm.ps1`, no npm command is needed for this build. Node 18+
is enough. If the folder path contains spaces, quote it with
`cd "C:\path\to\T4L_Website_FINAL_MASTER_REFINED_2"`.

`py -m http.server 8080` is only a visual/static preview. Forms will not be
confirmed there because that server does not provide `/api/request`.

The nested `server/` directory is a legacy SMTP prototype and is not part of
the supported build. Do not run `server/server.js` or install its old
dependencies. The root `server.js` is the only supported local relay.

## Implemented integrations

- 41 public HTML routes, including six Road Notes articles, the
  `finance.html` page, and dedicated Privacy, Accessibility, Terms and Cookies
  pages.
- American First Finance merchant application and local supplied artwork.
- Snap lease-to-own application, locally packaged QR artwork and disclosure.
- Finance is linked from the global navigation/footer and has a limited Home
  feature without spamming provider artwork across service pages.
- All customer forms submit through `/api/request`, and the included Node relay
  forwards them to the deployed Google Apps Script receiver owned by
  `tirewebdev4life@gmail.com`.
- Customer receipts and private Google Sheet logging are handled by that
  receiver.
- Live Google Maps embeds appear on all three individual location pages.
- All licensed service/editorial imagery is packaged locally.
- Real-business-only photo structures remain preserved until approved shop,
  team and job photography is supplied.

## Important launch rule

Before replacing the current live site, test the uploaded staging build on a
phone and desktop. Submit one controlled test from each request family and
confirm the business email, customer receipt and private Sheet row.

See `FINAL_REMAINING_GAPS.md` for owner-supplied content and deployment items.
The dedicated `privacy.html`, `accessibility.html`, `terms.html` and
`cookies.html` pages are customer-facing plain-language notices. They still
require owner/legal review before being treated as jurisdiction-specific legal
advice or a compliance certification. `robots.txt` and `sitemap.xml` use `tiress4less.com` provisionally until
the final DNS host is confirmed.
