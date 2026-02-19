import { createContext, useContext, useState, ReactNode } from 'react'
import { Course, Enrollment, Payment } from '../types'
import { courses as initialCourses, initialEnrollments, generatePaymentId } from '../data/mockData'

interface AppContextType {
  courses: Course[]
  enrollments: Enrollment[]
  addEnrollment: (enrollment: Omit<Enrollment, 'id' | 'payments'> & { payment: Omit<Payment, 'id' | 'enrollmentId'> }) => void
  addPayment: (enrollmentId: string, payment: Omit<Payment, 'id' | 'enrollmentId'>) => void
  updateEnrollmentStatus: (enrollmentId: string, status: Enrollment['status']) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

let enrollmentCounter = 100

export function AppProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [enrollments, setEnrollments] = useState<Enrollment[]>(initialEnrollments)

  const addEnrollment = (
    data: Omit<Enrollment, 'id' | 'payments'> & { payment: Omit<Payment, 'id' | 'enrollmentId'> }
  ) => {
    const enrollmentId = `enr-${++enrollmentCounter}`
    const paymentId = generatePaymentId()
    const { payment, ...enrollmentData } = data

    const newPayment: Payment = {
      ...payment,
      id: paymentId,
      enrollmentId,
    }

    const newEnrollment: Enrollment = {
      ...enrollmentData,
      id: enrollmentId,
      payments: [newPayment],
    }

    setEnrollments((prev) => [...prev, newEnrollment])

    setCourses((prev) =>
      prev.map((c) =>
        c.id === data.courseId ? { ...c, enrolled: c.enrolled + 1 } : c
      )
    )
  }

  const addPayment = (
    enrollmentId: string,
    payment: Omit<Payment, 'id' | 'enrollmentId'>
  ) => {
    const paymentId = generatePaymentId()
    const newPayment: Payment = {
      ...payment,
      id: paymentId,
      enrollmentId,
    }

    setEnrollments((prev) =>
      prev.map((e) =>
        e.id === enrollmentId
          ? {
              ...e,
              paidAmount: e.paidAmount + payment.amount,
              payments: [...e.payments, newPayment],
              status: e.paidAmount + payment.amount >= e.totalAmount ? 'activa' : e.status,
            }
          : e
      )
    )
  }

  const updateEnrollmentStatus = (enrollmentId: string, status: Enrollment['status']) => {
    setEnrollments((prev) =>
      prev.map((e) => (e.id === enrollmentId ? { ...e, status } : e))
    )
  }

  return (
    <AppContext.Provider
      value={{ courses, enrollments, addEnrollment, addPayment, updateEnrollmentStatus }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}
