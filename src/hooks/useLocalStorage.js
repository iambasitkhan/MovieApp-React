import { useEffect, useState } from "react";

export function useLocalStorage(initialState, key) {
  const [value, setvalue] = useState(function () {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key, value]
  );

  return [value, setvalue];
}
