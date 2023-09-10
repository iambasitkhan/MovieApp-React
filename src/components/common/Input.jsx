export default function Input({ type, className, value, onChange }) {
  return (
    <input
      type={type}
      className={className}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
