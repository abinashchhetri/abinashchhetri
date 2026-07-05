// ─────────────────────────────────────────────────────────────────────────────
// LinkedinIcon
// ─────────────────────────────────────────────────────────────────────────────
// See GithubIcon.tsx — same reasoning, lucide-react no longer ships this
// brand mark by default.
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  size?: number;
  className?: string;
}

const LinkedinIcon = ({ size = 18, className }: Props) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default LinkedinIcon;
