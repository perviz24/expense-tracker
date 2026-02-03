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
          <section>
            <p className="text-muted-foreground">Add expense form will go here</p>
          </section>

          {/* Expenses List Section */}
          <section>
            <p className="text-muted-foreground">Expenses list will go here</p>
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
