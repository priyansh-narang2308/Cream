import { createToken } from "@/actions/createToken";
import { useUser } from "@clerk/nextjs";
import {
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  StreamTheme,
  useCall,
  useCallStateHooks,
  type User,
  Call,
} from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

if (!process.env.NEXT_PUBLIC_STREAM_API_KEY) {
  throw new Error("NEXT_PUBLIC_STREAM_API_KEY not set");
}

const VideoCallLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const { id } = useParams();
  const [call, setCall] = useState<Call | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [client, setClient] = useState<StreamVideoClient | null>(null);

  // now for usememo
  const streamUser = useMemo(() => {
    if (!user?.id) return null;

    return {
      id: user.id,
      name:
        user.fullName || user.emailAddresses[0]?.emailAddress || "Unknown User",
      image: user.imageUrl || "",
      type: "authenticated" as const,
    };
  }, [user]);

  // Create a token for stream
  const tokenProvider = useCallback(async () => {
    if (!user?.id) {
      throw new Error("User not authenticated");
    }

    return await createToken(user.id);
  }, [user]);

  // Initialize client in useEffect to avoid side effects during render
  useEffect(() => {
    if (!streamUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setClient(null);
      return;
    }

    const newClient = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY as string,
      user: streamUser,
      tokenProvider,
    });

    setClient(newClient);

    return () => {
      newClient.disconnectUser().catch(console.error);
    };
  }, [streamUser, tokenProvider]);

  useEffect(() => {
    if (!id || !client) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setError(null);

    // This is to create a new id!!
    const streamCall = client.call("default", id as string);

    const joinCall = async () => {
      try {
        await streamCall.join({ create: true });
        setCall(streamCall);
      } catch (error) {
        console.error("Failed to join call:", error);
        toast.error("Failed to join call. Please try again later.");
        setError(
          error instanceof Error ? error.message : "Failed to join call"
        );
      }
    };

    joinCall();

    // cleanup function
    return () => {
      if (streamCall && streamCall.state.callingState === CallingState.JOINED) {
        streamCall.leave().catch(console.error);
      }
    };
  }, [id, client]);

  if (!client) {
    return <div>Loading ...client</div>;
  }

  if (!call) {
    return <div>Loading ...call</div>;
  }

  return (
    <StreamVideo client={client}>
      <StreamTheme className="text-white">
        <StreamCall call={call}>{children}</StreamCall>
      </StreamTheme>
    </StreamVideo>
  );
};

export default VideoCallLayout;
