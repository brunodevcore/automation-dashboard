function TransactionTable({ transactions, onDelete }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  return (
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
            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 bg-white">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-4 py-3 text-sm text-slate-700">
                  {transaction.concept}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-slate-900">
                  $ {formatCurrency(transaction.amount)}
                </td>
                <td className="px-4 py-3 text-sm text-slate-700">
                  {transaction.type}
                </td>
                <td className="px-4 py-3 text-sm">
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="rounded-lg bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="px-4 py-8 text-center text-sm text-slate-500"
              >
                No transactions found for the current filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable