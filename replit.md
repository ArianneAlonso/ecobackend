# EcoResiduos - Portal de Gestión Municipal de Reciclaje

## Descripción del Proyecto
EcoResiduos es una plataforma web para la gestión municipal de reciclaje. El sistema permite a los administradores municipales gestionar contenedores de reciclaje, programar eventos ambientales, generar códigos QR para validación, administrar solicitudes de retiro de residuos y monitorear métricas de participación ciudadana.

## Tecnologías Utilizadas
- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, Node.js
- **Base de datos**: PostgreSQL (Neon)
- **Routing**: Wouter
- **Forms**: React Hook Form con Zod
- **Data Fetching**: TanStack Query v5
- **Charts**: Recharts
- **QR Codes**: qrcode.react
- **Icons**: Lucide React

## Estructura del Proyecto

### Páginas Principales
1. **Dashboard** (`/`) - Vista general con métricas y gráficos
2. **Contenedores** (`/containers`) - Gestión de contenedores de reciclaje
3. **Eventos** (`/events`) - Gestión de eventos ambientales
4. **Sistema de Puntos** (`/points`) - Códigos QR para eventos y retiros
5. **Retiros** (`/pickups`) - Mapa de calor de solicitudes de retiro

### Componentes Principales
- `MetricCard` - Tarjetas de métricas con iconos y tendencias
- `DashboardCharts` - Gráficos de líneas y barras
- `ContainerMap` - Mapa de ubicación de contenedores
- `EventCalendar` - Calendario y lista de eventos
- `QRGenerator` - Generador de códigos QR
- `DataTable` - Tabla de datos reutilizable
- `PickupHeatmap` - Mapa de calor para solicitudes de retiro
- `AppSidebar` - Barra lateral de navegación
- `ThemeToggle` - Alternador de tema claro/oscuro

### Formularios
- `ContainerForm` - Agregar/editar contenedores
- `EventForm` - Crear eventos ambientales
- `BenefitForm` - Crear beneficios (deprecado)

## Paleta de Colores
- **Verde Oscuro**: #006400 (hsl(120, 100%, 20%)) - Color primario
- **Verde Claro**: #8CC63F (hsl(88, 50%, 58%)) - Color de acento
- Diseño con tema claro y oscuro
- Enfoque en sostenibilidad y medio ambiente

## Características Principales

### 1. Dashboard
- Métricas clave: Usuarios Activos, Kg Reciclados, Contenedores, Eventos, Comercios Adheridos
- Gráficos de participación mensual y materiales recolectados
- Tendencias con indicadores de crecimiento

### 2. Gestión de Contenedores
- Mapa interactivo de ubicación de contenedores
- Tabla con información detallada de cada contenedor
- Filtros por tipo de material y estado
- Formulario para agregar nuevos contenedores

### 3. Eventos Ambientales
- Calendario de eventos próximos
- Categorías: Taller, Recolección, Ecopunto, Charla
- Gestión de asistentes y ubicaciones
- Formulario para crear nuevos eventos

### 4. Sistema de Puntos y Códigos QR
- **Eventos**: Un código QR por cada evento activo
- **Retiros Particulares**: Código QR general para solicitudes de retiro
- Métricas de canjes y conversión
- Gestión de puntos distribuidos

### 5. Retiros de Residuos
- Mapa de calor con densidad de solicitudes
- Filtros por:
  - Tipo de residuo (Plástico, Papel, Vidrio, Metal, Orgánico)
  - Día de la semana (Lunes, Martes, Miércoles, Jueves)
  - Turno (Mañana, Tarde)
- Estadísticas de distribución por material
- Horarios más solicitados

## Datos Mock
El proyecto utiliza datos de ejemplo (mock data) para todas las funcionalidades:
- 4 contenedores de ejemplo
- 4 eventos próximos
- 3 códigos QR activos
- 5 ubicaciones de retiro con diferentes densidades
- Métricas de participación ciudadana

## Cambios Recientes (31 Oct 2025)
- ✅ Eliminada la sección de comercio/beneficios
- ✅ Agregada métrica de "Comercios Adheridos" al Dashboard
- ✅ Modificado sistema de códigos QR:
  - Pestaña de "Eventos" con QR por cada evento activo
  - Pestaña de "Retiros Particulares" con QR general
- ✅ Creada nueva sección "Retiros" con:
  - Mapa de calor de solicitudes
  - Filtros por tipo de residuo, día y turno
  - Estadísticas de distribución
  - Horarios más solicitados

## Desarrollo

### Ejecutar el Proyecto
El workflow "Start application" ya está configurado:
```bash
npm run dev
```
Esto inicia el servidor Express en el puerto 5000 con Vite para el frontend.

### Estructura de Archivos
```
client/
  src/
    components/      # Componentes reutilizables
    pages/          # Páginas principales
    lib/            # Utilidades y configuración
    index.css       # Estilos globales y tema
server/
  routes.ts         # Rutas de la API
  storage.ts        # Interfaz de almacenamiento
  vite.ts          # Configuración de Vite
shared/
  schema.ts         # Esquemas de datos compartidos
```

## Próximos Pasos Sugeridos
1. Implementar backend real con API routes
2. Conectar con base de datos PostgreSQL
3. Integración con mapas reales (Leaflet/Mapbox)
4. Sistema de autenticación para administradores
5. Panel de reportes y exportación de datos
6. Notificaciones push para eventos
7. API pública para comercios adheridos

## Notas de Diseño
- Framework: Material Design con adaptaciones ambientales
- Tipografía: Inter (body), Poppins (headings), JetBrains Mono (code)
- Accesibilidad: Todos los elementos interactivos tienen data-testid
- Responsive: Diseño adaptable para mobile, tablet y desktop
- Dark Mode: Soporte completo para tema oscuro
