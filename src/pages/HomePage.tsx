import { Link } from 'react-router-dom'
import {
  Scissors,
  GraduationCap,
  Users,
  BookOpen,
  Award,
  ArrowRight,
  Shield,
  Target,
} from 'lucide-react'
import { schoolInfo } from '../data/mockData'
import { useApp } from '../context/AppContext'

export default function HomePage() {
  const { courses } = useApp()

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0f1f33] to-[#1e3a5f]">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 md:pb-28 md:pt-24">
          <div className="animate-fade-up max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-medium text-amber-300 backdrop-blur-sm">
              <Scissors className="h-3.5 w-3.5" />
              Instituto de Costura
            </div>
            <h1 className="mb-4 text-[clamp(1.6rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-white sm:mb-5">
              {schoolInfo.slogan}
            </h1>
            <p className="mb-6 max-w-xl text-[14px] leading-relaxed text-white/60 sm:mb-8 sm:text-[15px]">
              {schoolInfo.description}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/cursos"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-[#1d1d1f] transition-all duration-200 hover:bg-white/90 active:scale-[0.97]"
              >
                Ver Cursos
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-[14px] font-medium text-white/80 transition-all duration-200 hover:border-white/40 hover:text-white"
              >
                Conocer mas
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[#d2d2d7]/30 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:gap-8">
            {[
              { icon: Users, value: schoolInfo.stats.students.toLocaleString() + '+', label: 'Estudiantes Graduados' },
              { icon: BookOpen, value: schoolInfo.stats.courses.toString(), label: 'Programas Activos' },
              { icon: GraduationCap, value: schoolInfo.stats.instructors.toString(), label: 'Instructores Certificados' },
              { icon: Award, value: schoolInfo.stats.yearsExperience + ' anos', label: 'De Experiencia' },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="mx-auto mb-1.5 h-5 w-5 text-[#86868b]" />
                  <div className="text-xl font-bold tracking-tight text-[#1d1d1f] sm:text-2xl">{stat.value}</div>
                  <div className="mt-0.5 text-[11px] text-[#86868b] sm:text-[13px]">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-[#1d1d1f] md:text-3xl">Sobre Nosotros</h2>
            <p className="mx-auto max-w-lg text-[15px] text-[#86868b]">
              Fundada en {schoolInfo.founded}, somos una institucion comprometida con la
              excelencia en la formacion textil.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-[#d2d2d7]/40 bg-white p-5 sm:p-7 transition-shadow duration-300 hover:shadow-md">
              <div className="mb-3 flex items-center gap-3 sm:mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1e3a5f]/5">
                  <Target className="h-4.5 w-4.5 text-[#1e3a5f]" />
                </div>
                <h3 className="text-[16px] font-semibold text-[#1d1d1f] sm:text-[17px]">Mision</h3>
              </div>
              <p className="text-[13px] leading-relaxed text-[#86868b] sm:text-[14px]">{schoolInfo.mission}</p>
            </div>

            <div className="rounded-2xl border border-[#d2d2d7]/40 bg-white p-5 sm:p-7 transition-shadow duration-300 hover:shadow-md">
              <div className="mb-3 flex items-center gap-3 sm:mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/5">
                  <Shield className="h-4.5 w-4.5 text-amber-600" />
                </div>
                <h3 className="text-[16px] font-semibold text-[#1d1d1f] sm:text-[17px]">Vision</h3>
              </div>
              <p className="text-[13px] leading-relaxed text-[#86868b] sm:text-[14px]">{schoolInfo.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="bg-[#f5f5f7] py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-[#1d1d1f] md:text-3xl">Cursos Destacados</h2>
            <p className="mx-auto max-w-lg text-[15px] text-[#86868b]">
              Explora nuestros programas mas populares y comienza tu carrera en el mundo textil.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 3).map((course) => (
              <Link
                key={course.id}
                to={`/cursos/${course.id}`}
                className="group overflow-hidden rounded-2xl border border-[#d2d2d7]/40 bg-white transition-all duration-300 hover:shadow-lg"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="mb-2.5 inline-block rounded-full bg-[#1e3a5f]/5 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#1e3a5f]">
                    {course.category}
                  </div>
                  <h3 className="mb-1.5 text-[15px] font-semibold leading-snug text-[#1d1d1f] transition-colors group-hover:text-[#1e3a5f]">
                    {course.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-[13px] leading-relaxed text-[#86868b]">
                    {course.description}
                  </p>
                  <div className="flex items-end justify-between border-t border-[#d2d2d7]/30 pt-3.5">
                    <div>
                      <span className="text-lg font-bold text-[#1d1d1f]">${course.price.toLocaleString()}</span>
                    </div>
                    <span className="text-[13px] text-[#86868b]">{course.duration}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/cursos"
              className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-[#1e3a5f] transition-colors hover:text-[#0f1f33]"
            >
              Ver todos los cursos
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f1f33] to-[#1e3a5f] px-6 py-10 text-center sm:rounded-3xl sm:px-8 sm:py-14 md:px-16">
            <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">Lista para crear?</h2>
            <p className="mx-auto mb-8 max-w-md text-[15px] text-white/50">
              Inscribete hoy y da el primer paso hacia tu carrera en el mundo de la costura.
              Opciones de financiamiento disponibles.
            </p>
            <Link
              to="/cursos"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-[#1d1d1f] transition-all duration-200 hover:bg-white/90 active:scale-[0.97]"
            >
              Explorar Cursos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
