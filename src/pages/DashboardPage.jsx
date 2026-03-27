import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import {
  createClientRequest,
  deleteClientRequest,
  getClientsRequest,
  updateClientRequest,
} from '../api/clients'
import { getInvoicesRequest } from '../api/invoices'

function DashboardPage() {
  const [clients, setClients] = useState([])
  const [invoices, setInvoices] = useState([])
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const [editingClientId, setEditingClientId] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  useEffect(() => {
    if (!successMessage) return

    const timer = setTimeout(() => {
      setSuccessMessage('')
    }, 2500)

    return () => clearTimeout(timer)
  }, [successMessage])

  const loadDashboardData = async () => {
    try {
      setError('')
      const [clientsData, invoicesData] = await Promise.all([
        getClientsRequest(),
        getInvoicesRequest(),
      ])

      setClients(clientsData)
      setInvoices(invoicesData)
    } catch (err) {
      setError(err.response?.data?.error || 'Error loading dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
    })
    setEditingClientId(null)
    setFormError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    setSuccessMessage('')

    if (!formData.name.trim() || !formData.email.trim()) {
      setFormError('Name and email are required')
      return
    }

    try {
      setSubmitting(true)

      if (editingClientId) {
        const updatedClient = await updateClientRequest(editingClientId, formData)

        setClients((prev) =>
          prev.map((client) =>
            client._id === editingClientId ? updatedClient : client,
          ),
        )

        setSuccessMessage('Client updated successfully')
      } else {
        const newClient = await createClientRequest(formData)

        setClients((prev) => [newClient, ...prev])
        setSuccessMessage('Client created successfully')
      }

      resetForm()
    } catch (err) {
      setFormError(err.response?.data?.error || 'Error saving client')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (client) => {
    setEditingClientId(client._id)
    setFormData({
      name: client.name,
      email: client.email,
    })
    setFormError('')
    setSuccessMessage('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (clientId) => {
    const client = clients.find((item) => item._id === clientId)
    const confirmed = window.confirm(
      `Delete ${client?.name || 'this client'}? This action cannot be undone.`,
    )

    if (!confirmed) return

    setFormError('')
    setSuccessMessage('')

    try {
      setDeletingId(clientId)
      await deleteClientRequest(clientId)

      setClients((prev) => prev.filter((client) => client._id !== clientId))

      if (editingClientId === clientId) {
        resetForm()
      }

      setSuccessMessage('Client deleted successfully')
    } catch (err) {
      setFormError(err.response?.data?.error || 'Error deleting client')
    } finally {
      setDeletingId(null)
    }
  }

  const totalClients = clients.length
  const totalInvoices = invoices.length
  const pendingInvoices = invoices.filter((invoice) => invoice.status === 'pending').length
  const paidInvoices = invoices.filter((invoice) => invoice.status === 'paid').length

  const totalBilledAmount = useMemo(() => {
    return invoices.reduce((acc, invoice) => acc + Number(invoice.amount || 0), 0)
  }, [invoices])

  return (
    <div className="min-h-screen px-4 py-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Navbar />

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
              Overview
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
              A clear view of your client work.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Track your client base, invoice activity and payment flow in one calm,
              focused workspace.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600">
            Simplicity with enough structure to stay productive.
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6">
            <p className="text-sm text-slate-500">Total clients</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
              {totalClients}
            </p>
          </div>

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
            <p className="text-sm text-slate-500">Total billed</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
              ${totalBilledAmount}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6">
            <div className="mb-6">
              <p className="text-sm font-medium text-slate-500">
                {editingClientId ? 'Editing mode' : 'New entry'}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                {editingClientId ? 'Edit client' : 'Create client'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none placeholder:text-slate-400 focus:border-slate-400"
                  placeholder="Client name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none placeholder:text-slate-400 focus:border-slate-400"
                  placeholder="client@email.com"
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

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white hover:-translate-y-[1px] hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {submitting
                    ? editingClientId
                      ? 'Updating...'
                      : 'Creating...'
                    : editingClientId
                      ? 'Update client'
                      : 'Create client'}
                </button>

                {editingClientId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Client base</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                  Clients
                </h2>
              </div>

              <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500">
                {clients.length} records
              </div>
            </div>

            {error && (
              <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {loading ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-sm text-slate-500">
                Loading dashboard...
              </div>
            ) : clients.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50 px-6 py-10">
                <p className="text-lg font-medium text-slate-900">No clients yet</p>
                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Start by creating your first client. Once you do, you’ll be able
                  to generate invoices and track payment status.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {clients.map((client) => (
                  <div
                    key={client._id}
                    className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-base font-medium text-slate-900">
                          {client.name}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">{client.email}</p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(client)}
                          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(client._id)}
                          disabled={deletingId === client._id}
                          className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {deletingId === client._id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
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

export default DashboardPage