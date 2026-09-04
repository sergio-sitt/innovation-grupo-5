import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import {
  DoorOpen,
  Fuel,
  UtensilsCrossed,
  Cctv,
  Radio,
  Plus,
  Minus,
  Maximize2,
  MapPin,
} from "lucide-react";
import { POIS, ESTADOS_ALERTA } from "@/data/mock";

const CAPAS = [
  { id: "peaje", label: "Peajes", color: "#2563EB", Icon: DoorOpen },
  { id: "gas", label: "Gasolineras", color: "#F59E0B", Icon: Fuel },
  { id: "restaurante", label: "Restaurantes", color: "#22C55E", Icon: UtensilsCrossed },
  { id: "camara", label: "Cámaras", color: "#7C3AED", Icon: Cctv },
  { id: "sensor", label: "Sensores", color: "#3B82F6", Icon: Radio },
  { id: "incidente", label: "Alertas", color: "#EF4444", Icon: MapPin },
];

const toPct = (x, y) => ({ left: `${(x / 8).toFixed(2)}%`, top: `${(y / 4.6).toFixed(2)}%` });

export default function ViaMap({
  incidentes = [],
  selectedId = null,
  onSelect = () => {},
  estadoVia = "normal",
  focusPoint = null,
  height = "h-[430px]",
  mostrarCapas = true,
  testId = "via-map",
}) {
  const [activas, setActivas] = useState(() => CAPAS.map((c) => c.id));
  const [hovered, setHovered] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  useEffect(() => {
    if (!focusPoint) return;
    animate(scale, 1.7, { duration: 0.7, ease: [0.22, 1, 0.36, 1] });
    animate(x, -(focusPoint.x / 8 - 50) * 8, { duration: 0.7, ease: [0.22, 1, 0.36, 1] });
    animate(y, -(focusPoint.y / 4.6 - 50) * 4.6, { duration: 0.7, ease: [0.22, 1, 0.36, 1] });
  }, [focusPoint, x, y, scale]);

  const roadColor = useMemo(() => {
    if (estadoVia === "critica") return "#EF4444";
    if (estadoVia === "advertencia") return "#F59E0B";
    return "#475569";
  }, [estadoVia]);

  const toggleCapa = (id) =>
    setActivas((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));

  const resetVista = () => {
    animate(scale, 1, { duration: 0.5 });
    animate(x, 0, { duration: 0.5 });
    animate(y, 0, { duration: 0.5 });
  };

  const zoom = (dir) => animate(scale, Math.min(2.6, Math.max(0.9, scale.get() + dir * 0.3)), { duration: 0.35 });

  const markerBase =
    "absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-200 hover:scale-125";

  return (
    <div data-testid={testId} className={`relative w-full overflow-hidden rounded-[12px] bg-[#0B1222] ${height}`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(51,65,85,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(51,65,85,0.35) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="radar-sweep pointer-events-none absolute left-1/2 top-1/2 h-[160%] w-[160%] -translate-x-1/2 -translate-y-1/2 rounded-full" />

      <motion.div drag dragMomentum={false} style={{ x, y, scale }} className="absolute inset-0">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 460" preserveAspectRatio="none">
          <path
            d="M -20 400 C 140 320 230 430 380 340 C 520 260 600 300 700 210 C 760 160 800 180 830 150"
            fill="none"
            stroke="#1E293B"
            strokeWidth="30"
            strokeLinecap="round"
          />
          <path
            d="M -20 400 C 140 320 230 430 380 340 C 520 260 600 300 700 210 C 760 160 800 180 830 150"
            fill="none"
            stroke={roadColor}
            strokeWidth="30"
            strokeLinecap="round"
            opacity={estadoVia === "normal" ? 0 : 0.35}
            className={estadoVia !== "normal" ? "blink-dot" : ""}
          />
          <path
            d="M -20 400 C 140 320 230 430 380 340 C 520 260 600 300 700 210 C 760 160 800 180 830 150"
            fill="none"
            stroke="#64748B"
            strokeWidth="2"
            className="road-dash"
          />
          {[100, 250, 400, 550, 700].map((kx, i) => (
            <text key={i} x={kx} y={448} fill="#475569" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="2">
              KM {i * 5 + 10}
            </text>
          ))}
        </svg>

        {POIS.filter((p) => activas.includes(p.capa)).map((p) => {
          const capa = CAPAS.find((c) => c.id === p.capa);
          return (
            <button
              key={p.id}
              data-testid={`map-poi-${p.id}`}
              className={markerBase}
              style={toPct(p.x, p.y)}
              onMouseEnter={() => setHovered(p)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelect(p.id)}
              aria-label={p.nombre}
            >
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full border shadow-lg shadow-black/50"
                style={{ backgroundColor: "#0F172A", borderColor: capa.color }}
              >
                <capa.Icon size={13} color={capa.color} strokeWidth={2.4} />
              </span>
            </button>
          );
        })}

        {activas.includes("incidente") &&
          incidentes.map((a) => {
            const est = ESTADOS_ALERTA[a.estado] || ESTADOS_ALERTA.critica;
            const selected = selectedId === a.id;
            return (
              <button
                key={a.id}
                data-testid={`map-marker-${a.id}`}
                className={markerBase}
                style={{ ...toPct(a.x, a.y), zIndex: selected ? 30 : 20 }}
                onMouseEnter={() => setHovered(a)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onSelect(a.id)}
                aria-label={a.evento || a.tipo}
              >
                <span className="relative flex items-center justify-center">
                  <span
                    className="pulse-ring absolute h-8 w-8 rounded-full"
                    style={{ backgroundColor: est.color, opacity: 0.35 }}
                  />
                  <span
                    className={`relative flex items-center justify-center rounded-full border-2 bg-[#0F172A] ${
                      selected ? "h-9 w-9 shadow-[0_0_24px_rgba(239,68,68,0.7)]" : "h-7 w-7"
                    }`}
                    style={{ borderColor: est.color }}
                  >
                    <MapPin size={selected ? 17 : 13} color={est.color} strokeWidth={2.6} />
                  </span>
                </span>
              </button>
            );
          })}
      </motion.div>

      {hovered && (
        <div
          data-testid="map-tooltip"
          className="pointer-events-none absolute z-40 max-w-[220px] rounded-[8px] border border-slate-700 bg-[#0F172A]/95 px-3 py-2 shadow-xl backdrop-blur-md"
          style={{ left: `min(${(hovered.x / 8).toFixed(1)}%, 78%)`, top: `${Math.max(hovered.y / 4.6 - 14, 4)}%` }}
        >
          <p className="font-display text-xs font-semibold text-slate-100">{hovered.nombre || hovered.evento || hovered.tipo}</p>
          <p className="mt-0.5 font-mono text-[10px] text-slate-400">
            {hovered.detalle || `${hovered.via || hovered.zona || ""} ${hovered.zona && hovered.via ? "·" : ""} ${hovered.via ? hovered.zona : ""}`}
          </p>
        </div>
      )}

      {mostrarCapas && (
        <div className="absolute left-3 top-3 z-40 flex max-w-[70%] flex-wrap gap-1.5" data-testid="map-layer-toggles">
          {CAPAS.map((c) => {
            const on = activas.includes(c.id);
            return (
              <button
                key={c.id}
                data-testid={`map-layer-toggle-${c.id}`}
                onClick={() => toggleCapa(c.id)}
                className={`flex items-center gap-1.5 rounded-[6px] border px-2 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur-md transition-all duration-200 ${
                  on
                    ? "border-slate-600 bg-slate-900/80 text-slate-200"
                    : "border-slate-800 bg-slate-950/60 text-slate-600"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: on ? c.color : "#334155" }} />
                {c.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="absolute bottom-3 right-3 z-40 flex flex-col gap-1.5">
        <button data-testid="map-zoom-in" onClick={() => zoom(1)} className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-slate-700 bg-slate-900/80 text-slate-300 backdrop-blur-md transition-colors hover:border-blue-500 hover:text-blue-400" aria-label="Acercar">
          <Plus size={15} />
        </button>
        <button data-testid="map-zoom-out" onClick={() => zoom(-1)} className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-slate-700 bg-slate-900/80 text-slate-300 backdrop-blur-md transition-colors hover:border-blue-500 hover:text-blue-400" aria-label="Alejar">
          <Minus size={15} />
        </button>
        <button data-testid="map-zoom-reset" onClick={resetVista} className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-slate-700 bg-slate-900/80 text-slate-300 backdrop-blur-md transition-colors hover:border-blue-500 hover:text-blue-400" aria-label="Restablecer vista">
          <Maximize2 size={14} />
        </button>
      </div>
    </div>
  );
}
