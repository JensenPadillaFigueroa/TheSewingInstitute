export interface Course {
  id: string
  title: string
  description: string
  longDescription: string
  duration: string
  price: number
  downPaymentMin: number
  category: 'costura' | 'patronaje' | 'bordado' | 'confeccion' | 'diseno' | 'tapiceria'
  image: string
  instructor: string
  schedule: string
  capacity: number
  enrolled: number
  features: string[]
}

export interface Student {
  id: string
  name: string
  email: string
  phone: string
  document: string
}

export interface Enrollment {
  id: string
  studentId: string
  studentName: string
  studentEmail: string
  courseId: string
  courseTitle: string
  date: string
  status: 'pendiente' | 'activa' | 'completada' | 'cancelada'
  totalAmount: number
  paidAmount: number
  payments: Payment[]
}

export interface Payment {
  id: string
  enrollmentId: string
  amount: number
  date: string
  method: 'tarjeta' | 'transferencia' | 'efectivo'
  type: 'inicial' | 'cuota' | 'completo'
  status: 'completado' | 'pendiente' | 'fallido'
}

export interface SchoolInfo {
  name: string
  slogan: string
  description: string
  mission: string
  vision: string
  address: string
  phone: string
  email: string
  founded: number
  certifications: string[]
  stats: {
    students: number
    courses: number
    instructors: number
    yearsExperience: number
  }
}
