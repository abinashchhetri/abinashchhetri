// ─────────────────────────────────────────────────────────────────────────────
// Contact Form Validation
// ─────────────────────────────────────────────────────────────────────────────
// Zod schema for the contact form — validates input in the browser (via React
// Hook Form) before the EmailJS send in contact.service.ts.
// ─────────────────────────────────────────────────────────────────────────────

import { z } from "zod";

export const MAX_CONTACT_MESSAGE_LENGTH = 2000;

export const ContactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100, "Name is too long"),
  email: z.email("Enter a valid email address"),
  message: z
    .string()
    .trim()
    .min(10, "Message is too short")
    .max(MAX_CONTACT_MESSAGE_LENGTH, "Message is too long"),
});

export type TContactFormValues = z.infer<typeof ContactFormSchema>;
