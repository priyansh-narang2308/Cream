"use server";

import { serverClient } from "@/lib/streamServer";

// This is a server action to be made
export async function createToken(userId: string) {
  const token = serverClient.createToken(userId);
  console.log("Creating token for user", userId);
  return token;
}
