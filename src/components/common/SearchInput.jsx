import { useEffect, useRef } from "react";
import { useKey } from "../../hooks/useKey";

export default function SearchInput({ value, onChange }) {
  const inputEl = useRef(null);

  useKey("keydown", () => {
    inputEl.current.focus();
  });

  return (
    <input
      type="search"
      className="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      ref={inputEl}
    />
  );
}
