function App() {
  const transactions = [
    { id: 1, concept: 'Pago de cliente', amount: '$ 850', type: 'Ingreso' },
    { id: 2, concept: 'Alquiler oficina', amount: '$ 300', type: 'Gasto' },
    { id: 3, concept: 'Servicio internet', amount: '$ 45', type: 'Gasto' },
  ]

  const alerts = [
    'Factura de internet vence mañana',
    'Alquiler pendiente en 3 días',
    'Revisar gastos operativos semanales',
  ]

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Automation Dashboard
            </h1>
            <p className="text-slate-600">
              Financial overview and smart alerts for small businesses
            </p>
          </div>

          <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800">
            New transaction
          </button>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Monthly income</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              $ 4,320
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Monthly expenses</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              $ 1,980
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Active alerts</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">3</h2>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                Recent transactions
              </h3>
              <span className="text-sm text-slate-500">Last 7 days</span>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                      Concept
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-4 py-3 text-sm text-slate-700">
                        {transaction.concept}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">
                        {transaction.amount}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-700">
                        {transaction.type}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">
              Alerts
            </h3>

            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"
                >
                  {alert}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App