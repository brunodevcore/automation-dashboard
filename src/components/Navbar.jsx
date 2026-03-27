import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { logout } = useAuth()
  const location = useLocation()

  const linkClasses = (path) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      location.pathname === path
        ? 'bg-slate-900 text-white'
        : 'text-slate-600 hover:bg-white hover:text-slate-900'
    }`

  return (
    <div className="mb-8 rounded-[28px] border border-slate-200/80 bg-white/90 p-3 backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
            IF
          </div>

          <div>
            <p className="text-sm font-semibold tracking-wide text-slate-900">
              InvoiceFlow
            </p>
            <p className="text-xs text-slate-500">
              Minimal invoicing for modern freelance work
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link to="/dashboard" className={linkClasses('/dashboard')}>
            Dashboard
          </Link>

          <Link to="/invoices" className={linkClasses('/invoices')}>
            Invoices
          </Link>

          <button
            onClick={logout}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar