import { Link, Outlet, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  Users,
  DollarSign,
  ArrowLeft,
  Plane,
} from 'lucide-react'

export default function AdminLayout() {
  const location = useLocation()

  const sidebarLinks = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { to: '/admin/cursos', label: 'Cursos', icon: BookOpen, exact: false },
    { to: '/admin/inscripciones', label: 'Inscripciones', icon: Users, exact: false },
    { to: '/admin/pagos', label: 'Pagos', icon: DollarSign, exact: false },
  ]

  const isActive = (path: string, exact: boolean) =>
    exact ? location.pathname === path : location.pathname.startsWith(path)

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      <aside className="flex w-56 flex-col border-r border-[#d2d2d7]/20 bg-[#0f1f33]">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
          <Plane className="h-4 w-4 text-amber-400" />
          <span className="text-[14px] font-semibold text-white">AV Admin</span>
        </div>

        <nav className="flex-1 space-y-0.5 p-3">
          {sidebarLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
                  isActive(link.to, link.exact)
                    ? 'bg-white/15 text-white'
                    : 'text-white/50 hover:bg-white/8 hover:text-white/80'
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-white/50 transition-colors hover:text-white/80"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al sitio
          </Link>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-auto">
        <header className="border-b border-[#d2d2d7]/30 bg-white px-6 py-3.5">
          <h1 className="text-[14px] font-semibold text-[#1d1d1f]">Panel Administrativo</h1>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
