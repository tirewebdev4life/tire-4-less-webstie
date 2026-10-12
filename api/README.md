# Form relay deployment

The website submits forms to the same-origin Node route `/api/request`.
Run `node server.js` locally or deploy the same Node server with the website.

The relay forwards requests server-to-server to the deployed Google Apps Script
endpoint and returns JSON to the browser. This is required because a browser
cannot read a cross-origin Apps Script response directly.

Before launch, submit one test from each request family and confirm the Gmail
message, customer receipt, Sheet row, and request reference shown on the site.
