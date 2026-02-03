import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  expenses: defineTable({
    amount: v.number(),
    category: v.string(),
    date: v.number(),
    description: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_created_at", ["createdAt"]),
});
