import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "./useDebounce";

export function useSearchParamDebounced(paramName: string) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get(paramName) ?? "";
  const [searchTerm, setSearchTerm] = useState(searchParam);
  const debouncedSearchTerm = useDebounce(searchTerm).trim();

  useEffect(() => {
    if (debouncedSearchTerm === searchParam) return;

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (debouncedSearchTerm) {
        next.set(paramName, debouncedSearchTerm);
      } else {
        next.delete(paramName);
      }

      next.set("page", "1");
      return next;
    });
  }, [debouncedSearchTerm, paramName, searchParam, setSearchParams]);

  return {
    searchTerm,
    setSearchTerm,
    searchParam,
    debouncedSearchTerm,
  };
}
