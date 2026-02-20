import { Link } from 'react-router-dom'
import { Clock, Users, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useState } from 'react'

const categories = [
  { value: 'todos', label: 'Todos' },
  { value: 'costura', label: 'Costura' },
  { value: 'patronaje', label: 'Patronaje' },
  { value: 'bordado', label: 'Bordado' },
  { value: 'confeccion', label: 'Confeccion' },
  { value: 'diseno', label: 'Diseno' },
  { value: 'tapiceria', label: 'Tapiceria' },
]

export default function CoursesPage() {
  const { courses } = useApp()
  const [filter, setFilter] = useState('todos')

  const filtered = filter === 'todos' ? courses : courses.filter((c) => c.category === filter)

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
      <div className="mb-8">
        <h1 className="mb-1.5 text-2xl font-bold tracking-tight text-[#1d1d1f] md:text-3xl">Nuestros Cursos</h1>
        <p className="text-[15px] text-[#86868b]">
          Explora nuestra oferta academica y encuentra el programa ideal para ti.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200 active:scale-95 ${
              filter === cat.value
                ? 'bg-[#1d1d1f] text-white'
                : 'bg-white text-[#86868b] ring-1 ring-[#d2d2d7]/60 hover:ring-[#86868b] hover:text-[#1d1d1f]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course) => {
          const spotsLeft = course.capacity - course.enrolled
          return (
            <Link
              key={course.id}
              to={`/cursos/${course.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#d2d2d7]/40 bg-white transition-all duration-300 hover:shadow-lg"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2.5 inline-flex items-center gap-3">
                  <span className="rounded-full bg-[#1e3a5f]/5 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#1e3a5f]">
                    {course.category}
                  </span>
                </div>

                <h3 className="mb-1.5 text-[15px] font-semibold leading-snug text-[#1d1d1f] transition-colors group-hover:text-[#1e3a5f]">
                  {course.title}
                </h3>
                <p className="mb-4 line-clamp-2 text-[13px] leading-relaxed text-[#86868b]">
                  {course.description}
                </p>

                <div className="mb-4 flex items-center gap-4 text-[12px] text-[#86868b]">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> {spotsLeft} cupos
                  </span>
                </div>

                <div className="mt-auto flex items-end justify-between border-t border-[#d2d2d7]/30 pt-3.5">
                  <div>
                    <span className="text-lg font-bold text-[#1d1d1f]">
                      ${course.price.toLocaleString()}
                    </span>
                    <span className="block text-[11px] text-[#86868b]">
                      Desde ${course.downPaymentMin.toLocaleString()} inicial
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-[13px] font-medium text-[#1e3a5f] transition-colors group-hover:text-[#0f1f33]">
                    Ver mas <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-[15px] text-[#86868b]">No hay cursos disponibles en esta categoria.</p>
        </div>
      )}
    </div>
  )
}
