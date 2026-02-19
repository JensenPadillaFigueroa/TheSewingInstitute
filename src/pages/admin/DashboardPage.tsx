import { DollarSign, Users, BookOpen, TrendingUp } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function DashboardPage() {
  const { courses, enrollments } = useApp()

  const totalRevenue = enrollments.reduce((sum, e) => sum + e.paidAmount, 0)
  const totalPending = enrollments.reduce((sum, e) => sum + (e.totalAmount - e.paidAmount), 0)
  const activeEnrollments = enrollments.filter((e) => e.status === 'activa').length
  const pendingEnrollments = enrollments.filter((e) => e.status === 'pendiente').length
  const totalStudents = new Set(enrollments.map((e) => e.studentId)).size

  const recentEnrollments = [...enrollments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  const courseStats = courses.map((c) => ({
    ...c,
    enrollmentCount: enrollments.filter((e) => e.courseId === c.id).length,
    revenue: enrollments.filter((e) => e.courseId === c.id).reduce((sum, e) => sum + e.paidAmount, 0),
  }))

  const statusColor = (s: string) =>
    s === 'activa' ? 'bg-emerald-500/10 text-emerald-700' :
    s === 'pendiente' ? 'bg-amber-500/10 text-amber-700' :
    s === 'completada' ? 'bg-blue-500/10 text-blue-700' : 'bg-red-500/10 text-red-700'

  return (
    <div>
      <h2 className="mb-5 text-[18px] font-bold text-[#1d1d1f]">Dashboard</h2>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: DollarSign, label: 'Total cobrado', value: `$${totalRevenue.toLocaleString()}`, color: 'text-emerald-600 bg-emerald-500/10' },
          { icon: TrendingUp, label: 'Por cobrar', value: `$${totalPending.toLocaleString()}`, color: 'text-amber-600 bg-amber-500/10' },
          { icon: Users, label: 'Estudiantes', value: totalStudents.toString(), color: 'text-blue-600 bg-blue-500/10' },
          { icon: BookOpen, label: 'Inscripciones', value: `${activeEnrollments} activas / ${pendingEnrollments} pend.`, color: 'text-purple-600 bg-purple-500/10' },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="rounded-2xl border border-[#d2d2d7]/40 bg-white p-5">
              <div className={`mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg ${s.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="text-lg font-bold tracking-tight text-[#1d1d1f]">{s.value}</div>
              <div className="mt-0.5 text-[12px] text-[#86868b]">{s.label}</div>
            </div>
          )
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#d2d2d7]/40 bg-white p-5">
          <h3 className="mb-4 text-[15px] font-semibold text-[#1d1d1f]">Inscripciones Recientes</h3>
          <div className="space-y-2">
            {recentEnrollments.map((e) => (
              <div key={e.id} className="flex items-center justify-between rounded-xl bg-[#f5f5f7] px-4 py-3">
                <div>
                  <p className="text-[13px] font-medium text-[#1d1d1f]">{e.studentName}</p>
                  <p className="text-[11px] text-[#86868b]">{e.courseTitle}</p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-semibold text-[#1d1d1f]">${e.paidAmount.toLocaleString()}</p>
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColor(e.status)}`}>{e.status}</span>
                </div>
              </div>
            ))}
            {recentEnrollments.length === 0 && <p className="py-6 text-center text-[13px] text-[#86868b]">No hay inscripciones aun.</p>}
          </div>
        </div>

        <div className="rounded-2xl border border-[#d2d2d7]/40 bg-white p-5">
          <h3 className="mb-4 text-[15px] font-semibold text-[#1d1d1f]">Rendimiento por Curso</h3>
          <div className="space-y-3">
            {courseStats.sort((a, b) => b.revenue - a.revenue).slice(0, 5).map((c) => {
              const pct = Math.round((c.enrolled / c.capacity) * 100)
              return (
                <div key={c.id}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <p className="max-w-[60%] truncate text-[13px] font-medium text-[#1d1d1f]">{c.title}</p>
                    <p className="text-[13px] font-semibold text-[#1e3a5f]">${c.revenue.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="h-1.5 flex-1 rounded-full bg-[#f5f5f7]">
                      <div className="h-1.5 rounded-full bg-[#1e3a5f] transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-12 text-right text-[11px] text-[#86868b]">{c.enrolled}/{c.capacity}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
