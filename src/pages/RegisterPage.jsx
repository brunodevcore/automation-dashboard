import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerRequest } from '../api/auth'

function RegisterPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      await registerRequest(formData)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.error || 'Register failed')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-slate-200 bg-white md:grid-cols-2">
        <div className="flex items-center justify-center p-8 md:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm font-medium text-slate-500">New workspace</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">
                Create account
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Start managing clients and invoices in a calmer way.
              </p>
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
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400"
                  placeholder="Your name"
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
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white hover:-translate-y-[1px] hover:bg-slate-800"
              >
                Create account
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-500">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-slate-900 hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-slate-50 p-8 md:p-10">
          <div>
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
              IF
            </div>

            <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-500">
              InvoiceFlow
            </p>

            <h1 className="mt-4 max-w-sm text-4xl font-semibold leading-tight text-slate-900">
              Clean operations for small client work.
            </h1>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
              Designed to keep the essentials visible: clients, invoices and
              payment status.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-600">
              Minimal by choice, practical by design.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage