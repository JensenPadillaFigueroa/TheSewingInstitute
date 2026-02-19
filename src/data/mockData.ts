import { Course, SchoolInfo, Enrollment, Payment } from '../types'

export const schoolInfo: SchoolInfo = {
  name: 'AV School',
  slogan: 'Tu futuro en la aviacion comienza aqui',
  description:
    'Somos una academia de aviacion lider en la region, dedicada a formar profesionales altamente capacitados en todas las areas de la industria aeronautica. Con mas de 15 anos de experiencia, ofrecemos programas certificados que combinan teoria avanzada con practica intensiva en simuladores y aeronaves reales.',
  mission:
    'Formar profesionales de excelencia en el campo de la aviacion, brindando educacion de la mas alta calidad con tecnologia de vanguardia y un enfoque practico que prepare a nuestros estudiantes para los retos del mundo aeronautico.',
  vision:
    'Ser la academia de aviacion mas reconocida de Latinoamerica, liderando la innovacion educativa y contribuyendo al desarrollo seguro y eficiente de la industria aeronautica regional.',
  address: 'Aeropuerto Internacional, Hangar 12, Terminal de Aviacion General',
  phone: '+1 (555) 123-4567',
  email: 'info@avschool.edu',
  founded: 2010,
  certifications: [
    'Certificacion FAA Part 141',
    'Certificacion DGAC',
    'ISO 9001:2015',
    'Miembro IATA Training Partner',
  ],
  stats: {
    students: 2500,
    courses: 12,
    instructors: 35,
    yearsExperience: 15,
  },
}

export const courses: Course[] = [
  {
    id: 'ppl-001',
    title: 'Licencia de Piloto Privado (PPL)',
    description:
      'Obtén tu licencia de piloto privado y comienza tu carrera en la aviacion.',
    longDescription:
      'Este programa completo te preparara para obtener tu Licencia de Piloto Privado (PPL). Incluye instruccion en tierra sobre navegacion, meteorologia, regulaciones aereas, y un minimo de 40 horas de vuelo con instructor certificado. Al finalizar, estaras habilitado para volar aeronaves monomotor en condiciones VFR.',
    duration: '6 meses',
    price: 12000,
    downPaymentMin: 2400,
    category: 'piloto',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600',
    instructor: 'Cap. Roberto Martinez',
    schedule: 'Lunes a Viernes, 8:00 AM - 12:00 PM',
    capacity: 20,
    enrolled: 14,
    features: [
      '40+ horas de vuelo',
      'Simulador de vuelo incluido',
      'Material didactico digital',
      'Examen FAA incluido',
      'Seguro de vuelo',
    ],
  },
  {
    id: 'cpl-001',
    title: 'Licencia de Piloto Comercial (CPL)',
    description:
      'Avanza tu carrera con la licencia comercial y vuela profesionalmente.',
    longDescription:
      'El programa de Piloto Comercial esta disenado para pilotos que ya poseen su PPL y desean avanzar profesionalmente. Incluye entrenamiento avanzado en vuelo instrumental, vuelo nocturno, navegacion avanzada y operaciones comerciales. Requiere un minimo de 250 horas de vuelo totales.',
    duration: '12 meses',
    price: 35000,
    downPaymentMin: 7000,
    category: 'piloto',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600',
    instructor: 'Cap. Ana Lucia Fernandez',
    schedule: 'Lunes a Sabado, 7:00 AM - 1:00 PM',
    capacity: 15,
    enrolled: 11,
    features: [
      '200+ horas de vuelo',
      'Entrenamiento multimotor',
      'Vuelo instrumental (IFR)',
      'Preparacion para aerolineas',
      'Certificacion internacional',
    ],
  },
  {
    id: 'drone-001',
    title: 'Piloto de Drones Certificado',
    description:
      'Aprende a operar drones comerciales con certificacion oficial.',
    longDescription:
      'Programa intensivo para convertirte en piloto de drones certificado. Cubre legislacion aeronautica aplicable a RPAS, planificacion de vuelo, fotogrametria, inspeccion industrial y agricultura de precision. Incluye practica con drones DJI de ultima generacion.',
    duration: '3 meses',
    price: 3500,
    downPaymentMin: 700,
    category: 'drones',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600',
    instructor: 'Ing. Carlos Mendez',
    schedule: 'Sabados y Domingos, 9:00 AM - 3:00 PM',
    capacity: 25,
    enrolled: 19,
    features: [
      'Certificacion DGAC para RPAS',
      'Practica con drones profesionales',
      'Fotogrametria y mapeo',
      'Inspeccion industrial',
      'Kit de herramientas digitales',
    ],
  },
  {
    id: 'mech-001',
    title: 'Tecnico en Mantenimiento Aeronautico',
    description:
      'Formacion completa en mantenimiento y reparacion de aeronaves.',
    longDescription:
      'Programa tecnico integral que te formara como profesional en el mantenimiento de aeronaves. Cubre sistemas de propulsion, estructuras, avionica, sistemas hidraulicos y neumaticos. Incluye practicas en hangares reales con aeronaves de diferentes tipos.',
    duration: '18 meses',
    price: 18000,
    downPaymentMin: 3600,
    category: 'mecanica',
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600',
    instructor: 'Ing. Pedro Alvarez',
    schedule: 'Lunes a Viernes, 2:00 PM - 6:00 PM',
    capacity: 20,
    enrolled: 16,
    features: [
      'Practicas en hangar real',
      'Herramientas especializadas',
      'Certificacion A&P',
      'Avionica basica incluida',
      'Bolsa de trabajo',
    ],
  },
  {
    id: 'disp-001',
    title: 'Despachador de Vuelo',
    description:
      'Preparate para planificar y coordinar operaciones de vuelo.',
    longDescription:
      'El programa de Despachador de Vuelo te preparara para una de las posiciones mas importantes en la operacion aerea. Aprenderas planificacion de vuelo, meteorologia avanzada, performance de aeronaves, regulaciones y coordinacion con tripulaciones y control de trafico aereo.',
    duration: '8 meses',
    price: 8000,
    downPaymentMin: 1600,
    category: 'despachador',
    image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=600',
    instructor: 'Lic. Maria Gonzalez',
    schedule: 'Lunes, Miercoles y Viernes, 6:00 PM - 9:00 PM',
    capacity: 30,
    enrolled: 22,
    features: [
      'Software profesional de despacho',
      'Meteorologia avanzada',
      'Simulaciones operacionales',
      'Visitas a centros de control',
      'Certificacion incluida',
    ],
  },
  {
    id: 'ifr-001',
    title: 'Habilitacion de Vuelo Instrumental (IFR)',
    description:
      'Domina el vuelo por instrumentos para condiciones meteorologicas adversas.',
    longDescription:
      'Curso avanzado de habilitacion instrumental que te permitira volar en condiciones de visibilidad reducida utilizando unicamente los instrumentos de la aeronave. Incluye teoria avanzada de navegacion instrumental, aproximaciones de precision y no precision, y procedimientos de emergencia.',
    duration: '4 meses',
    price: 15000,
    downPaymentMin: 3000,
    category: 'piloto',
    image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=600',
    instructor: 'Cap. Roberto Martinez',
    schedule: 'Martes a Jueves, 3:00 PM - 7:00 PM',
    capacity: 12,
    enrolled: 8,
    features: [
      '50+ horas de vuelo IFR',
      'Simulador avanzado',
      'Aproximaciones de precision',
      'Navegacion GPS/VOR/ILS',
      'Examen de habilitacion incluido',
    ],
  },
]

let paymentIdCounter = 100

function generatePaymentId(): string {
  return `pay-${++paymentIdCounter}`
}

export const initialEnrollments: Enrollment[] = [
  {
    id: 'enr-001',
    studentId: 'stu-001',
    studentName: 'Juan Carlos Perez',
    studentEmail: 'jcperez@email.com',
    courseId: 'ppl-001',
    courseTitle: 'Licencia de Piloto Privado (PPL)',
    date: '2025-11-15',
    status: 'activa',
    totalAmount: 12000,
    paidAmount: 4800,
    payments: [
      {
        id: 'pay-001',
        enrollmentId: 'enr-001',
        amount: 2400,
        date: '2025-11-15',
        method: 'tarjeta',
        type: 'inicial',
        status: 'completado',
      },
      {
        id: 'pay-002',
        enrollmentId: 'enr-001',
        amount: 2400,
        date: '2025-12-15',
        method: 'transferencia',
        type: 'cuota',
        status: 'completado',
      },
    ],
  },
  {
    id: 'enr-002',
    studentId: 'stu-002',
    studentName: 'Maria Elena Rodriguez',
    studentEmail: 'merodriguez@email.com',
    courseId: 'drone-001',
    courseTitle: 'Piloto de Drones Certificado',
    date: '2025-12-01',
    status: 'activa',
    totalAmount: 3500,
    paidAmount: 3500,
    payments: [
      {
        id: 'pay-003',
        enrollmentId: 'enr-002',
        amount: 3500,
        date: '2025-12-01',
        method: 'tarjeta',
        type: 'completo',
        status: 'completado',
      },
    ],
  },
  {
    id: 'enr-003',
    studentId: 'stu-003',
    studentName: 'Andres Felipe Gomez',
    studentEmail: 'afgomez@email.com',
    courseId: 'cpl-001',
    courseTitle: 'Licencia de Piloto Comercial (CPL)',
    date: '2026-01-10',
    status: 'pendiente',
    totalAmount: 35000,
    paidAmount: 7000,
    payments: [
      {
        id: 'pay-004',
        enrollmentId: 'enr-003',
        amount: 7000,
        date: '2026-01-10',
        method: 'transferencia',
        type: 'inicial',
        status: 'completado',
      },
    ],
  },
]

export { generatePaymentId }
