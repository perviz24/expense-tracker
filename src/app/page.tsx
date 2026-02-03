import { AddExpenseDialog } from "@/components/add-expense-dialog";
import { ExpensesList } from "@/components/expenses-list";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold tracking-tight">Expense Tracker</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Add Expense Section */}
          <section className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Your Expenses</h2>
              <p className="text-sm text-muted-foreground">
                Track and manage your spending
              </p>
            </div>
            <AddExpenseDialog />
          </section>

          {/* Expenses List Section */}
          <section>
            <ExpensesList />
          </section>

          {/* Category Summary Section */}
          <section>
            <p className="text-muted-foreground">Category summary will go here</p>
          </section>
        </div>
      </main>
    </div>
  );
}
