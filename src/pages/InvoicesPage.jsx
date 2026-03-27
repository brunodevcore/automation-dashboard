import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import { getClientsRequest } from '../api/clients'
import {
  createInvoiceRequest,
  getInvoicesRequest,
  payInvoiceRequest,
} from '../api/invoices'

function InvoicesPage() {
  const [clients, setClients] = useState([])
  const [invoices, setInvoices] = useState([])
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [payingId, setPayingId] = useState(null)

  const [formData, setFormData] = useState({
    clientId: '',
    amount: '',
  })

  useEffect(() => {
    if (!successMessage) return

    const timer = setTimeout(() => {
      setSuccessMessage('')
    }, 2500)

    return () => clearTimeout(timer)
  }, [successMessage])

  const loadData = async () => {
    try {
      setError('')
      const [clientsData, invoicesData] = await Promise.all([
        getClientsRequest(),
        getInvoicesRequest(),
      ])

      setClients(clientsData)
      setInvoices(invoicesData)
    } catch (err) {
      setError(err.response?.data?.error || 'Error loading invoices')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    setSuccessMessage('')

    if (!formData.clientId || !formData.amount) {
      setFormError('Client and amount are required')
      return
    }

    try {
      setSubmitting(true)

      await createInvoiceRequest({
        clientId: formData.clientId,
        amount: Number(formData.amount),
      })

      setFormData({
        clientId: '',
        amount: '',
      })

      const invoicesData = await getInvoicesRequest()
      setInvoices(invoicesData)
      setSuccessMessage('Invoice created successfully')
    } catch (err) {
      setFormError(err.response?.data?.error || 'Error creating invoice')
    } finally {
      setSubmitting(false)
    }
  }

  const handlePayInvoice = async (invoiceId) => {
    setError('')
    setSuccessMessage('')

    try {
      setPayingId(invoiceId)
      await payInvoiceRequest(invoiceId)

      setInvoices((prev) =>
        prev.map((invoice) =>
          invoice._id === invoiceId
            ? { ...invoice, status: 'paid' }
            : invoice,
        ),
      )

      setSuccessMessage('Invoice marked as paid')
    } catch (err) {
      setError(err.response?.data?.error || 'Error updating invoice')
    } finally {
      setPayingId(null)
    }
  }

  const totalInvoices = invoices.length
  const pendingInvoices = invoices.filter((invoice) => invoice.status === 'pending').length
  const paidInvoices = invoices.filter((invoice) => invoice.status === 'paid').length

  const totalAmount = useMemo(() => {
    return invoices.reduce((acc, invoice) => acc + Number(invoice.amount || 0), 0)
  }, [invoices])

  return (
    <div className="min-h-screen px-4 py-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Navbar />

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
              Billing
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
              Invoices with less friction.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Create invoices quickly, follow status changes and keep payment visibility
              where it belongs.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600">
            Clean billing, clearer decisions.
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6">
            <p className="text-sm text-slate-500">Total invoices</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
              {totalInvoices}
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6">
            <p className="text-sm text-slate-500">Pending</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-amber-600">
              {pendingInvoices}
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6">
            <p className="text-sm text-slate-500">Paid</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-emerald-600">
              {paidInvoices}
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6">
            <p className="text-sm text-slate-500">Total amount</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
              ${totalAmount}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6">
            <div className="mb-6">
              <p className="text-sm font-medium text-slate-500">New invoice</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                Create invoice
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Client
                </label>
                <select
                  name="clientId"
                  value={formData.clientId}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400"
                >
                  <option value="">Select a client</option>
                  {clients.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.name} - {client.email}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none placeholder:text-slate-400 focus:border-slate-400"
                  placeholder="500"
                />
              </div>

              {formError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {formError}
                </div>
              )}

              {successMessage && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {successMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white hover:-translate-y-[1px] hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {submitting ? 'Creating...' : 'Create invoice'}
              </button>
            </form>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Billing history</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                  Invoices
                </h2>
              </div>

              <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500">
                {invoices.length} records
              </div>
            </div>

            {error && (
              <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {loading ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-sm text-slate-500">
                Loading invoices...
              </div>
            ) : invoices.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50 px-6 py-10">
                <p className="text-lg font-medium text-slate-900">No invoices yet</p>
                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Create your first invoice to start tracking payment activity.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {invoices.map((invoice) => (
                  <div
                    key={invoice._id}
                    className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-base font-medium text-slate-900">
                          {invoice.clientName}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {invoice.clientEmail}
                        </p>
                        <p className="mt-3 text-sm text-slate-700">
                          Amount: <span className="font-medium">${invoice.amount}</span>
                        </p>
                        <p className="mt-1 text-sm">
                          Status:{' '}
                          <span
                            className={
                              invoice.status === 'paid'
                                ? 'font-medium text-emerald-600'
                                : 'font-medium text-amber-600'
                            }
                          >
                            {invoice.status}
                          </span>
                        </p>
                      </div>

                      {invoice.status === 'pending' && (
                        <button
                          onClick={() => handlePayInvoice(invoice._id)}
                          disabled={payingId === invoice._id}
                          className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {payingId === invoice._id ? 'Updating...' : 'Mark as paid'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoicesPage