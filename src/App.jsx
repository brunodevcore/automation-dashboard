function App() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Automation Dashboard
          </h1>
          <p className="mt-2 text-slate-600">
            Control financiero y alertas de negocio
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Ingresos del mes</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              $ 0
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Gastos del mes</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              $ 0
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Alertas activas</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              0
            </h2>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App