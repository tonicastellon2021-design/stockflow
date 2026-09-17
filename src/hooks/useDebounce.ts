import { useEffect, useState } from "react";

export function useDebounce<T>(inputValue: T): T {
  const [debounce, setDebounce] = useState(inputValue);

  useEffect(() => {
    const time = setTimeout(() => {
      setDebounce(inputValue);
    }, 500);

    return () => clearTimeout(time);
  }, [inputValue]);

  return debounce;
}
