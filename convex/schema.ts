import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  })
    //  by comparing the database we can search it properly
    .index("by_userId", ["userId"])
    .index("by_email", ["email"]),
});
