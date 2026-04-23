# JITA — Sitio estático (HTML + CSS + Tailwind CDN + JS puro)

Versión estática del sitio **Jesus Is The Answer LLC**, sin React ni build step.

## Cómo correrlo

Solo abre `index.html` en el navegador. Para que algunas funciones (como recargas y rutas) anden bien, recomendado servirlo con un mini-servidor:

```bash
# Opción 1 (Python)
python3 -m http.server 8080

# Opción 2 (Node)
npx serve .
```

Luego visita `http://localhost:8080`.

## Archivos

- `index.html` — Inicio (hero, próxima misión, servicios, CTA, misiones recientes)
- `quienes-somos.html` — Historia, visión, valores, pilares (carrusel) y equipo
- `equipo.html` — Líderes, misioneros, impacto, CTA
- `misiones.html` — Próxima misión, filtro por país, listado
- `mision-detalle.html?id=N` — Detalle por misión
- `tienda.html` — "Próximamente"
- `styles.css` — Tokens, animaciones, componentes (botones, cards, modal, carrusel, toast)
- `script.js` — Navbar/Footer compartidos, i18n, modal, toast, carrusel, scroll reveal
- `translations.js` — Diccionarios ES / EN
- `application-form.js` — Modal del formulario de aplicación
- `missions-data.js` — Datos mock de misiones
- `assets/jita-logo.png` — Logo

## Idiomas

Selector ES / EN en la navbar. La preferencia se guarda en `localStorage` (`jita.lang`).

## Animaciones

`fade-in`, `fade-in-up`, `scale-in`, `pulse-soft`, `bounce-soft`, `hover-scale`, `hover-lift`, `story-link` (subrayado), reveal en scroll, transiciones del carrusel y modales.

## Notas

- Tailwind se gestiona vía CLI. El archivo de entrada es `src/input.css` y se compila a `dist/styles.css`.
- Para desarrollar, usa `npm run dev` para observar cambios en tiempo real.
- Para producción, usa `npm run build` para minificar el CSS.
- El "router" de React fue reemplazado por archivos HTML separados.
- El form de aplicación muestra un toast de éxito (no envía datos a ningún backend).
