# DUNE DOMINION - Catálogo de Ítems y API REST

![Dune Banner](https://img.shields.io/badge/Dune-Arrakis%20Dominion-gold?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

Una **plataforma web completa y API REST** para gestionar todos los ítems del videojuego **DUNE DOMINION**: instalaciones, estructuras de defensa, objetos y criaturas de Arrakis.

## 🎮 Características Principales

### Catálogo Interactivo
- **24 ítems únicos** organizados en 4 categorías
- **Búsqueda en tiempo real** por nombre y descripción
- **Filtros avanzados** por rareza, tipo y estadísticas
- **Diseño Desert Brutalism** inspirado en el universo de Dune
- **Imágenes pixel art** de alta calidad para cada ítem

### API REST Completa
- **Endpoints CRUD** para todas las categorías
- **Autenticación OAuth** integrada
- **Autorización basada en roles** (admin/user)
- **Validación con Zod** de todos los inputs
- **Documentación completa** de la API

### Base de Datos
- **MySQL/TiDB** para persistencia de datos
- **Esquema normalizado** con 4 tablas principales
- **Migraciones automáticas** con Drizzle ORM
- **Datos iniciales** listos para cargar

### Documentación
- **Manual del Jugador** (PDF) con 10 capítulos
- **Guía de API** con ejemplos de integración
- **Catálogo JSON** exportable para videojuegos
- **README técnico** con instrucciones de desarrollo

## 📦 Contenido del Repositorio

```
dune-items-catalog/
├── client/                          # Frontend React + Tailwind
│   ├── src/
│   │   ├── pages/                   # Páginas principales
│   │   ├── components/              # Componentes reutilizables
│   │   ├── lib/                     # Utilidades y datos
│   │   └── index.css                # Estilos globales
│   └── public/                      # Archivos estáticos
├── server/                          # Backend Express + tRPC
│   ├── routers.ts                   # Endpoints de la API
│   ├── db.ts                        # Funciones de base de datos
│   └── _core/                       # Configuración del servidor
├── drizzle/                         # Esquema y migraciones
│   ├── schema.ts                    # Definición de tablas
│   └── migrations/                  # Historial de cambios
├── scripts/                         # Scripts de utilidad
│   └── seed-db.mjs                  # Carga de datos iniciales
├── DUNE_DOMINION_CATALOG.json       # Exportación de datos
├── MANUAL_DEL_JUGADOR.md            # Manual en Markdown
├── MANUAL_DEL_JUGADOR.pdf           # Manual en PDF
├── API_DOCUMENTATION.md             # Documentación de API
├── README_API.md                    # Guía de integración
└── package.json                     # Dependencias del proyecto
```

## 🚀 Inicio Rápido

### Requisitos
- Node.js 22+
- pnpm 10+
- MySQL/TiDB (base de datos)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/dune-items-catalog.git
cd dune-items-catalog

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env
# Edita .env con tu DATABASE_URL y credenciales OAuth

# Crear esquema de base de datos
pnpm db:push

# Cargar datos iniciales
node scripts/seed-db.mjs

# Iniciar servidor de desarrollo
pnpm dev
```

El servidor estará disponible en `http://localhost:3000`

## 📚 Documentación

### Para Jugadores
- **[Manual del Jugador](./MANUAL_DEL_JUGADOR.md)** - Guía completa del juego
- **[MANUAL_DEL_JUGADOR.pdf](./MANUAL_DEL_JUGADOR.pdf)** - Versión en PDF imprimible

### Para Desarrolladores
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Referencia completa de endpoints
- **[README_API.md](./README_API.md)** - Guía de integración y ejemplos
- **[DUNE_DOMINION_CATALOG.json](./DUNE_DOMINION_CATALOG.json)** - Datos exportables

## 🎯 Categorías de Ítems

### Instalaciones (8)
Estructuras que construyes en tu enclave para generar ingresos y defensa.

| Nombre | Rareza | Coste | Ingresos |
|--------|--------|-------|----------|
| Búnker | Legendario | 5,000 | 20 |
| Centro de Investigación | Legendario | 4,500 | 50 |
| Mercado | Legendario | 4,000 | 95 |
| Oficina de Especia | Legendario | 3,500 | 100 |
| Recinto Grande | Épico | 3,000 | 40 |
| Centro de Mantenimiento | Raro | 2,000 | 30 |
| Recinto Pequeño | Raro | 1,500 | 20 |
| Invernadero | Común | 1,000 | 25 |

### Estructuras de Defensa (5)
Defensas para proteger tu enclave de amenazas.

| Nombre | Rareza | Coste | Defensa |
|--------|--------|-------|---------|
| Escudo Generador | Legendario | 5,000 | 100 |
| Artillería Pesada | Épico | 3,500 | 90 |
| Torre de Defensa | Épico | 2,500 | 85 |
| Muro de Defensa | Raro | 1,500 | 70 |
| Puesto de Vigilancia | Raro | 1,200 | 50 |

### Objetos (5)
Recursos consumibles y unidades reclutables.

| Nombre | Tipo | Rareza | Coste |
|--------|------|--------|-------|
| Poción de Curación | Poción | Común | 100 |
| Poción de Escudo | Poción | Raro | 250 |
| Poción de Velocidad | Poción | Épico | 400 |
| Recluta Soldado | Recluta | Común | 500 |
| Mercenario Élite | Mercenario | Épico | 2,000 |

### Criaturas (6)
Especímenes únicos de Arrakis que puedes capturar y exhibir.

| Nombre | Rareza | Coste | Ataque | Defensa |
|--------|--------|-------|--------|---------|
| Shai-Hulud | Legendario | 50,000 | 95 | 85 |
| Trucha de Arena | Legendario | 15,000 | 70 | 75 |
| Escorpión de Arena | Épico | 8,000 | 80 | 70 |
| Muad'Dib | Épico | 10,000 | 75 | 60 |
| Ciélago | Raro | 3,000 | 50 | 40 |
| Águila del Desierto | Raro | 2,500 | 60 | 45 |

## 🔌 API REST - Ejemplos

### Obtener todas las instalaciones
```bash
curl http://localhost:3000/api/trpc/instalaciones.list
```

### Obtener una criatura específica
```bash
curl "http://localhost:3000/api/trpc/criaturas.getById?input={\"id\":\"shai-hulud-001\"}"
```

### Crear nueva instalación (requiere autenticación)
```bash
curl -X POST http://localhost:3000/api/trpc/instalaciones.create \
  -H "Content-Type: application/json" \
  -d '{
    "id": "nueva-instalacion",
    "nombre": "Nueva Instalación",
    "descripcion": "...",
    "rareza": "epico",
    "coste": 3000,
    "stats": { "seguridad": 70, "capacidad": 30, "ingresos": 15, "mantenimiento": 35 },
    "efectos": ["Efecto 1"]
  }'
```

### Obtener estadísticas globales
```bash
curl http://localhost:3000/api/trpc/stats.summary
```

## 🛠️ Stack Tecnológico

### Frontend
- **React 19** - Interfaz de usuario
- **Tailwind CSS 4** - Estilos
- **Vite** - Bundler
- **tRPC** - Type-safe API client

### Backend
- **Express 4** - Servidor web
- **tRPC 11** - API type-safe
- **Drizzle ORM** - Acceso a base de datos
- **Zod** - Validación de datos

### Base de Datos
- **MySQL 8** / **TiDB** - Base de datos relacional
- **Drizzle Kit** - Migraciones

### DevOps
- **Node.js 22** - Runtime
- **pnpm** - Gestor de paquetes
- **TypeScript** - Tipado estático
- **Vitest** - Testing

## 📊 Estadísticas

- **24 ítems totales** en el catálogo
- **4 categorías** diferentes
- **4 niveles de rareza** (Común, Raro, Épico, Legendario)
- **Distribución**: 8 instalaciones, 5 defensa, 5 objetos, 6 criaturas
- **Coste total**: 200,000+ especia para obtener todo

## 🔐 Seguridad

- **Autenticación OAuth** integrada
- **Autorización basada en roles** (admin/user)
- **Validación de inputs** con Zod
- **CORS** configurado
- **Protección de datos sensibles**

## 📝 Licencia

MIT License - Ver [LICENSE](./LICENSE) para más detalles

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Contacto

Para preguntas o sugerencias, abre un issue en GitHub o contacta al equipo de desarrollo.

## 🎓 Contexto Académico

Este proyecto fue desarrollado como parte del curso **Programación en Entornos Distribuidos** del Grado en Ingeniería en Tecnologías para la Animación y los Videojuegos (2026).

**Asignatura**: Programación en Entornos Distribuidos  
**Lenguaje**: C# / TypeScript / JavaScript  
**Framework**: .NET / Node.js  
**Tema**: Simulación distribuida del universo de Dune

---

**DUNE DOMINION - Catálogo de Ítems v1.0**  
*Última actualización: 2026-04-13*
