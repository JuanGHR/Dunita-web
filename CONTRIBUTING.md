# Guía de Contribución - DUNE DOMINION

¡Gracias por tu interés en contribuir a DUNE DOMINION! Este documento proporciona directrices para contribuir al proyecto.

## Cómo Contribuir

### Reportar Bugs

Si encuentras un bug, por favor crea un issue con:

1. **Título descriptivo** del problema
2. **Descripción detallada** de qué salió mal
3. **Pasos para reproducir** el error
4. **Comportamiento esperado** vs **comportamiento actual**
5. **Capturas de pantalla** si es relevante
6. **Información del sistema** (SO, navegador, versión de Node.js)

### Sugerir Mejoras

Para sugerir una mejora:

1. Usa un **título descriptivo**
2. Proporciona una **descripción clara** de la mejora
3. Explica **por qué** sería útil
4. Lista **ejemplos** de cómo funcionaría

### Pull Requests

1. **Fork el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/dune-items-catalog.git
   cd dune-items-catalog
   ```

2. **Crea una rama para tu feature**
   ```bash
   git checkout -b feature/tu-feature-name
   ```

3. **Realiza tus cambios**
   - Sigue el estilo de código existente
   - Asegúrate de que el código está bien formateado
   - Añade comentarios donde sea necesario

4. **Ejecuta tests**
   ```bash
   pnpm test
   ```

5. **Commit tus cambios**
   ```bash
   git commit -m "Descripción clara de los cambios"
   ```

6. **Push a tu rama**
   ```bash
   git push origin feature/tu-feature-name
   ```

7. **Abre un Pull Request**
   - Describe qué cambios hiciste
   - Explica por qué son necesarios
   - Referencia issues relacionados

## Estándares de Código

### TypeScript

- Usa **tipos explícitos** siempre que sea posible
- Evita `any` a menos que sea absolutamente necesario
- Usa **interfaces** para objetos complejos

### React

- Usa **componentes funcionales** con hooks
- Mantén los componentes **pequeños y enfocados**
- Usa **nombres descriptivos** para componentes y props

### Formato

- Usa **Prettier** para formatear código
  ```bash
  pnpm format
  ```
- Ejecuta **linting**
  ```bash
  pnpm lint
  ```

## Estructura de Commits

Usa mensajes de commit descriptivos:

```
feat: Añade nueva funcionalidad de búsqueda
fix: Corrige bug en la validación de datos
docs: Actualiza documentación de API
style: Formatea código según Prettier
refactor: Refactoriza componente ItemCard
test: Añade tests para autenticación
chore: Actualiza dependencias
```

## Proceso de Revisión

1. **Revisión automática**: Los tests y linting se ejecutan automáticamente
2. **Revisión manual**: Un mantenedor revisará tu código
3. **Cambios solicitados**: Si se necesitan cambios, los indicaremos
4. **Aprobación y merge**: Una vez aprobado, tu PR será mergeado

## Desarrollo Local

### Requisitos

- Node.js 22+
- pnpm 10+
- MySQL/TiDB

### Setup

```bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env
# Edita .env con tu configuración

# Crear base de datos
pnpm db:push

# Cargar datos iniciales
node scripts/seed-db.mjs

# Iniciar servidor de desarrollo
pnpm dev
```

### Testing

```bash
# Ejecutar tests
pnpm test

# Tests en modo watch
pnpm test:watch

# Cobertura de tests
pnpm test:coverage
```

## Documentación

Si añades una nueva característica, por favor:

1. Actualiza el **README.md** si es relevante
2. Añade documentación en **API_DOCUMENTATION.md** si es un endpoint
3. Actualiza el **Manual del Jugador** si afecta la jugabilidad
4. Incluye **comentarios en el código** para lógica compleja

## Preguntas

Si tienes preguntas:

1. Revisa la **documentación existente**
2. Busca en **issues cerrados** por respuestas similares
3. Abre un **issue de discusión** si no encuentras respuesta

## Código de Conducta

Por favor, sé respetuoso con otros contribuyentes. Esperamos:

- **Comunicación respetuosa** en todos los comentarios
- **Actitud de ayuda** hacia otros
- **Aceptación de crítica constructiva**
- **Inclusión** de todas las perspectivas

## Licencia

Al contribuir, aceptas que tu código será licenciado bajo la licencia MIT del proyecto.

---

¡Gracias por contribuir a DUNE DOMINION! 🎮✨
