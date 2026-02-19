import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, CreditCard, CheckCircle2, Banknote, Building2 } from 'lucide-react'
import { useApp } from '../context/AppContext'

type PaymentMethod = 'tarjeta' | 'transferencia' | 'efectivo'
type PaymentType = 'inicial' | 'completo'

const inputClass = (hasError: boolean) =>
  `w-full rounded-xl border bg-white px-4 py-2.5 text-[14px] outline-none transition-all duration-200 placeholder:text-[#86868b]/60 ${
    hasError
      ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
      : 'border-[#d2d2d7]/60 focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/10'
  }`

export default function EnrollmentPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const { courses, addEnrollment } = useApp()
  const navigate = useNavigate()
  const course = courses.find((c) => c.id === courseId)

  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [document, setDocument] = useState('')
  const [paymentType, setPaymentType] = useState<PaymentType>('inicial')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('tarjeta')
  const [customAmount, setCustomAmount] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!course) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="mb-3 text-xl font-bold text-[#1d1d1f]">Curso no encontrado</h2>
        <Link to="/cursos" className="text-[14px] font-medium text-[#1e3a5f]">Volver a cursos</Link>
      </div>
    )
  }

  const paymentAmount = paymentType === 'completo' ? course.price : customAmount ? parseFloat(customAmount) : course.downPaymentMin

  const validateInfo = () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Requerido'
    if (!email.trim()) e.email = 'Requerido'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Email invalido'
    if (!phone.trim()) e.phone = 'Requerido'
    if (!document.trim()) e.document = 'Requerido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validatePayment = () => {
    const e: Record<string, string> = {}
    if (paymentType === 'inicial') {
      const amt = parseFloat(customAmount || String(course.downPaymentMin))
      if (isNaN(amt) || amt < course.downPaymentMin) e.amount = `Minimo $${course.downPaymentMin.toLocaleString()}`
      if (amt > course.price) e.amount = `Maximo $${course.price.toLocaleString()}`
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => { if (step === 'info' && validateInfo()) setStep('payment') }

  const handleSubmit = () => {
    if (!validatePayment()) return
    const finalAmount = paymentType === 'completo' ? course.price : parseFloat(customAmount || String(course.downPaymentMin))
    addEnrollment({
      studentId: `stu-${Date.now()}`, studentName: name, studentEmail: email,
      courseId: course.id, courseTitle: course.title,
      date: new Date().toISOString().split('T')[0],
      status: paymentType === 'completo' ? 'activa' : 'pendiente',
      totalAmount: course.price, paidAmount: finalAmount,
      payment: { amount: finalAmount, date: new Date().toISOString().split('T')[0], method: paymentMethod, type: paymentType === 'completo' ? 'completo' : 'inicial', status: 'completado' },
    })
    setStep('success')
  }

  if (step === 'success') {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center animate-fade-up">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle2 className="h-7 w-7 text-emerald-600" />
        </div>
        <h2 className="mb-2 text-xl font-bold text-[#1d1d1f]">Inscripcion Exitosa</h2>
        <p className="mb-1 text-[14px] text-[#86868b]">
          Te has inscrito en <span className="font-medium text-[#1d1d1f]">{course.title}</span>.
        </p>
        <p className="mb-8 text-[13px] text-[#86868b]">
          Pago: <span className="font-semibold text-[#1d1d1f]">${paymentAmount.toLocaleString()}</span>
          {paymentType === 'inicial' && <span> &middot; Saldo: ${(course.price - paymentAmount).toLocaleString()}</span>}
        </p>
        <div className="flex justify-center gap-3">
          <Link to="/cursos" className="rounded-full border border-[#d2d2d7]/60 px-5 py-2 text-[13px] font-medium text-[#1d1d1f] transition-colors hover:bg-[#f5f5f7]">
            Ver mas cursos
          </Link>
          <Link to="/" className="rounded-full bg-[#1e3a5f] px-5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#0f1f33]">
            Ir al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10 md:py-14">
      <button
        onClick={() => navigate(`/cursos/${course.id}`)}
        className="group mb-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#86868b] transition-colors hover:text-[#1d1d1f]"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
        Volver al curso
      </button>

      {/* Progress */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold ${step === 'info' ? 'bg-[#1e3a5f] text-white' : 'bg-emerald-500 text-white'}`}>
            {step === 'info' ? '1' : <CheckCircle2 className="h-4 w-4" />}
          </div>
          <span className="text-[13px] font-medium text-[#1d1d1f]">Datos</span>
        </div>
        <div className="h-px flex-1 bg-[#d2d2d7]/40" />
        <div className="flex items-center gap-2">
          <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold ${step === 'payment' ? 'bg-[#1e3a5f] text-white' : 'bg-[#f5f5f7] text-[#86868b]'}`}>2</div>
          <span className={`text-[13px] font-medium ${step === 'payment' ? 'text-[#1d1d1f]' : 'text-[#86868b]'}`}>Pago</span>
        </div>
      </div>

      {/* Course summary */}
      <div className="mb-6 flex items-center gap-4 rounded-2xl border border-[#d2d2d7]/40 bg-white p-4">
        <img src={course.image} alt={course.title} className="h-14 w-14 rounded-xl object-cover" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[14px] font-semibold text-[#1d1d1f]">{course.title}</h3>
          <p className="text-[12px] text-[#86868b]">{course.duration} &middot; {course.instructor}</p>
        </div>
        <span className="shrink-0 text-[17px] font-bold text-[#1d1d1f]">${course.price.toLocaleString()}</span>
      </div>

      {/* Step 1 */}
      {step === 'info' && (
        <div className="animate-fade-in rounded-2xl border border-[#d2d2d7]/40 bg-white p-6">
          <h2 className="mb-5 text-[17px] font-semibold text-[#1d1d1f]">Informacion Personal</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: 'Nombre completo', key: 'name', value: name, set: setName, ph: 'Juan Carlos Perez', type: 'text' },
              { label: 'Email', key: 'email', value: email, set: setEmail, ph: 'correo@ejemplo.com', type: 'email' },
              { label: 'Telefono', key: 'phone', value: phone, set: setPhone, ph: '+1 (555) 123-4567', type: 'tel' },
              { label: 'Documento', key: 'document', value: document, set: setDocument, ph: 'V-12345678', type: 'text' },
            ].map((f) => (
              <div key={f.key}>
                <label className="mb-1 block text-[12px] font-medium text-[#86868b]">{f.label}</label>
                <input type={f.type} value={f.value} onChange={(e) => f.set(e.target.value)} placeholder={f.ph} className={inputClass(!!errors[f.key])} />
                {errors[f.key] && <p className="mt-1 text-[11px] text-red-500">{errors[f.key]}</p>}
              </div>
            ))}
          </div>
          <button onClick={handleNext} className="mt-6 w-full rounded-full bg-[#1e3a5f] py-2.5 text-[14px] font-semibold text-white transition-all duration-200 hover:bg-[#0f1f33] active:scale-[0.98]">
            Continuar al pago
          </button>
        </div>
      )}

      {/* Step 2 */}
      {step === 'payment' && (
        <div className="animate-fade-in rounded-2xl border border-[#d2d2d7]/40 bg-white p-6">
          <h2 className="mb-5 text-[17px] font-semibold text-[#1d1d1f]">Pago</h2>

          <label className="mb-2 block text-[12px] font-medium text-[#86868b]">Tipo de pago</label>
          <div className="mb-5 grid gap-3 sm:grid-cols-2">
            {[
              { val: 'inicial' as const, title: 'Pago Inicial', desc: `Desde $${course.downPaymentMin.toLocaleString()}` },
              { val: 'completo' as const, title: 'Pago Completo', desc: `$${course.price.toLocaleString()} unico` },
            ].map((o) => (
              <button key={o.val} onClick={() => setPaymentType(o.val)}
                className={`rounded-xl border p-4 text-left transition-all duration-200 ${paymentType === o.val ? 'border-[#1e3a5f] bg-[#1e3a5f]/5 ring-1 ring-[#1e3a5f]/20' : 'border-[#d2d2d7]/60 hover:border-[#86868b]'}`}>
                <div className="text-[14px] font-semibold text-[#1d1d1f]">{o.title}</div>
                <div className="mt-0.5 text-[12px] text-[#86868b]">{o.desc}</div>
              </button>
            ))}
          </div>

          {paymentType === 'inicial' && (
            <div className="mb-5">
              <label className="mb-1 block text-[12px] font-medium text-[#86868b]">Monto inicial (min ${course.downPaymentMin.toLocaleString()})</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] text-[#86868b]">$</span>
                <input type="number" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} placeholder={course.downPaymentMin.toString()} className={`${inputClass(!!errors.amount)} pl-7`} />
              </div>
              {errors.amount && <p className="mt-1 text-[11px] text-red-500">{errors.amount}</p>}
            </div>
          )}

          <label className="mb-2 block text-[12px] font-medium text-[#86868b]">Metodo</label>
          <div className="mb-5 grid grid-cols-3 gap-2">
            {[
              { val: 'tarjeta' as const, label: 'Tarjeta', icon: CreditCard },
              { val: 'transferencia' as const, label: 'Transfer.', icon: Building2 },
              { val: 'efectivo' as const, label: 'Efectivo', icon: Banknote },
            ].map((m) => {
              const Icon = m.icon
              return (
                <button key={m.val} onClick={() => setPaymentMethod(m.val)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border py-3 transition-all duration-200 ${paymentMethod === m.val ? 'border-[#1e3a5f] bg-[#1e3a5f]/5 ring-1 ring-[#1e3a5f]/20' : 'border-[#d2d2d7]/60 hover:border-[#86868b]'}`}>
                  <Icon className="h-4 w-4 text-[#86868b]" />
                  <span className="text-[12px] font-medium text-[#1d1d1f]">{m.label}</span>
                </button>
              )
            })}
          </div>

          {/* Summary */}
          <div className="mb-5 rounded-xl bg-[#f5f5f7] p-4">
            <div className="space-y-1.5 text-[13px]">
              <div className="flex justify-between"><span className="text-[#86868b]">Precio total</span><span className="font-medium text-[#1d1d1f]">${course.price.toLocaleString()}</span></div>
              <div className="flex justify-between border-t border-[#d2d2d7]/40 pt-1.5">
                <span className="font-semibold text-[#1d1d1f]">A pagar ahora</span>
                <span className="text-[15px] font-bold text-[#1d1d1f]">${paymentAmount.toLocaleString()}</span>
              </div>
              {paymentType === 'inicial' && (
                <div className="flex justify-between text-amber-600"><span>Saldo pendiente</span><span className="font-medium">${(course.price - paymentAmount).toLocaleString()}</span></div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep('info')} className="rounded-full border border-[#d2d2d7]/60 px-5 py-2.5 text-[13px] font-medium text-[#1d1d1f] transition-colors hover:bg-[#f5f5f7]">
              Atras
            </button>
            <button onClick={handleSubmit} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1e3a5f] py-2.5 text-[14px] font-semibold text-white transition-all duration-200 hover:bg-[#0f1f33] active:scale-[0.98]">
              Confirmar Pago
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
