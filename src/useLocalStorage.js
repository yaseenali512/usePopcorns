import { useState, useEffect } from "react";
export function useLocalStorage(intitalState, key) {
  const [watched, setWatched] = useState(function () {
    const storedValue = JSON.parse(localStorage.getItem(key));

    //check whether there was something stored or not
    return storedValue ? storedValue : intitalState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(watched));
    },
    [watched, key]
  );

  return [watched, setWatched];
}
