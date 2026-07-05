// ─────────────────────────────────────────────────────────────────────────────
// Contact Service
// ─────────────────────────────────────────────────────────────────────────────
// Sends the contact form via EmailJS directly from the browser. EmailJS is
// built for client-side use — its "public key" is not a secret (it's meant to
// ship to the browser; abuse is guarded by EmailJS domain allow-listing), so
// the three IDs live in NEXT_PUBLIC_ env vars. No server route is involved.
// Template params mirror the EmailJS template fields: from_name / to_name /
// from_email / to_email / message.
// ─────────────────────────────────────────────────────────────────────────────

import emailjs from "@emailjs/browser";

import { CONTACT_RECIPIENT_EMAIL, SITE } from "@/lib/constants/site.constants";
import type { TContactFormValues } from "@/lib/validations/contact-form.validation";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export const submitContactForm = async (body: TContactFormValues): Promise<void> => {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error(
      "EmailJS is not configured — set NEXT_PUBLIC_EMAILJS_SERVICE_ID / _TEMPLATE_ID / _PUBLIC_KEY.",
    );
  }

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: body.name,
      to_name: SITE.shortName,
      from_email: body.email,
      to_email: CONTACT_RECIPIENT_EMAIL,
      message: body.message,
    },
    { publicKey: PUBLIC_KEY },
  );
};
