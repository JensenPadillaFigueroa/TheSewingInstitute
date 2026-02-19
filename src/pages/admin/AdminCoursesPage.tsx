import { useApp } from '../../context/AppContext'
import { Users, Clock, DollarSign } from 'lucide-react'

export default function AdminCoursesPage() {
  const { courses, enrollments } = useApp()

  const courseData = courses.map((course) => {
    const ce = enrollments.filter((e) => e.courseId === course.id)
    return { ...course, revenue: ce.reduce((s, e) => s + e.paidAmount, 0), pending: ce.reduce((s, e) => s + (e.totalAmount - e.paidAmount), 0) }
  })

  return (
    <div>
      <h2 className="mb-5 text-[18px] font-bold text-[#1d1d1f]">Gestion de Cursos</h2>

      <div className="space-y-4">
        {courseData.map((course) => {
          const pct = Math.round((course.enrolled / course.capacity) * 100)
          return (
            <div key={course.id} className="rounded-2xl border border-[#d2d2d7]/40 bg-white p-5">
              <div className="flex flex-col gap-5 md:flex-row">
                <img src={course.image} alt={course.title} className="h-24 w-full rounded-xl object-cover md:w-36" />
                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <span className="rounded-full bg-[#1e3a5f]/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#1e3a5f]">{course.category}</span>
                      <h3 className="mt-1.5 text-[15px] font-semibold text-[#1d1d1f]">{course.title}</h3>
                    </div>
                    <span className="text-[17px] font-bold text-[#1d1d1f]">${course.price.toLocaleString()}</span>
                  </div>
                  <p className="mb-3.5 text-[13px] text-[#86868b]">{course.description}</p>

                  <div className="mb-3.5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="flex items-center gap-1.5 text-[12px] text-[#86868b]"><Clock className="h-3.5 w-3.5" />{course.duration}</div>
                    <div className="flex items-center gap-1.5 text-[12px] text-[#86868b]"><Users className="h-3.5 w-3.5" />{course.enrolled}/{course.capacity}</div>
                    <div className="flex items-center gap-1.5 text-[12px] font-medium text-emerald-600"><DollarSign className="h-3.5 w-3.5" />${course.revenue.toLocaleString()}</div>
                    <div className="flex items-center gap-1.5 text-[12px] font-medium text-amber-600"><DollarSign className="h-3.5 w-3.5" />${course.pending.toLocaleString()} pend.</div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="h-1.5 flex-1 rounded-full bg-[#f5f5f7]">
                      <div className={`h-1.5 rounded-full transition-all duration-500 ${pct >= 90 ? 'bg-red-500' : pct >= 70 ? 'bg-amber-500' : 'bg-[#1e3a5f]'}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-10 text-right text-[11px] text-[#86868b]">{pct}%</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
