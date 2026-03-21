function SummaryCards({totalIncome,totalExpenses,alertsCount,formatCurrency}) {
  return (
    <section className="grid gap-6 md:grid-cols-3">
      <div className="rounded-2xl border-l-4 border-green-500 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-400">Monthly income</p>
        <h2 className="mt-2">
          <span className="text-3xl font-bold text-green-600">
            $ {formatCurrency(totalIncome)}
          </span>
        </h2>
      </div>

      <div className="rounded-2xl border-l-4 border-red-500 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-400">Monthly expenses</p>
        <h2 className="mt-2">
          <span className="text-3xl font-bold text-red-600">
            $ {formatCurrency(totalExpenses)}
          </span>
        </h2>
      </div>

      <div className="rounded-2xl border-l-4 border-amber-500 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-400">Active alerts</p>
        <h2 className="mt-2">
          <span className="text-3xl font-bold text-amber-600">
            {alertsCount}
          </span>
        </h2>
      </div>
    </section>
  )
}

export default SummaryCards