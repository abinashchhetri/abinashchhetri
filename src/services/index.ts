// ─────────────────────────────────────────────────────────────────────────────
// API Client
// ─────────────────────────────────────────────────────────────────────────────
// Single Axios instance shared across all service files. There is no auth on
// this site (no login, no session). Currently only the GitHub service uses it,
// hitting this app's own cached /api/github route rather than GitHub directly.
// (The contact form sends via EmailJS from the browser — see contact.service.)
// ─────────────────────────────────────────────────────────────────────────────

import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
});

export default apiClient;
