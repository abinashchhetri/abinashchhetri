// ─────────────────────────────────────────────────────────────────────────────
// TOAST_MESSAGES
// ─────────────────────────────────────────────────────────────────────────────
// Every user-facing toast string lives here — never written inline in a hook.
// ─────────────────────────────────────────────────────────────────────────────

export const TOAST_MESSAGES = {
  CONTACT: {
    SENT: "Message sent — I'll get back to you soon.",
    FAILED: "Couldn't send your message. Please try again or email me directly.",
  },
  GENERIC: {
    SOMETHING_WENT_WRONG: "Something went wrong. Please try again.",
  },
} as const;
