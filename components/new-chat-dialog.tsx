"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { useCreateNewChat } from "@/hooks/use-create-new-chat";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useChatContext } from "stream-chat-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SearchUser from "./search-user";

const NewChatDialog = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<Doc<"users">[]>([]);
  const [groupName, setGroupName] = useState("");

  const createNewChat = useCreateNewChat();
  const { user } = useUser();
  const { setActiveChannel } = useChatContext();

  const handleSelectUser = (user: Doc<"users">) => {
    //to not adding the same user twice
    if (!selectedUsers.find((u) => u._id === user._id)) {
      setSelectedUsers((prev) => [...prev, user]);
    }
  };

  // to remove it if selected
  const removeUser = (userId: string) => {
    setSelectedUsers((prev) => prev.filter((user) => user._id !== userId));
  };

  const handleOpenChange = (newopEN: boolean) => {
    setOpen(newopEN);
    if (!newopEN) {
      setSelectedUsers([]); //reset
      setGroupName("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Start a New Chat</DialogTitle>
          <DialogDescription className="text-center">
            Search for users to start a conversation with
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <SearchUser onSelectUser={handleSelectUser} className="w-full" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewChatDialog;
