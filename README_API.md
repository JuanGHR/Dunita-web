# DUNE DOMINION - Guía de Uso de la API

## 🚀 Inicio Rápido

### 1. Instalar dependencias
```bash
pnpm install
```

### 2. Configurar base de datos
```bash
pnpm db:push
```

### 3. Cargar datos iniciales
```bash
node scripts/seed-db.mjs
```

### 4. Iniciar servidor de desarrollo
```bash
pnpm dev
```

El servidor estará disponible en `http://localhost:3000`

---

## 📚 Documentación de la API

La documentación completa de la API está disponible en `API_DOCUMENTATION.md`

### Endpoints Principales

#### Instalaciones
- `GET /api/trpc/instalaciones.list` - Listar todas
- `GET /api/trpc/instalaciones.getById` - Obtener por ID
- `POST /api/trpc/instalaciones.create` - Crear (Admin)
- `PATCH /api/trpc/instalaciones.update` - Actualizar (Admin)
- `DELETE /api/trpc/instalaciones.delete` - Eliminar (Admin)

#### Estructuras de Defensa
- `GET /api/trpc/estructurasDefensa.list` - Listar todas
- `GET /api/trpc/estructurasDefensa.getById` - Obtener por ID
- `POST /api/trpc/estructurasDefensa.create` - Crear (Admin)
- `PATCH /api/trpc/estructurasDefensa.update` - Actualizar (Admin)
- `DELETE /api/trpc/estructurasDefensa.delete` - Eliminar (Admin)

#### Objetos
- `GET /api/trpc/objetos.list` - Listar todas
- `GET /api/trpc/objetos.getById` - Obtener por ID
- `POST /api/trpc/objetos.create` - Crear (Admin)
- `PATCH /api/trpc/objetos.update` - Actualizar (Admin)
- `DELETE /api/trpc/objetos.delete` - Eliminar (Admin)

#### Criaturas
- `GET /api/trpc/criaturas.list` - Listar todas
- `GET /api/trpc/criaturas.getById` - Obtener por ID
- `POST /api/trpc/criaturas.create` - Crear (Admin)
- `PATCH /api/trpc/criaturas.update` - Actualizar (Admin)
- `DELETE /api/trpc/criaturas.delete` - Eliminar (Admin)

#### Estadísticas
- `GET /api/trpc/stats.summary` - Resumen de estadísticas globales

---

## 🎮 Integración con Videojuego

### Obtener todos los ítems

```typescript
import { trpc } from '@/lib/trpc';

// En un componente React
const { data: instalaciones } = trpc.instalaciones.list.useQuery();
const { data: estructuras } = trpc.estructurasDefensa.list.useQuery();
const { data: objetos } = trpc.objetos.list.useQuery();
const { data: criaturas } = trpc.criaturas.list.useQuery();
```

### Obtener ítem específico

```typescript
const { data: bunker } = trpc.instalaciones.getById.useQuery({ id: 'bunker-001' });
```

### Crear nuevo ítem (Admin)

```typescript
const createInstalacion = trpc.instalaciones.create.useMutation();

await createInstalacion.mutateAsync({
  id: 'nueva-instalacion',
  nombre: 'Nueva Instalación',
  descripcion: 'Descripción...',
  categoria: 'DEFENSA',
  tipo: 'Aclimatación',
  rareza: 'epico',
  coste: 3000,
  imageUrl: 'https://cdn.../imagen.png',
  codigo: 'NUEVA',
  stats: {
    seguridad: 70,
    capacidad: 30,
    ingresos: 15,
    mantenimiento: 35
  },
  efectos: ['Efecto 1', 'Efecto 2']
});
```

### Actualizar ítem (Admin)

```typescript
const updateInstalacion = trpc.instalaciones.update.useMutation();

await updateInstalacion.mutateAsync({
  id: 'bunker-001',
  data: {
    coste: 5500,
    stats: {
      seguridad: 100,
      capacidad: 45,
      ingresos: 25,
      mantenimiento: 55
    }
  }
});
```

### Eliminar ítem (Admin)

```typescript
const deleteInstalacion = trpc.instalaciones.delete.useMutation();

await deleteInstalacion.mutateAsync({ id: 'bunker-001' });
```

---

## 🗄️ Estructura de Base de Datos

### Tabla: instalaciones
```sql
CREATE TABLE instalaciones (
  id VARCHAR(64) PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  categoria VARCHAR(64) NOT NULL,
  tipo VARCHAR(64) NOT NULL,
  rareza ENUM('legendario', 'epico', 'raro', 'comun') NOT NULL,
  coste INT NOT NULL,
  imageUrl TEXT NOT NULL,
  codigo VARCHAR(64) NOT NULL UNIQUE,
  faccion VARCHAR(64),
  medio VARCHAR(64),
  alimentacion VARCHAR(64),
  stats JSON NOT NULL,
  efectos JSON NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Tabla: estructuras_defensa
```sql
CREATE TABLE estructuras_defensa (
  id VARCHAR(64) PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  codigo VARCHAR(64) NOT NULL UNIQUE,
  rareza ENUM('legendario', 'epico', 'raro', 'comun') NOT NULL,
  coste INT NOT NULL,
  imageUrl TEXT NOT NULL,
  stats JSON NOT NULL,
  efectos JSON NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Tabla: objetos
```sql
CREATE TABLE objetos (
  id VARCHAR(64) PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  tipo VARCHAR(64) NOT NULL,
  categoria VARCHAR(64) NOT NULL,
  rareza ENUM('legendario', 'epico', 'raro', 'comun') NOT NULL,
  coste INT NOT NULL,
  cantidad INT NOT NULL DEFAULT 1,
  imageUrl TEXT NOT NULL,
  efectos JSON NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Tabla: criaturas
```sql
CREATE TABLE criaturas (
  id VARCHAR(64) PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  nombreComun VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  especie VARCHAR(255) NOT NULL,
  rareza ENUM('legendario', 'epico', 'raro', 'comun') NOT NULL,
  costeCompra INT NOT NULL,
  costeVenta INT NOT NULL,
  imageUrl TEXT NOT NULL,
  stats JSON NOT NULL,
  habilidades JSON NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 🔐 Autenticación y Autorización

### Endpoints Públicos
No requieren autenticación:
- Listar ítems
- Obtener ítem por ID
- Ver estadísticas

### Endpoints Protegidos
Requieren autenticación y rol de administrador:
- Crear ítems
- Actualizar ítems
- Eliminar ítems

### Flujo de Autenticación
1. Usuario se autentica mediante OAuth de Manus
2. Se genera una sesión con cookie
3. Las solicitudes protegidas verifican el rol del usuario
4. Solo administradores pueden modificar datos

---

## 📊 Estadísticas Disponibles

```typescript
const { data: stats } = trpc.stats.summary.useQuery();

// Respuesta:
{
  totalInstalaciones: 8,
  totalEstructuras: 5,
  totalObjetos: 5,
  totalCriaturas: 6,
  totalItems: 24,
  rarezaDistribution: {
    legendario: 4,
    epico: 6,
    raro: 8,
    comun: 6
  }
}
```

---

## 🧪 Testing

### Ejecutar tests
```bash
pnpm test
```

### Tests disponibles
- `server/auth.logout.test.ts` - Pruebas de autenticación

---

## 🔧 Troubleshooting

### Error: "Database not available"
- Verificar que `DATABASE_URL` está configurado
- Ejecutar `pnpm db:push` para crear las tablas

### Error: "Only admins can create items"
- Verificar que el usuario está autenticado como administrador
- Contactar al propietario del proyecto para obtener permisos de admin

### Error: "Connection refused"
- Verificar que el servidor está corriendo: `pnpm dev`
- Verificar que el puerto 3000 está disponible

---

## 📝 Notas Importantes

1. **Tipos TypeScript**: Todos los tipos se generan automáticamente desde el esquema de base de datos
2. **Validación**: Zod valida todos los inputs antes de procesarlos
3. **Superjson**: Las fechas y otros tipos especiales se serializan correctamente
4. **CORS**: Configurado para aceptar solicitudes desde el frontend

---

## 🚀 Próximas Características

- [ ] Búsqueda avanzada y filtrado
- [ ] Paginación de resultados
- [ ] Caché de respuestas
- [ ] Webhooks para eventos
- [ ] Sistema de transacciones
- [ ] Historial de cambios
- [ ] Exportación de datos
- [ ] Documentación Swagger

---

**Versión**: 1.0.0  
**Última actualización**: 2026-04-13
