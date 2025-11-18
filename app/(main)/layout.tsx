"use client";

import UserSyncWrapper from "@/components/user-sync-wrapper";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <UserSyncWrapper>{children}</UserSyncWrapper>;
};

export default MainLayout;
