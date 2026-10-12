# Legacy server prototype — do not use for the final build

The supported final build uses the root `server.js` and the deployed Google
Apps Script endpoint. This nested folder is retained only as historical source
material. Do not install its dependencies, configure SMTP credentials, or run
`server/server.js`.

The website now POSTs customer requests to `/api/request`.

## What the server does
- Requires a valid end-user email.
- Emails the request to `tirewebdev4life@gmail.com`.
- Uses the customer's email as Reply-To.
- Sends an acknowledgement receipt to the customer.
- Uses separate subject formats for service requests, tire requests and Auto Glass.
- Does not claim an appointment or tire inventory is confirmed.

## Gmail requirement still open
Google will not allow the website to send email merely because the Gmail address is known.
Before email is live, Tires 4 Less must provide/configure a Gmail App Password (or replace Nodemailer Gmail auth with an approved transactional email provider).

1. Enable 2-Step Verification on the Gmail account.
2. Create a Gmail App Password for the website server.
3. Copy `.env.example` to `.env`.
4. Put the App Password in `SMTP_APP_PASSWORD`.
5. Run:
   `npm install`
   `npm start`
6. Submit a test request and confirm:
   - business inbox receives it,
   - Reply-To is the customer,
   - customer receives the acknowledgement.

Never commit the real App Password into the website ZIP or source repository.
