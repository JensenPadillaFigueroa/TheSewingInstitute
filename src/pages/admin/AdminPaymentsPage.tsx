import { useApp } from '../../context/AppContext'
import { Search, DollarSign } from 'lucide-react'
import { useState } from 'react'
import { Payment } from '../../types'

export default function AdminPaymentsPage() {
  const { enrollments } = useApp()
  const [search, setSearch] = useState('')

  const allPayments: (Payment & { studentName: string; courseTitle: string })[] =
    enrollments.flatMap((e) => e.payments.map((p) => ({ ...p, studentName: e.studentName, courseTitle: e.courseTitle })))

  const sorted = [...allPayments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const filtered = sorted.filter((p) => p.studentName.toLowerCase().includes(search.toLowerCase()) || p.courseTitle.toLowerCase().includes(search.toLowerCase()))
  const totalCompleted = filtered.filter((p) => p.status === 'completado').reduce((s, p) => s + p.amount, 0)

  const methodLabel = (m: string) => m === 'tarjeta' ? 'Tarjeta' : m === 'transferencia' ? 'Transferencia' : m === 'efectivo' ? 'Efectivo' : m
  const typeLabel = (t: string) => t === 'inicial' ? 'Inicial' : t === 'cuota' ? 'Cuota' : t === 'completo' ? 'Completo' : t
  const statusColor = (s: string) => s === 'completado' ? 'bg-emerald-500/10 text-emerald-700' : s === 'pendiente' ? 'bg-amber-500/10 text-amber-700' : 'bg-red-500/10 text-red-700'

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[18px] font-bold text-[#1d1d1f]">Pagos</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#86868b]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            className="w-full rounded-lg border border-[#d2d2d7]/60 bg-white py-2 pl-9 pr-3 text-[13px] outline-none transition-colors focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/10"
          />
        </div>
      </div>

      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Total completado', value: `$${totalCompleted.toLocaleString()}`, color: 'text-emerald-600 bg-emerald-500/10' },
          { label: 'Transacciones', value: filtered.length.toString(), color: 'text-blue-600 bg-blue-500/10' },
          { label: 'Promedio', value: `$${filtered.length > 0 ? Math.round(totalCompleted / filtered.length).toLocaleString() : 0}`, color: 'text-amber-600 bg-amber-500/10' },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-3.5 rounded-2xl border border-[#d2d2d7]/40 bg-white p-4">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${s.color}`}>
              <DollarSign className="h-4 w-4" />
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight text-[#1d1d1f]">{s.value}</div>
              <div className="text-[11px] text-[#86868b]">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#d2d2d7]/40 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#d2d2d7]/30">
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">ID</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">Estudiante</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">Curso</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">Fecha</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">Tipo</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">Metodo</th>
                <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">Monto</th>
                <th className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-[#d2d2d7]/20 transition-colors hover:bg-[#f5f5f7]/50">
                  <td className="px-5 py-3 font-mono text-[11px] text-[#86868b]">{p.id}</td>
                  <td className="px-5 py-3 font-medium text-[#1d1d1f]">{p.studentName}</td>
                  <td className="max-w-[160px] truncate px-5 py-3 text-[#86868b]">{p.courseTitle}</td>
                  <td className="px-5 py-3 text-[#86868b]">{p.date}</td>
                  <td className="px-5 py-3 text-[#86868b]">{typeLabel(p.type)}</td>
                  <td className="px-5 py-3 text-[#86868b]">{methodLabel(p.method)}</td>
                  <td className="px-5 py-3 text-right font-semibold text-[#1d1d1f]">${p.amount.toLocaleString()}</td>
                  <td className="px-5 py-3 text-center">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium ${statusColor(p.status)}`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <p className="py-10 text-center text-[13px] text-[#86868b]">No se encontraron pagos.</p>}
      </div>
    </div>
  )
}
