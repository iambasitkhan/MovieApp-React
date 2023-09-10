export default function LabeledBadge({ emoji, children }) {
  return (
    <p>
      <span>{emoji}</span>
      {children}
    </p>
  );
}
