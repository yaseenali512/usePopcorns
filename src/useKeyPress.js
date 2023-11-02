import { useEffect } from "react";
export function useKeyPress(Key, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === Key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, Key]
  );
}
