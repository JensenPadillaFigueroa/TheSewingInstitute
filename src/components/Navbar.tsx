import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import SewingIcon from './SewingIcon'
import { useState } from 'react'

export default function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { to: '/', label: 'Inicio' },
    { to: '/cursos', label: 'Cursos' },
    { to: '/admin', label: 'Admin' },
  ]

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0f1f33]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between sm:h-16">
          <Link to="/" className="group flex items-center gap-2.5">
            <SewingIcon className="h-6 w-6 shrink-0 text-amber-400" />
            <span className="text-[16px] font-bold tracking-tight text-white sm:text-[18px]">The Sewing Institute</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? 'bg-white/15 text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className="rounded-lg p-2 text-white/70 transition-colors hover:text-white md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="animate-fade-in border-t border-white/10 px-6 pb-4 pt-2 md:hidden">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors ${
                isActive(link.to) ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
