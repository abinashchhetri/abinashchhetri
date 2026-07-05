// ─────────────────────────────────────────────────────────────────────────────
// StatCard
// ─────────────────────────────────────────────────────────────────────────────
// The "card-stat" recipe — a massive 50px/700 numeral in accent-primary with
// a small caption underneath. Used for 140+/130+ hooks, 3 platforms, and
// First Class Honours — real figures from the CV, never invented.
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  value: string;
  label: string;
}

const StatCard = ({ value, label }: Props) => {
  return (
    <div className="rounded-md border border-hairline bg-surface-1 p-8 text-center">
      <p className="text-stat text-accent-primary">{value}</p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default StatCard;
