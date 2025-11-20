import { Doc } from "@/convex/_generated/dataModel";
import React from "react";

const SearchUser = ({
  onSelectUser,
  placeholder = "Search users by name or email...",
  className,
}: {
  onSelectUser: (user: Doc<"users">) => void;
  placeholder?: string;
  className?: string;
}) => {
  return <div>SearchUser</div>;
};

export default SearchUser;
