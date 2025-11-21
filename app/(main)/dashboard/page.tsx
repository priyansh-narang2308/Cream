"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import { LogOutIcon, MessageSquareText, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  useChatContext,
  Window,
} from "stream-chat-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const Dashboard = () => {
  const { user } = useUser();
  const router = useRouter();

  const { setOpen } = useSidebar();
  const { channel, setActiveChannel } = useChatContext();

  const handleCall = () => {
    console.log("Handle Calls");

    // 2:32:50
  };

  const handleLeaveChat = async () => {
    if (!channel || !user?.id) {
      toast.error("No active channel or user");
      return;
    }

    try {
      await channel.removeMembers([user.id]);
      setActiveChannel(undefined);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error leaving chat: ", error);
      toast.error("Error leaving chat! Please try again later.");
    }
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
                <Button
                  variant={"outline"}
                  onClick={handleCall}
                  className="cursor-pointer"
                >
                  <VideoIcon className="w-4 h-4" />
                  Video Call
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="cursor-pointer">
                      <LogOutIcon className="w-4 h-4" />
                      Leave Chat
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Leave this chat?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You will be removed from this conversation.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleLeaveChat}
                        className="bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                      >
                        Leave
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <MessageList />

            <div className="sticky bottom-0 w-full">
              <MessageInput />
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
