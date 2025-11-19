"use client";

import { Chat } from "stream-chat-react";
import UserSyncWrapper from "@/components/user-sync-wrapper";
import streamClient from "@/lib/stream";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserSyncWrapper>
      <Chat client={streamClient} />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Link href={"/dashboard"}>
              <h1 className="text-lg font-bold tracking-wider uppercase">
                Beam
              </h1>
            </Link>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="bg-muted/50 aspect-video rounded-xl" />
              <div className="bg-muted/50 aspect-video rounded-xl" />
              <div className="bg-muted/50 aspect-video rounded-xl" />
            </div>
            <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </UserSyncWrapper>
  );
};

export default MainLayout;
