import { useApp } from '../../context/AppContext'
import { Search } from 'lucide-react'
import { useState } from 'react'

export default function AdminEnrollmentsPage() {
  const { enrollments, updateEnrollmentStatus } = useApp()
  const [search, setSearch] = useState('')

  const filtered = enrollments.filter(
    (e) =>
      e.studentName.toLowerCase().includes(search.toLowerCase()) ||
      e.courseTitle.toLowerCase().includes(search.toLowerCase()) ||
      e.studentEmail.toLowerCase().includes(search.toLowerCase())
  )

  const statusColor = (s: string) =>
    s === 'activa' ? 'bg-emerald-500/10 text-emerald-700' :
    s === 'pendiente' ? 'bg-amber-500/10 text-amber-700' :
    s === 'completada' ? 'bg-blue-500/10 text-blue-700' : 'bg-red-500/10 text-red-700'

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[18px] font-bold text-[#1d1d1f]">Inscripciones</h2>
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

      <div className="overflow-hidden rounded-2xl border border-[#d2d2d7]/40 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#d2d2d7]/30">
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">Estudiante</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">Curso</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">Fecha</th>
                <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">Pagado</th>
                <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">Total</th>
                <th className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">Estado</th>
                <th className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">Accion</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id} className="border-b border-[#d2d2d7]/20 transition-colors hover:bg-[#f5f5f7]/50">
                  <td className="px-5 py-3">
                    <p className="font-medium text-[#1d1d1f]">{e.studentName}</p>
                    <p className="text-[11px] text-[#86868b]">{e.studentEmail}</p>
                  </td>
                  <td className="max-w-[180px] truncate px-5 py-3 text-[#86868b]">{e.courseTitle}</td>
                  <td className="px-5 py-3 text-[#86868b]">{e.date}</td>
                  <td className="px-5 py-3 text-right font-medium text-[#1d1d1f]">${e.paidAmount.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right text-[#86868b]">${e.totalAmount.toLocaleString()}</td>
                  <td className="px-5 py-3 text-center">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium ${statusColor(e.status)}`}>{e.status}</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <select
                      value={e.status}
                      onChange={(ev) => updateEnrollmentStatus(e.id, ev.target.value as any)}
                      className="cursor-pointer rounded-lg border border-[#d2d2d7]/60 px-2 py-1 text-[11px] outline-none focus:border-[#1e3a5f] focus:ring-1 focus:ring-[#1e3a5f]/10"
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="activa">Activa</option>
                      <option value="completada">Completada</option>
                      <option value="cancelada">Cancelada</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <p className="py-10 text-center text-[13px] text-[#86868b]">No se encontraron inscripciones.</p>}
      </div>
    </div>
  )
}
