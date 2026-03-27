import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginRequest } from '../api/auth'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
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
      const data = await loginRequest(formData)
      login(data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-slate-200 bg-white md:grid-cols-2">
        <div className="flex flex-col justify-between bg-slate-900 p-8 text-white md:p-10">
          <div>
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-slate-900">
              IF
            </div>

            <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-300">
              InvoiceFlow
            </p>

            <h1 className="mt-4 max-w-sm text-4xl font-semibold leading-tight">
              Minimal invoicing for focused work.
            </h1>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
              A clean workspace to manage clients, invoices and business flow
              without noise.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-300">
              Built to feel calm, direct and useful from the first screen.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center p-8 md:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm font-medium text-slate-500">Welcome back</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">
                Log in
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Access your workspace and continue where you left off.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                Log in
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-500">
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-slate-900 hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage