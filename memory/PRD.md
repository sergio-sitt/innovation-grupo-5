# PRD — Vía Segura: Plataforma de Monitoreo de Seguridad Vial en Peajes

## Problem statement (original)
Construir la plataforma "Vía Segura": monitoreo integral de seguridad vial en peajes y autopistas (Colombia, español). Login aislado split-screen, dashboard con 4 tarjetas KPI (Siniestros, Actores Viales, Recaudo, Alertas), mapa interactivo con capas (peajes, gasolineras, restaurantes, cámaras, sensores, alertas), vistas de Accidentes/Siniestros, Actores Viales y Centro de Alertas en tiempo real, filtros globales (fecha, tramo, estado), glassmorphism oscuro (#0F172A→#1E1B4B, azul #2563EB, violeta #7C3AED). Decisiones del usuario: prototipo funcional, data mock con simulación en tiempo real, sin backend.

## Arquitectura
- Frontend-only React 19 + react-router-dom 7, Tailwind + shadcn/ui, framer-motion (reveals, spring physics), lenis (scroll suave), recharts (sparkline), sonner (toasts), lucide-react (iconografía).
- Estado global en `src/state/store.jsx` (sesión mock + simulación de alertas cada 9s: nuevas alertas, resoluciones, envejecimiento de tiempos).
- Datos mock centralizados en `src/data/mock.js` (tramos, siniestros, actores, alertas, POIs del mapa, categorización vial).
- Mapa táctico propio en SVG/HTML (`src/components/ViaMap.jsx`): drag pan, zoom, capas activables, tooltips, radar sweep, pulsos por severidad, color de vía según estado.
- Backend FastAPI/MongoDB sin uso (mock frontend, decisión del usuario).

## Personas
- Operador de infraestructura vial (monitoreo en tiempo real, respuesta a alertas)
- Gestor de peajes (recaudo, flujo, categorización)
- Analista de seguridad (siniestralidad histórica, actores viales)

## Requisitos core (estáticos)
1. Login con validación, estados error/loading, credenciales fijas de prueba.
2. Dashboard: 4 KPI cards + filtros fecha/tramo + mapa + categorización vial.
3. Accidentes: mapa con marcador único + tabla sincronizada bidireccional, ordenable.
4. Actores Viales: tabla ordenable con panel lateral de detalle.
5. Alertas: mapa en tiempo real, tabla con acciones (Ver Mapa, Detalles, Asignar a Equipo), auto-actualización simulada.

## Implementado (2026-09-04)
- Login split-screen con reveal cinético línea por línea, parallax de imagen, capítulos numerados 01/02/03, marquee editorial, error inline y loading con spinner.
- Layout persistente: sidebar (Inicio, Mapa, Alertas con badge live, Operación colapsable), header con breadcrumb, reloj COT en vivo y menú de usuario con logout.
- Dashboard completo: ticker marquee EN VIVO, 4 KPIs (sparkline, barras de flujo, recaudo COP con jitter en vivo, feed de alertas), mapa interactivo con capas y categorización vial por tramo.
- Vista Accidentes: foco/zoom al siniestro seleccionado, sync tabla↔mapa, ordenamiento por columnas.
- Vista Actores: tabla ordenable con gauge de riesgo y Sheet de detalle.
- Centro de Alertas: filtros fecha/tramo/estado, mapa live, modales de Detalles (cámara CCTA, historial, contacto SOS) y Asignar a Equipo con toast de confirmación; simulación agrega/resuelve alertas cada ~9s con toasts.
- Verificado: login error/éxito, dashboard, alertas (focus, modales, asignación), accidentes (selección), actores (panel). Capturas OK.

## Credenciales de prueba
- Usuario: `operador` / Contraseña: `via2026` (mock frontend, ver /app/memory/test_credentials.md)

## Backlog priorizado
- P0: nada bloqueante pendiente.
- P1: Reportes (generador PDF/Excel de recaudo y siniestralidad), Análisis Histórico con gráficas de tendencia.
- P1: Calendario con rango de fechas real (react-day-picker ya instalado) en lugar de presets.
- P2: Sonido de alerta crítica con toggle, modo tablet con sidebar contraíble automático, backend real (FastAPI + MongoDB + WebSockets) reemplazando la simulación.
- P2: Recuperación de contraseña y gestión de usuarios (fuera de scope actual de la spec).

## Próximas tareas
1. Vista Reportes con exportación.
2. Análisis Histórico (tendencias por tramo/actor).
3. Selector de rango de fechas con calendario.
