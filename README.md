# Kaide Salo — Software Engineer Portfolio

A responsive portfolio with a server-side contact form. Editable page files live in `site/`; `worker/index.js` serves them and handles `POST /api/contact`.

- Edit identity and page copy in `site/index.html`.
- Edit concept projects and browser interactions in `site/script.js`.
- Design tokens and responsive layouts live in `site/styles.css`.
- Project visuals and self-hosted fonts live in `site/assets/`.
- Build with `node scripts/build-site.mjs`. This embeds assets in the dependency-free Worker and writes `dist/server/index.js` plus the hosting manifest.

The contact form submits to the same-origin server endpoint. The recipient is read from the secret runtime value `CONTACT_RECIPIENT` and is never sent to the browser. The server forwards messages with FormSubmit. FormSubmit requires a one-time recipient confirmation before delivery can work. Failed or unconfirmed deliveries return an error; the interface preserves the message for retry. No submitted message content is logged.

Configure runtime secrets through Sites. Keep credentials and recipient values out of source, client bundles, and the hosting manifest.

The resume section reserves a space for my resume PDF and currently opens the contact form with a resume request. To add the file, place a PDF in `site/assets/` and replace the placeholder with a download link to it, then build and publish.

Project examples and technology directions are illustrative. These examples will be replaced with my current projects shortly.

## Build

Requires Node.js 22 or newer. There are no package dependencies to install.

```sh
npm run build
```

The build validates the Worker and writes generated output to `dist/`, which is ignored by Git.

## Hosting

Once fully hosted the product will be available for viewing on `www.vulpibyte.dev`