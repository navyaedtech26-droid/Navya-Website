/**
 * A bot trap: an off-screen text input hidden from humans (and from the
 * accessibility tree / tab order) but happily filled in by naive form bots.
 * Pair it with `useSpamGuard` — a non-empty value flags an automated submit.
 */
export function Honeypot({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div
      aria-hidden
      className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
    >
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
