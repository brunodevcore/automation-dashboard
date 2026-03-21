import { useEffect, useState } from 'react'
import TransactionTable from './components/TransactionTable'
import TransactionForm from './components/TransactionForm'
import SummaryCards from './components/SummaryCards'
import { initialTransactions } from './data/initialTransactions'
import { alertsData } from './data/alerts'
import { getTransactions, saveTransactions } from './services/transactionService'


function App() {
  const [transactions, setTransactions] = useState(() => {
    const stored = getTransactions()
    return stored.length ? stored : initialTransactions
  });

  const [formData, setFormData] = useState({
    concept: "",
    amount: "",
    type: "Ingreso",
  });

  const [filter, setFilter] = useState('Todos')
  const [searchTerm, setSearchTerm] = useState('')

  const alerts = alertsData;

  useEffect(() => {
    saveTransactions(transactions)
  }, [transactions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.concept.trim() || !formData.amount) return;

    const newTransaction = {
      id: Date.now(),
      concept: formData.concept,
      amount: Number(formData.amount),
      type: formData.type,
    };

    setTransactions([newTransaction, ...transactions]);

    setFormData({
      concept: "",
      amount: "",
      type: "Ingreso",
    });
  };
  const handleDelete = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id,
    );

    setTransactions(updatedTransactions);
  };

  const handleClearFilters = () => {
    setFilter('Todos')
    setSearchTerm('')
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US').format(value)
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter =
      filter === 'Todos' || transaction.type === filter

    const matchesSearch = transaction.concept
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "Ingreso")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "Gasto")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

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

        <SummaryCards
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          alertsCount={alerts.length}
          formatCurrency={formatCurrency}
        />

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
            <TransactionForm
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />

            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                Recent transactions
              </h3>

              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <input
                  type="text"
                  placeholder="Search by concept"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500"
                />

                <span className="text-sm text-slate-500">
                  {filteredTransactions.length} records
                </span>

                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500"
                >
                  <option value="Todos">Todos</option>
                  <option value="Ingreso">Ingreso</option>
                  <option value="Gasto">Gasto</option>
                </select>
                <button
                  onClick={handleClearFilters}
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Clear
                </button>
              </div>
            </div>

            <TransactionTable
              transactions={filteredTransactions}
              onDelete={handleDelete}
            />
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
  );
}

export default App;
