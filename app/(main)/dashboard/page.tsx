"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import { LogOutIcon, MessageSquareText, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Channel,
  ChannelHeader,
  MessageList,
  Thread,
  useChatContext,
  Window,
} from "stream-chat-react";

const Dashboard = () => {
  const { user } = useUser();
  const router = useRouter();

  const { setOpen } = useSidebar();
  const { channel, setActiveChannel } = useChatContext();

  const handleCall = () => {
    console.log("Handle Calls");
  };

  const handleLeaveChat = () => {
    console.log("Leaving chat...");
  };

  return (
    <div className="flex flex-col w-full flex-1">
      {channel ? (
        <Channel>
          <Window>
            <div className="flex items-center justify-between">
              {channel?.data?.member_count === 1 ? (
                <ChannelHeader title="Everyone else has left this chat!" />
              ) : (
                <ChannelHeader />
              )}

              <div className="flex items-center gap-2">
                <Button variant={"outline"} onClick={handleCall} className="cursor-pointer">
                  <VideoIcon className="w-4 h-4" />
                  Video Call
                </Button>

                <Button
                  onClick={handleLeaveChat}
                  variant={"destructive"}
                  className="text-red-500 hover:text-red-600 cursor-pointer hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <LogOutIcon className="w-4 h-4" />
                  Leave Chat
                </Button>
              </div>

              <MessageList />

              <div className="sticky bottom-0 w-full"></div>
            </div>
          </Window>
          <Thread />
        </Channel>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-background rounded-xl">
          <MessageSquareText className="w-16 h-16 text-primary mb-6 opacity-70" />

          <h2 className="text-3xl font-extrabold text-foreground mb-2">
            Welcome to Chat!
          </h2>

          <p className="text-muted-foreground max-w-sm mb-8">
            It looks like you don&apos;t have a conversation open yet. Start
            connecting from the sidebar or catch up on old chats.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
