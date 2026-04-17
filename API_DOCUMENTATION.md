# DUNE DOMINION - API REST Completa

## Descripción General

Esta es la API REST completa para el videojuego **DUNE DOMINION**. Proporciona acceso a todos los ítems del juego: instalaciones, estructuras de defensa, objetos y criaturas. La API está construida con **tRPC** y **Express**, con autenticación integrada.

## Base URL

```
http://localhost:3000/api/trpc
```

## Autenticación

- **Endpoints públicos**: No requieren autenticación (listados, búsquedas)
- **Endpoints protegidos**: Requieren autenticación y rol de administrador (crear, actualizar, eliminar)
- La autenticación se realiza mediante OAuth de Manus

## Estructura de Respuestas

Todas las respuestas siguen el formato tRPC:

```json
{
  "result": {
    "data": { /* datos */ }
  }
}
```

## Categorías de Ítems

### 1. INSTALACIONES (Buildings)

Las instalaciones son estructuras que se pueden construir en el enclave.

#### Listar todas las instalaciones
```
GET /api/trpc/instalaciones.list
```

**Respuesta:**
```json
{
  "result": {
    "data": [
      {
        "id": "bunker-001",
        "nombre": "Búnker",
        "descripcion": "Instalación subterránea blindada...",
        "categoria": "DEFENSA",
        "tipo": "Aclimatación",
        "rareza": "legendario",
        "coste": 5000,
        "imageUrl": "https://cdn.../bunker.png",
        "codigo": "BUNKER",
        "stats": {
          "seguridad": 95,
          "capacidad": 40,
          "ingresos": 20,
          "mantenimiento": 50
        },
        "efectos": ["Protección máxima", "Blindaje especial"]
      }
    ]
  }
}
```

#### Obtener instalación por ID
```
GET /api/trpc/instalaciones.getById?input={"id":"bunker-001"}
```

#### Crear instalación (Admin)
```
POST /api/trpc/instalaciones.create
```

**Body:**
```json
{
  "id": "nueva-instalacion",
  "nombre": "Nueva Instalación",
  "descripcion": "Descripción...",
  "categoria": "DEFENSA",
  "tipo": "Aclimatación",
  "rareza": "epico",
  "coste": 3000,
  "imageUrl": "https://cdn.../imagen.png",
  "codigo": "NUEVA",
  "stats": {
    "seguridad": 70,
    "capacidad": 30,
    "ingresos": 15,
    "mantenimiento": 35
  },
  "efectos": ["Efecto 1", "Efecto 2"]
}
```

#### Actualizar instalación (Admin)
```
PATCH /api/trpc/instalaciones.update
```

**Body:**
```json
{
  "id": "bunker-001",
  "data": {
    "coste": 5500,
    "stats": {
      "seguridad": 100,
      "capacidad": 45,
      "ingresos": 25,
      "mantenimiento": 55
    }
  }
}
```

#### Eliminar instalación (Admin)
```
DELETE /api/trpc/instalaciones.delete?input={"id":"bunker-001"}
```

---

### 2. ESTRUCTURAS DE DEFENSA (Defense Structures)

Estructuras especializadas en defensa del enclave.

#### Listar todas las estructuras de defensa
```
GET /api/trpc/estructurasDefensa.list
```

**Respuesta:**
```json
{
  "result": {
    "data": [
      {
        "id": "torre-defensa-001",
        "nombre": "Torre de Defensa",
        "descripcion": "Torre armada con cañones...",
        "codigo": "TORRE_DEF",
        "rareza": "epico",
        "coste": 2500,
        "imageUrl": "https://cdn.../torre.png",
        "stats": {
          "defensa": 85,
          "durabilidad": 100
        },
        "efectos": ["Disparo automático", "Cobertura 360°"]
      }
    ]
  }
}
```

#### Operaciones CRUD
- **GET** `/api/trpc/estructurasDefensa.getById?input={"id":"torre-defensa-001"}`
- **POST** `/api/trpc/estructurasDefensa.create` (Admin)
- **PATCH** `/api/trpc/estructurasDefensa.update` (Admin)
- **DELETE** `/api/trpc/estructurasDefensa.delete` (Admin)

---

### 3. OBJETOS (Items)

Objetos consumibles y unidades reclutables.

#### Listar todos los objetos
```
GET /api/trpc/objetos.list
```

**Respuesta:**
```json
{
  "result": {
    "data": [
      {
        "id": "pocion-curacion-001",
        "nombre": "Poción de Curación",
        "descripcion": "Restaura 50 puntos de salud...",
        "tipo": "POCION",
        "categoria": "Consumible",
        "rareza": "comun",
        "coste": 100,
        "cantidad": 5,
        "imageUrl": "https://cdn.../pocion.png",
        "efectos": ["Curación +50 HP", "Duración 10 turnos"]
      }
    ]
  }
}
```

#### Operaciones CRUD
- **GET** `/api/trpc/objetos.getById?input={"id":"pocion-curacion-001"}`
- **POST** `/api/trpc/objetos.create` (Admin)
- **PATCH** `/api/trpc/objetos.update` (Admin)
- **DELETE** `/api/trpc/objetos.delete` (Admin)

---

### 4. CRIATURAS (Creatures)

Criaturas y bestias del planeta Arrakis.

#### Listar todas las criaturas
```
GET /api/trpc/criaturas.list
```

**Respuesta:**
```json
{
  "result": {
    "data": [
      {
        "id": "shai-hulud-001",
        "nombre": "Shai-Hulud",
        "nombreComun": "Gusano de Arena",
        "descripcion": "La criatura más poderosa de Arrakis...",
        "especie": "Gusano de Arena",
        "rareza": "legendario",
        "costeCompra": 50000,
        "costeVenta": 25000,
        "imageUrl": "https://cdn.../shai-hulud.png",
        "stats": {
          "ataque": 95,
          "defensa": 85,
          "velocidad": 60,
          "resistencia": 100
        },
        "habilidades": ["Terremoto", "Absorción de especia", "Regeneración"]
      }
    ]
  }
}
```

#### Operaciones CRUD
- **GET** `/api/trpc/criaturas.getById?input={"id":"shai-hulud-001"}`
- **POST** `/api/trpc/criaturas.create` (Admin)
- **PATCH** `/api/trpc/criaturas.update` (Admin)
- **DELETE** `/api/trpc/criaturas.delete` (Admin)

---

## Estadísticas Globales

### Obtener resumen de estadísticas
```
GET /api/trpc/stats.summary
```

**Respuesta:**
```json
{
  "result": {
    "data": {
      "totalInstalaciones": 8,
      "totalEstructuras": 5,
      "totalObjetos": 5,
      "totalCriaturas": 6,
      "totalItems": 24,
      "rarezaDistribution": {
        "legendario": 4,
        "epico": 6,
        "raro": 8,
        "comun": 6
      }
    }
  }
}
```

---

## Códigos de Error

| Código | Descripción |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Autenticación requerida |
| 403 | Forbidden - Permisos insuficientes (requiere admin) |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

---

## Tipos de Rareza

- `legendario` - Ítems más poderosos
- `epico` - Ítems muy poderosos
- `raro` - Ítems moderadamente poderosos
- `comun` - Ítems básicos

---

## Integración con Videojuego

### Ejemplo en JavaScript/TypeScript

```typescript
// Obtener todas las instalaciones
const instalaciones = await fetch('/api/trpc/instalaciones.list')
  .then(r => r.json())
  .then(d => d.result.data);

// Obtener una criatura específica
const criatura = await fetch('/api/trpc/criaturas.getById?input={"id":"shai-hulud-001"}')
  .then(r => r.json())
  .then(d => d.result.data);

// Crear una nueva instalación (requiere autenticación)
const nueva = await fetch('/api/trpc/instalaciones.create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    id: 'nueva-001',
    nombre: 'Nueva Instalación',
    // ... resto de datos
  })
})
  .then(r => r.json())
  .then(d => d.result.data);
```

---

## Notas Importantes

1. **Autenticación**: Los endpoints de creación, actualización y eliminación requieren que el usuario esté autenticado como administrador.

2. **Validación**: Todos los datos se validan con Zod antes de ser procesados.

3. **Base de Datos**: Los datos se persisten en una base de datos MySQL/TiDB.

4. **CORS**: La API está configurada para aceptar solicitudes desde el frontend.

5. **Rate Limiting**: No hay límite de velocidad implementado actualmente, pero se puede añadir si es necesario.

---

## Próximas Mejoras

- [ ] Documentación Swagger/OpenAPI
- [ ] Búsqueda avanzada y filtrado
- [ ] Paginación de resultados
- [ ] Caché de respuestas
- [ ] Webhooks para eventos de juego
- [ ] Sistema de transacciones para compra/venta de ítems
- [ ] Historial de cambios
- [ ] Exportación de datos (JSON, CSV)

---

**Versión**: 1.0.0  
**Última actualización**: 2026-04-13  
**Autor**: DUNE DOMINION Development Team
