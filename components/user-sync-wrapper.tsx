"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useCallback, useState } from "react";
import { LoadingSpinner } from "./loading-spinner";

const UserSyncWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //Get the user to sync it by mutation
  const createOrUpdateUser = useMutation(api.users.upsertUser);

  const syncUser = useCallback(async () => {
    if (!user?.id) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      await createOrUpdateUser({
        userId: user?.id,
        name:
          user?.fullName ||
          user?.firstName ||
          user?.emailAddresses[0].emailAddress ||
          "Unknown User",
        email: user?.emailAddresses[0].emailAddress || "",
        imageUrl: user?.imageUrl || "",
      });
    } catch (error) {
      console.log("Failed to sync user: ", error);
      setError(error instanceof Error ? error.message : "Failed to sync user");
    } finally {
      setIsLoading(false);
    }
  }, [createOrUpdateUser, user]);

  if (!isUserLoaded || isLoading) {
    return (
      <LoadingSpinner
        size="lg"
        message={!isUserLoaded ? "Loading..." : "Syncing user data..."}
        className="min-h-screen"
      />
    );
  }

  if (error) {
    return (
      <div className="flex-1 items-center justify-center bg-white px-6">
        <p className="text-red-500 text-lg font-semibold mb-2">Sync Error</p>
        <p className="text-gray-600 text-center mb-4">{error}</p>
        <p className="text-gray-500 text-sm text-center">
          Please try restarting the app or contact support if the issue
          persists.
        </p>
      </div>
    );
  }

  return <div>{children}</div>;
};

export default UserSyncWrapper;
