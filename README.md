<div align="center">

# ✈️ AV School

**Academia de Aviacion — Plataforma de Gestion Academica**

Una aplicacion web moderna para la gestion de cursos, inscripciones y pagos de una escuela de aviacion. Construida con React, TypeScript y TailwindCSS con un diseno minimalista inspirado en Apple.

[Ver Demo](#instalacion) · [Tecnologias](#tech-stack) · [Estructura](#estructura-del-proyecto)

---

</div>

<br>

## 📸 Vista Previa

| Pagina Principal | Cursos | Admin Dashboard |
|:---:|:---:|:---:|
| Hero, estadisticas, mision/vision | Filtros por categoria, cards limpias | Stats, inscripciones, rendimiento |

<br>

## ⚡ Tech Stack

| Tecnologia | Version | Uso |
|---|---|---|
| **React** | 19 | UI Framework |
| **TypeScript** | 5.9 | Type Safety |
| **Vite** | 7 | Build Tool & Dev Server |
| **TailwindCSS** | 4 | Styling (con `@theme` directive) |
| **React Router** | 7 | Navegacion SPA |
| **Lucide React** | — | Iconografia |
| **Context API** | — | State Management |

<br>

## 🎨 Diseno

El diseno sigue una estetica **Apple-like** con enfoque en:

- **Tipografia limpia** — Inter font, tamaños precisos (13–18px), tracking ajustado
- **Espaciado generoso** — Secciones con respiracion, grids con gaps consistentes
- **Paleta contenida** — `#1e3a5f` (primario), `#f59e0b` (acento), grises neutros de Apple (`#1d1d1f`, `#86868b`, `#d2d2d7`)
- **Bordes sutiles** — Separacion visual sin sombras pesadas
- **Botones pill** — `rounded-full` con transiciones suaves
- **Cards contenidas** — `max-w-6xl`, bordes finos, sin overlap

<br>

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Layout.tsx          # Layout principal (Navbar + Footer)
│   ├── AdminLayout.tsx     # Layout del panel admin (sidebar)
│   ├── Navbar.tsx           # Navegacion con glass effect
│   └── Footer.tsx           # Footer minimalista
├── pages/
│   ├── HomePage.tsx         # Hero, stats, about, cursos destacados, CTA
│   ├── CoursesPage.tsx      # Grid de cursos con filtro por categoria
│   ├── CourseDetailPage.tsx  # Detalle del curso + sidebar de inscripcion
│   ├── EnrollmentPage.tsx   # Formulario 2 pasos: datos + pago
│   └── admin/
│       ├── DashboardPage.tsx       # Stats, inscripciones recientes
│       ├── AdminCoursesPage.tsx    # Gestion de cursos
│       ├── AdminEnrollmentsPage.tsx # Tabla de inscripciones
│       └── AdminPaymentsPage.tsx   # Historial de pagos
├── context/
│   └── AppContext.tsx       # Estado global (cursos, inscripciones, pagos)
├── data/
│   └── mockData.ts          # Datos mock de cursos e info escolar
├── types.ts                 # Interfaces TypeScript
├── index.css                # Estilos globales + animaciones
├── App.tsx                  # Rutas principales
└── main.tsx                 # Entry point
```

<br>

## 🗺️ Rutas

| Ruta | Descripcion |
|---|---|
| `/` | Pagina principal — hero, estadisticas, mision/vision, cursos destacados |
| `/cursos` | Catalogo de cursos con filtros por categoria |
| `/cursos/:id` | Detalle del curso con info completa y boton de inscripcion |
| `/inscripcion/:courseId` | Formulario de inscripcion (datos personales → pago) |
| `/admin` | Dashboard administrativo |
| `/admin/cursos` | Gestion de cursos |
| `/admin/inscripciones` | Control de inscripciones con cambio de estado |
| `/admin/pagos` | Historial y resumen de pagos |

<br>

## 🚀 Instalacion

```bash
# Clonar el repositorio
git clone https://github.com/JensenPadillaFigueroa/avSchool.git
cd avSchool

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para produccion
npm run build
```

<br>

## 💳 Funcionalidades

- **Catalogo de cursos** — Filtrado por categoria (Piloto, Mecanica, Despachador, Drones)
- **Detalle de cursos** — Descripcion, caracteristicas, instructor, horario, capacidad
- **Inscripcion** — Formulario de 2 pasos con validacion
- **Pagos flexibles** — Pago completo o down payment (pago inicial)
- **3 metodos de pago** — Tarjeta, transferencia, efectivo
- **Panel admin** — Dashboard con metricas, gestion de inscripciones y pagos
- **Responsive** — Adaptado a movil y desktop
- **Animaciones** — Fade-up, fade-in con cubic-bezier suaves

<br>

---

<div align="center">

Hecho con ☕ y React

</div>
