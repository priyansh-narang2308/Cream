import { useState } from "react";
import { useQuery } from "convex/react";
import * as api from "../convex/_generated/api";
import { useDebounce } from "./use-debounce";
import { Doc } from "../convex/_generated/dataModel";


// see if i press the key while typing the server will hit api many times int hat case dbounce
export function useUserSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms debounce

  const searchResults = useQuery(
    api.api.users.searchUsers,
    debouncedSearchTerm.trim() ? { searchTerm: debouncedSearchTerm } : "skip"
  );

  return {
    searchTerm,
    setSearchTerm,
    searchResults: (searchResults || []) as Doc<"users">[],
    isLoading: searchResults === undefined && debouncedSearchTerm.trim() !== "",
  };
}
