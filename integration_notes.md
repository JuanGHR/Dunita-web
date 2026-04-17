# Notas de integración

## Web base en producción
- La URL base muestra una aplicación de catálogo con pestañas, no una landing con scroll.
- El botón visible es `CRIATURAS (6)` y actualmente funciona como cambio de pestaña interna, no como enlace externo.
- El contenido actual de esa pestaña, según el código base, se renderiza con `CriaturaCard` sobre una cuadrícula.
- Además, existe un footer condicional dentro de la pestaña de criaturas que enlaza a la web secundaria; ese bloque debe eliminarse o sustituirse porque el usuario exige que no redirija a otra página.

## Web secundaria a integrar
- La web secundaria es un bestiario interactivo con tres categorías: `ARRAKIS`, `DOMINION` y `DISTRIBUIR`.
- Cada categoría muestra criaturas con imagen pixel art, nombre, subtítulo, tipo, tamaño, hábitat, descripción y significancia.
- La experiencia principal usa navegación interna por categorías y botones `ANTERIOR` / `SIGUIENTE` para recorrer todas las criaturas dentro de la misma página.
- Las imágenes se obtienen desde un mapa `creatureImages` en `CreatureDisplay.tsx`.

## Restricción de implementación
- Solo debe alterarse el contenido del apartado de criaturas dentro de la app base.
- No deben cambiarse header, resto de pestañas, footer global ni el diseño general fuera de esa sección.
