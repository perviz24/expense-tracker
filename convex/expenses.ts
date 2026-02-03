import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addExpense = mutation({
  args: {
    amount: v.number(),
    category: v.string(),
    date: v.number(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const expenseId = await ctx.db.insert("expenses", {
      amount: args.amount,
      category: args.category,
      date: args.date,
      description: args.description,
      createdAt: Date.now(),
    });
    return expenseId;
  },
});

export const getExpenses = query({
  handler: async (ctx) => {
    const expenses = await ctx.db
      .query("expenses")
      .order("desc")
      .collect();
    return expenses;
  },
});

export const deleteExpense = mutation({
  args: { id: v.id("expenses") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const getCategorySummary = query({
  handler: async (ctx) => {
    const expenses = await ctx.db.query("expenses").collect();

    const summary = expenses.reduce((acc, expense) => {
      const category = expense.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += expense.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(summary).map(([category, total]) => ({
      category,
      total,
    }));
  },
});
