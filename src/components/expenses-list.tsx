"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Id } from "../../convex/_generated/dataModel";
import { toast } from "sonner";

interface ExpensesListProps {
  selectedCategory: string;
}

export function ExpensesList({ selectedCategory }: ExpensesListProps) {
  const expenses = useQuery(api.expenses.getExpenses);
  const deleteExpense = useMutation(api.expenses.deleteExpense);

  const handleDelete = async (id: Id<"expenses">) => {
    try {
      await deleteExpense({ id });
      toast.success("Expense deleted");
    } catch (error) {
      toast.error("Failed to delete expense");
      console.error(error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(timestamp));
  };

  if (expenses === undefined) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 w-3/4 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Filter expenses by category
  const filteredExpenses =
    selectedCategory === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory);

  if (filteredExpenses.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-muted-foreground">
            {selectedCategory === "All"
              ? "No expenses yet. Click \"Add Expense\" to get started."
              : `No expenses in ${selectedCategory} category.`}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {filteredExpenses.map((expense) => (
        <Card key={expense._id}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl">
                  {formatCurrency(expense.amount)}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{expense.category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(expense.date)}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(expense._id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </CardHeader>
          {expense.description && (
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                {expense.description}
              </p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
