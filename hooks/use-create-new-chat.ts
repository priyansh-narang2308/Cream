import streamClient from "@/lib/stream";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

export const useCreateNewChat = () => {
  const createNewChat = async ({
    members,
    createdBy,
    groupName,
  }: {
    members: string[];
    createdBy: string;
    groupName?: string; //this can eb options
  }) => {
    const isGroupChat = members.length > 2;

    // checking for existing ˝chats
    if (!isGroupChat) {
      const existingChannle = await streamClient.queryChannels(
        {
          type: "messaging",
          members: { $eq: members }, //exact map for 1 on 1 chatting
        },
        {
          created_at: -1,
        },
        { limit: 1 }
      );

      if (existingChannle.length > 0) {
        const channel = existingChannle[0];
        const chanelMemebers = Object.keys(channel.state.members);

        // to make sure the same 2 members
        if (
          chanelMemebers.length === 2 &&
          members.length === 2 &&
          members.every((member) => chanelMemebers.includes(member))
        ) {
          toast.error("Exisiting 1-1 Chat found");
          console.log("Exisiting 1-1 Chat found");
          return channel;
        }
      }
    }

    const channelId = uuidv4();

    try {
      // make it for a 1-1 chat
      const channelData: {
        members: string[];
        created_by_id: string;
        name?: string;
      } = {
        members,
        created_by_id: createdBy,
      };
      if (isGroupChat) {
        channelData.name =
          groupName || `Group chat (${members.length} members)`;
      }

      const channel = streamClient.channel(
        isGroupChat ? "team" : "messaging",
        channelId,
        channelData
      );

      await channel.watch({
        presence: true,
      });

      return channel;
    } catch (error) {
      throw error;
    }
  };

  return createNewChat;
};
