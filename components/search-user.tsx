import { Doc } from "@/convex/_generated/dataModel";
import { useUserSearch } from "@/hooks/use-user-search";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Search } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";

const SearchUser = ({
  onSelectUser,
  placeholder = "Search users by name or email...",
  className,
}: {
  onSelectUser: (user: Doc<"users">) => void;
  placeholder?: string;
  className?: string;
}) => {
  const { searchTerm, setSearchTerm, isLoading, searchResults } =
    useUserSearch();

  const { user } = useUser();

  // i am already the part of it dont show my name
  const filteredUser = searchResults.filter(
    (searchUser) => searchUser.userId !== user?.id
  );

  const handleSelectUser = (user: (typeof searchResults)[0]) => {
    onSelectUser?.(user);
    setSearchTerm("");
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return <div className={cn("w-full max-w-2xl mx-auto", className)}>
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
      <Input type="text" placeholder={placeholder}/>
    </div>
  </div>;
};

export default SearchUser;
