import { useState } from 'react'

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, concept: 'Pago de cliente', amount: 850, type: 'Ingreso' },
    { id: 2, concept: 'Alquiler oficina', amount: 300, type: 'Gasto' },
    { id: 3, concept: 'Servicio internet', amount: 45, type: 'Gasto' },
  ])

  const [formData, setFormData] = useState({
    concept: '',
    amount: '',
    type: 'Ingreso',
  })

  const alerts = [
    'Factura de internet vence mañana',
    'Alquiler pendiente en 3 días',
    'Revisar gastos operativos semanales',
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.concept.trim() || !formData.amount) return

    const newTransaction = {
      id: Date.now(),
      concept: formData.concept,
      amount: Number(formData.amount),
      type: formData.type,
    }

    setTransactions([newTransaction, ...transactions])

    setFormData({
      concept: '',
      amount: '',
      type: 'Ingreso',
    })
  }

  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'Ingreso')
    .reduce((acc, transaction) => acc + transaction.amount, 0)

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'Gasto')
    .reduce((acc, transaction) => acc + transaction.amount, 0)

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Automation Dashboard
          </h1>
          <p className="mt-2 text-slate-600">
            Financial overview and smart alerts for small businesses
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Monthly income</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              $ {totalIncome}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Monthly expenses</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              $ {totalExpenses}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Active alerts</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              {alerts.length}
            </h2>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Add new transaction
              </h3>

              <form
                onSubmit={handleSubmit}
                className="mt-4 grid gap-4 md:grid-cols-3"
              >
                <input
                  type="text"
                  name="concept"
                  placeholder="Concept"
                  value={formData.concept}
                  onChange={handleChange}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-slate-500"
                />

                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-slate-500"
                />

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-slate-500"
                >
                  <option value="Ingreso">Ingreso</option>
                  <option value="Gasto">Gasto</option>
                </select>

                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 md:col-span-3"
                >
                  Add transaction
                </button>
              </form>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                Recent transactions
              </h3>
              <span className="text-sm text-slate-500">
                {transactions.length} records
              </span>
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
                        $ {transaction.amount}
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