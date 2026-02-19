import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Clock,
  Users,
  User,
  Calendar,
  Check,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { courses } = useApp()
  const navigate = useNavigate()

  const course = courses.find((c) => c.id === id)

  if (!course) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="mb-3 text-xl font-bold text-[#1d1d1f]">Curso no encontrado</h2>
        <Link to="/cursos" className="text-[14px] font-medium text-[#1e3a5f]">Volver a cursos</Link>
      </div>
    )
  }

  const spotsLeft = course.capacity - course.enrolled
  const percentFull = Math.round((course.enrolled / course.capacity) * 100)

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
      <button
        onClick={() => navigate('/cursos')}
        className="group mb-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#86868b] transition-colors hover:text-[#1d1d1f]"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
        Volver a cursos
      </button>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div>
          <div className="mb-6 overflow-hidden rounded-2xl">
            <img
              src={course.image}
              alt={course.title}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>

          <div className="mb-3 inline-block rounded-full bg-[#1e3a5f]/5 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#1e3a5f]">
            {course.category}
          </div>
          <h1 className="mb-3 text-2xl font-bold tracking-tight text-[#1d1d1f] md:text-3xl">
            {course.title}
          </h1>
          <p className="mb-8 text-[15px] leading-relaxed text-[#86868b]">
            {course.longDescription}
          </p>

          <h2 className="mb-4 text-[17px] font-semibold text-[#1d1d1f]">Lo que incluye</h2>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {course.features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 rounded-xl border border-[#d2d2d7]/40 bg-white px-4 py-3"
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                  <Check className="h-3 w-3 text-emerald-600" />
                </div>
                <span className="text-[13px] text-[#1d1d1f]">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="sticky top-20 rounded-2xl border border-[#d2d2d7]/40 bg-white p-6">
            <div className="mb-5">
              <span className="text-2xl font-bold tracking-tight text-[#1d1d1f]">
                ${course.price.toLocaleString()}
              </span>
              <span className="mt-0.5 block text-[13px] text-[#86868b]">
                Desde ${course.downPaymentMin.toLocaleString()} de pago inicial
              </span>
            </div>

            <div className="mb-5 space-y-3.5">
              {[
                { icon: Clock, label: 'Duracion', value: course.duration },
                { icon: User, label: 'Instructor', value: course.instructor },
                { icon: Calendar, label: 'Horario', value: course.schedule },
                { icon: Users, label: 'Disponibilidad', value: `${spotsLeft} cupos` },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#86868b]" />
                    <div>
                      <div className="text-[11px] font-medium uppercase tracking-wider text-[#86868b]">{item.label}</div>
                      <div className="text-[13px] font-medium text-[#1d1d1f]">{item.value}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mb-5">
              <div className="mb-1.5 flex justify-between text-[11px] text-[#86868b]">
                <span>{course.enrolled} inscritos</span>
                <span>{course.capacity} capacidad</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[#f5f5f7]">
                <div
                  className="h-1.5 rounded-full bg-[#1e3a5f] transition-all duration-500"
                  style={{ width: `${percentFull}%` }}
                />
              </div>
            </div>

            <Link
              to={`/inscripcion/${course.id}`}
              className={`flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-[14px] font-semibold transition-all duration-200 ${
                spotsLeft > 0
                  ? 'bg-[#1e3a5f] text-white hover:bg-[#0f1f33] active:scale-[0.97]'
                  : 'pointer-events-none bg-[#f5f5f7] text-[#86868b]'
              }`}
            >
              {spotsLeft > 0 ? 'Inscribirse Ahora' : 'Sin Cupos'}
              {spotsLeft > 0 && <ArrowRight className="h-4 w-4" />}
            </Link>

            <p className="mt-3 text-center text-[12px] text-[#86868b]">
              Puedes realizar un pago inicial y completar despues.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
