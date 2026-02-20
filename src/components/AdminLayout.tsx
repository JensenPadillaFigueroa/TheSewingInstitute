import { Link, Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  LayoutDashboard,
  BookOpen,
  Users,
  DollarSign,
  ArrowLeft,
  Scissors,
  Menu,
  X,
} from 'lucide-react'

export default function AdminLayout() {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => { setSidebarOpen(false) }, [location.pathname])

  const sidebarLinks = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { to: '/admin/cursos', label: 'Cursos', icon: BookOpen, exact: false },
    { to: '/admin/inscripciones', label: 'Inscripciones', icon: Users, exact: false },
    { to: '/admin/pagos', label: 'Pagos', icon: DollarSign, exact: false },
  ]

  const isActive = (path: string, exact: boolean) =>
    exact ? location.pathname === path : location.pathname.startsWith(path)

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-2">
          <Scissors className="h-4 w-4 text-amber-400" />
          <span className="text-[14px] font-semibold text-white">TSI Admin</span>
        </div>
        <button onClick={() => setSidebarOpen(false)} className="text-white/50 md:hidden">
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-0.5 p-3">
        {sidebarLinks.map((link) => {
          const Icon = link.icon
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors ${
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
    </>
  )

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      {/* Desktop sidebar */}
      <aside className="hidden w-56 flex-col border-r border-[#d2d2d7]/20 bg-[#0f1f33] md:flex">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="relative flex w-64 flex-col bg-[#0f1f33] shadow-xl">
            {sidebarContent}
          </aside>
        </div>
      )}

      <div className="flex flex-1 flex-col overflow-auto">
        <header className="flex items-center gap-3 border-b border-[#d2d2d7]/30 bg-white px-4 py-3 md:px-6 md:py-3.5">
          <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-1.5 text-[#86868b] transition-colors hover:bg-[#f5f5f7] md:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-[14px] font-semibold text-[#1d1d1f]">Panel Administrativo</h1>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
