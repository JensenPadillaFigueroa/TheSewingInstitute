import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import AdminLayout from './components/AdminLayout'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import EnrollmentPage from './pages/EnrollmentPage'
import DashboardPage from './pages/admin/DashboardPage'
import AdminCoursesPage from './pages/admin/AdminCoursesPage'
import AdminEnrollmentsPage from './pages/admin/AdminEnrollmentsPage'
import AdminPaymentsPage from './pages/admin/AdminPaymentsPage'

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cursos" element={<CoursesPage />} />
        <Route path="/cursos/:id" element={<CourseDetailPage />} />
        <Route path="/inscripcion/:courseId" element={<EnrollmentPage />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="cursos" element={<AdminCoursesPage />} />
        <Route path="inscripciones" element={<AdminEnrollmentsPage />} />
        <Route path="pagos" element={<AdminPaymentsPage />} />
      </Route>
    </Routes>
  )
}
