import { useEffect, useRef } from "react";

export default function SearchInput({ value, onChange }) {
  const inputEl = useRef(null);

  useEffect(function () {
    function callBack(e) {
      if (e.code === "Enter") {
        inputEl.current.focus();
      }
    }

    document.addEventListener("keydown", callBack);

    return () => document.removeEventListener("keydown", callBack);
  }, []);

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
