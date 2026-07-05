// ─────────────────────────────────────────────────────────────────────────────
// Contact Types
// ─────────────────────────────────────────────────────────────────────────────
// Shapes for the contact form submission, mirrored by the Zod schema in
// lib/validations/contact-form.validation.ts (sent via EmailJS).
// ─────────────────────────────────────────────────────────────────────────────

export interface IContactFormValues {
  name: string;
  email: string;
  message: string;
}
