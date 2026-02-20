import { Mail, Phone, MapPin } from 'lucide-react'
import SewingIcon from './SewingIcon'
import { schoolInfo } from '../data/mockData'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#d2d2d7]/30 bg-[#f5f5f7]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <SewingIcon className="text-lg" />
              <span className="text-sm font-semibold text-[#1d1d1f]">{schoolInfo.name}</span>
            </div>
            <p className="text-[13px] leading-relaxed text-[#86868b]">{schoolInfo.slogan}</p>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#1d1d1f]">Contacto</h3>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-[13px] text-[#86868b]">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#86868b]" />
                <span>{schoolInfo.address}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] text-[#86868b]">
                <Phone className="h-3.5 w-3.5 shrink-0 text-[#86868b]" />
                <span>{schoolInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] text-[#86868b]">
                <Mail className="h-3.5 w-3.5 shrink-0 text-[#86868b]" />
                <span>{schoolInfo.email}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#1d1d1f]">Certificaciones</h3>
            <ul className="space-y-2">
              {schoolInfo.certifications.map((cert) => (
                <li key={cert} className="text-[13px] text-[#86868b]">{cert}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#d2d2d7]/40 pt-6 text-center">
          <p className="text-[12px] text-[#86868b]">
            &copy; {new Date().getFullYear()} {schoolInfo.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
