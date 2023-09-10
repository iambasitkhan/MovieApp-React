import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      function callBack(e) {
        if (e.code === "Enter") {
          console.log(7183172);
          action?.();
        }

        if (e.code === "Escape") {
          console.log("faksd");
          action?.();
        }
      }

      document.addEventListener(key, callBack);

      return () => document.removeEventListener(key, callBack);
    },
    [key, action]
  );
}
