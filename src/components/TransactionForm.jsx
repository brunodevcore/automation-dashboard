function TransactionForm({ formData, onChange, onSubmit }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-slate-900">
        Add new transaction
      </h3>

      <form
        onSubmit={onSubmit}
        className="mt-4 grid gap-4 md:grid-cols-3"
      >
        <input
          type="text"
          name="concept"
          placeholder="Concept"
          value={formData.concept}
          onChange={onChange}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-slate-500"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={onChange}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-slate-500"
        />

        <select
          name="type"
          value={formData.type}
          onChange={onChange}
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
  )
}

export default TransactionForm