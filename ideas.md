# Ideas de Diseño - DUNE Dominion: Catálogo de Ítems

## Contexto del Proyecto
Catálogo web de todos los ítems del videojuego Dune Dominion: instalaciones/edificios y criaturas del desierto de Arrakis. Debe seguir el estilo visual del dominio de criaturas existente (dunepixart).

---

<response>
<probability>0.07</probability>
<idea>

**Design Movement:** Desert Brutalism meets Sci-Fi Codex — inspirado en los archivos militares Harkonnen y los manuscritos Fremen

**Core Principles:**
1. Arquitectura asimétrica con bloques de información densos, como fichas de campo militares
2. Tipografía monoespaciada para datos técnicos, serif pesado para títulos
3. Paleta de arena quemada, óxido y negro profundo con destellos de especia dorada
4. Pixel art como elemento central, no decorativo — las imágenes son protagonistas

**Color Philosophy:**
- Fondo: `#0d0a06` (negro arena)
- Superficie de tarjetas: `#1a1208` (tierra quemada)
- Acento primario: `#c8860a` (especia dorada)
- Acento secundario: `#8b4513` (óxido desértico)
- Texto principal: `#e8d5a3` (pergamino)
- Texto secundario: `#7a6a4f` (arena apagada)
- Peligro/Rareza Legendaria: `#ff4500` (fuego del desierto)

**Layout Paradigm:**
Grid asimétrico de 3 columnas con sidebar izquierdo fijo para filtros. Las tarjetas de ítems tienen proporciones variables — los legendarios ocupan 2 columnas. Header con franja horizontal de textura de arena.

**Signature Elements:**
1. Líneas de escaneo horizontales sutiles sobre las imágenes pixel art (efecto CRT retro)
2. Bordes de tarjetas con esquinas cortadas en diagonal (clip-path) estilo Harkonnen
3. Barras de estadísticas con gradiente arena→especia

**Interaction Philosophy:**
Hover revela información adicional con un efecto de "desenterrar" — la tarjeta se eleva y aparece una capa de datos. Click abre un modal de ficha técnica completa.

**Animation:**
- Entrada de tarjetas: fade + slide-up escalonado (stagger 50ms)
- Hover: scale(1.03) + sombra dorada difusa
- Modal: expand desde el centro con blur de fondo
- Barras de stats: fill animado al entrar en viewport

**Typography System:**
- Títulos: `Cinzel` (serif romano, evoca antigüedad galáctica)
- Datos técnicos: `Space Mono` (monoespaciado sci-fi)
- Cuerpo: `Crimson Pro` (serif legible para descripciones largas)
- Jerarquía: 48px título hero → 24px nombre ítem → 14px datos → 12px etiquetas

</idea>
</response>

<response>
<probability>0.05</probability>
<idea>

**Design Movement:** Fremen Holographic Interface — terminales de navegación Bene Gesserit

**Core Principles:**
1. Fondo oscuro con partículas de arena flotantes animadas
2. Tarjetas translúcidas con efecto glassmorphism arena
3. Iconografía geométrica inspirada en los patrones tribales Fremen
4. Datos presentados como readouts de escáner holográfico

**Color Philosophy:**
- Fondo: gradiente `#050302` → `#0f0a05`
- Glassmorphism: `rgba(200, 134, 10, 0.08)` con blur
- Acento: `#f0a500` (melange luminosa)
- Borde: `rgba(240, 165, 0, 0.3)`
- Texto: `#ffd580` (luz holográfica)

**Layout Paradigm:**
Grid masonry fluido sin columnas fijas. Los ítems se organizan por rareza de forma orgánica. Sidebar derecho con filtros flotantes.

**Signature Elements:**
1. Partículas de arena animadas en el fondo (canvas)
2. Efecto de "escaneo" al cargar cada tarjeta
3. Líneas de datos que "se escriben" al hacer hover

**Interaction Philosophy:**
Interfaz de terminal — todo parece un sistema de información militar en tiempo real.

**Animation:**
- Partículas de arena: movimiento browniano lento
- Tarjetas: typewriter effect en los datos al hover
- Transiciones: glitch effect sutil

**Typography System:**
- Títulos: `Orbitron` (futurista)
- Cuerpo: `Share Tech Mono` (terminal)
- Datos: `Courier Prime`

</idea>
</response>

<response>
<probability>0.08</probability>
<idea>

**Design Movement:** Imperial Arrakis Archive — biblioteca de la Casa Atreides

**Core Principles:**
1. Estética de enciclopedia galáctica ilustrada, como el Codex Imperialis
2. Columnas de texto con márgenes amplios y notas al margen
3. Ilustraciones pixel art enmarcadas como grabados científicos
4. Navegación lateral tipo índice de libro

**Color Philosophy:**
- Fondo: `#f5e6c8` (pergamino antiguo)
- Tarjetas: `#ede0c4` (papel envejecido)
- Acento: `#8b1a1a` (tinta imperial)
- Texto: `#2c1810` (tinta oscura)
- Detalles: `#c8860a` (dorado especia)

**Layout Paradigm:**
Layout de doble columna tipo revista académica. Sidebar izquierdo con índice. Contenido principal con tipografía editorial.

**Signature Elements:**
1. Ornamentos tipográficos en esquinas de tarjetas
2. Sellos de facción (Atreides, Harkonnen, Fremen)
3. Números de referencia estilo enciclopedia

**Interaction Philosophy:**
Consulta de archivo — deliberada, informativa, sin prisa.

**Animation:**
- Page turn effect en navegación
- Hover: subrayado estilo pluma
- Fade suave en transiciones

**Typography System:**
- Títulos: `Playfair Display` (editorial clásico)
- Cuerpo: `Lora` (serif legible)
- Datos: `EB Garamond`

</idea>
</response>

---

## Diseño Elegido: Desert Brutalism meets Sci-Fi Codex (Respuesta 1)

**Justificación:** Este enfoque captura mejor la dualidad del juego — la brutalidad del desierto de Arrakis y la tecnología avanzada de las facciones. El pixel art destaca como protagonista sobre fondos oscuros, las barras de estadísticas son funcionales y visualmente impactantes, y la tipografía mixta (Cinzel + Space Mono) crea una identidad única que no es genérica.
