import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get the user Id from clerk
export const getUserByClerkId = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    if (!userId) {
      return null;
    }

    // Check if equal or not
    return await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();
  },
});

// If already user update it or insert it.
export const upsertUser = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, { userId, name, email, imageUrl }) => {
    const exisitinguser = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (exisitinguser) {
      await ctx.db.patch(exisitinguser._id, { name, imageUrl });
      return exisitinguser._id;
    }

    return await ctx.db.insert("users", { userId, name, email, imageUrl });
  },
});

// Search the user by his name and email
export const searchUsers = query({
  args: { searchTerm: v.string() },
  async handler(ctx, { searchTerm }) {
    if (!searchTerm.trim()) {
      return [];
    }

    const normalizedSearch = searchTerm.toLowerCase().trim();

    // Fetch all the users and then filter them
    const allUsers = await ctx.db.query("users").collect();

    return allUsers
      .filter(
        (user) =>
          user.name.toLowerCase().includes(normalizedSearch) ||
          user.email.toLowerCase().includes(normalizedSearch)
      )
      .slice(0, 20); //this is ot limit to 20 users olbnly
  },
});
