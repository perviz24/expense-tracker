"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function CategorySummary() {
  const summary = useQuery(api.expenses.getCategorySummary);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (summary === undefined) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 w-1/2 bg-muted rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (summary.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No spending data yet. Add some expenses to see your summary.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Sort by total descending
  const sortedSummary = [...summary].sort((a, b) => b.total - a.total);

  // Calculate grand total
  const grandTotal = summary.reduce((acc, item) => acc + item.total, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedSummary.map((item) => {
            const percentage = ((item.total / grandTotal) * 100).toFixed(1);
            return (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{item.category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {percentage}%
                    </span>
                  </div>
                  <span className="font-semibold">
                    {formatCurrency(item.total)}
                  </span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Total Spending</span>
              <span className="text-xl font-bold">
                {formatCurrency(grandTotal)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
