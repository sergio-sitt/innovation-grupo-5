import { useMemo, useState } from "react";
import {
  MapPin,
  FileText,
  Users,
  CheckCircle2,
  Camera,
  History,
  PhoneCall,
} from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FadeUp } from "@/components/motion";
import ViaMap from "@/components/ViaMap";
import Filters from "@/components/Filters";
import { useApp } from "@/state/store";
import { ESTADOS_ALERTA, EQUIPOS, tiempoDesde } from "@/data/mock";

const ORDEN = { critica: 0, advertencia: 1, activa: 2, resuelta: 3 };

export default function Alertas() {
  const { alertas, setAlertas } = useApp();
  const [fecha, setFecha] = useState("hoy");
  const [tramo, setTramo] = useState("todos");
  const [estado, setEstado] = useState("todas");
  const [selectedId, setSelectedId] = useState(null);
  const [focusPoint, setFocusPoint] = useState(null);
  const [detalle, setDetalle] = useState(null);
  const [asignar, setAsignar] = useState(null);

  const filtradas = useMemo(
    () =>
      alertas
        .filter((a) => estado === "todas" || a.estado === estado)
        .filter((a) => tramo === "todos" || a.tramoId === tramo)
        .sort((a, b) => ORDEN[a.estado] - ORDEN[b.estado] || a.minutos - b.minutos),
    [alertas, estado, tramo]
  );

  const verEnMapa = (a) => {
    setSelectedId(a.id);
    setFocusPoint({ x: a.x, y: a.y, nonce: Date.now() });
    document.getElementById("alertas-map-anchor")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const asignarEquipo = (equipo) => {
    setAlertas((prev) => prev.map((a) => (a.id === asignar.id ? { ...a, asignado: equipo } : a)));
    toast.success(`${equipo} asignado a ${asignar.evento} · ${asignar.via} ${asignar.zona}`);
    setAsignar(null);
  };

  const estadoVia = alertas.some((a) => a.estado === "critica")
    ? "critica"
    : alertas.some((a) => a.estado === "advertencia")
    ? "advertencia"
    : "normal";

  return (
    <div className="space-y-6" data-testid="alertas-page">
      <FadeUp>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.26em] text-red-400">
              <span className="blink-dot h-1.5 w-1.5 rounded-full bg-red-500" /> Actualización automática activa
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-50">Centro de Alertas</h1>
            <p className="mt-1 text-sm text-slate-400">Monitoreo en tiempo real de incidentes viales</p>
          </div>
          <Filters
            fecha={fecha}
            setFecha={setFecha}
            tramo={tramo}
            setTramo={setTramo}
            estado={estado}
            setEstado={setEstado}
          />
        </div>
      </FadeUp>

      <FadeUp delay={0.08}>
        <div id="alertas-map-anchor" className="glass-card p-5" data-testid="alertas-map-card">
          <h3 className="mb-4 font-display text-base font-semibold text-slate-100">Mapa en Tiempo Real</h3>
          <ViaMap
            incidentes={filtradas}
            selectedId={selectedId}
            onSelect={setSelectedId}
            estadoVia={estadoVia}
            focusPoint={focusPoint}
            height="h-[380px]"
            testId="alertas-map"
          />
        </div>
      </FadeUp>

      <FadeUp delay={0.14}>
        <div className="glass-card overflow-hidden" data-testid="alertas-table-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-sm">
              <thead className="border-b border-slate-800 bg-slate-950/50">
                <tr>
                  {["Vía", "Peaje", "Tipo de Evento", "Zona de Observación", "Estado", "Acciones Rápidas"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtradas.map((a) => {
                  const est = ESTADOS_ALERTA[a.estado];
                  const selected = selectedId === a.id;
                  return (
                    <tr
                      key={a.id}
                      data-testid={`alerta-row-${a.id}`}
                      onClick={() => setSelectedId(a.id)}
                      className={`cursor-pointer border-b border-slate-800/60 transition-colors duration-200 ${
                        selected ? "shadow-[inset_3px_0_0_#2563EB]" : "hover:bg-slate-800/40"
                      }`}
                      style={{ backgroundColor: selected ? "rgba(37,99,235,0.12)" : est.bg }}
                    >
                      <td className="px-4 py-3 font-medium text-slate-100">{a.via}</td>
                      <td className="px-4 py-3 text-xs text-slate-400">{a.peaje}</td>
                      <td className="px-4 py-3 text-slate-200">{a.evento}</td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-400">{a.zona}</td>
                      <td className="px-4 py-3">
                        <span className="badge-tactical" style={{ backgroundColor: `${est.color}22`, color: est.color }}>
                          {a.estado === "resuelta" ? <CheckCircle2 size={11} /> : <span className="blink-dot h-1.5 w-1.5 rounded-full" style={{ backgroundColor: est.color }} />}
                          {est.label}
                        </span>
                        <p className="mt-1 font-mono text-[9px] text-slate-500">{tiempoDesde(a.minutos)}</p>
                        {a.asignado && <p className="mt-0.5 font-mono text-[9px] text-blue-400">→ {a.asignado}</p>}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            data-testid={`alerta-ver-mapa-${a.id}`}
                            onClick={() => verEnMapa(a)}
                            className="flex items-center gap-1 rounded-[6px] border border-slate-700 bg-slate-900/70 px-2 py-1 text-[10px] font-medium text-slate-300 transition-colors hover:border-blue-500 hover:text-blue-300"
                          >
                            <MapPin size={11} /> Ver Mapa
                          </button>
                          <button
                            data-testid={`alerta-detalles-${a.id}`}
                            onClick={() => setDetalle(a)}
                            className="flex items-center gap-1 rounded-[6px] border border-slate-700 bg-slate-900/70 px-2 py-1 text-[10px] font-medium text-slate-300 transition-colors hover:border-violet-500 hover:text-violet-300"
                          >
                            <FileText size={11} /> Detalles
                          </button>
                          {a.estado !== "resuelta" && (
                            <button
                              data-testid={`alerta-asignar-${a.id}`}
                              onClick={() => setAsignar(a)}
                              className="flex items-center gap-1 rounded-[6px] border border-slate-700 bg-slate-900/70 px-2 py-1 text-[10px] font-medium text-slate-300 transition-colors hover:border-emerald-500 hover:text-emerald-300"
                            >
                              <Users size={11} /> Asignar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </FadeUp>

      <Dialog open={Boolean(detalle)} onOpenChange={(o) => !o && setDetalle(null)}>
        <DialogContent className="border-slate-700 bg-[#0F172A] text-slate-100" data-testid="alerta-detalle-modal">
          {detalle && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-lg text-slate-50">{detalle.evento}</DialogTitle>
                <DialogDescription className="text-slate-400">
                  {detalle.via} · {detalle.peaje} · {detalle.zona}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-[8px] border border-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1516319915504-015b432d407c?auto=format&fit=crop&q=80&w=900"
                    alt="Vista de cámara CCTA del sector"
                    className="h-40 w-full object-cover opacity-80"
                  />
                  <span className="absolute left-2 top-2 flex items-center gap-1.5 rounded-[6px] bg-black/70 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-red-400">
                    <Camera size={11} /> CCTA en vivo
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-[8px] border border-slate-800 bg-slate-950/50 p-3">
                    <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-slate-500"><History size={11} /> Historial</p>
                    <p className="mt-1.5 text-slate-300">Detectada {tiempoDesde(detalle.minutos)}</p>
                    <p className="text-slate-500">Validada por operador CCTA</p>
                  </div>
                  <div className="rounded-[8px] border border-slate-800 bg-slate-950/50 p-3">
                    <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-slate-500"><PhoneCall size={11} /> Respuesta</p>
                    <p className="mt-1.5 text-slate-300">Línea SOS: #767</p>
                    <p className="text-slate-500">{detalle.asignado || "Sin equipo asignado"}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(asignar)} onOpenChange={(o) => !o && setAsignar(null)}>
        <DialogContent className="border-slate-700 bg-[#0F172A] text-slate-100" data-testid="alerta-asignar-modal">
          {asignar && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-lg text-slate-50">Asignar a Equipo</DialogTitle>
                <DialogDescription className="text-slate-400">
                  {asignar.evento} · {asignar.via} {asignar.zona}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2">
                {EQUIPOS.map((eq) => (
                  <button
                    key={eq}
                    data-testid={`asignar-equipo-${eq.replace(/\s+/g, "-").toLowerCase()}`}
                    onClick={() => asignarEquipo(eq)}
                    className="flex w-full items-center gap-3 rounded-[8px] border border-slate-800 bg-slate-950/50 px-4 py-3 text-left text-sm text-slate-200 transition-all hover:border-emerald-500 hover:bg-emerald-500/10"
                  >
                    <Users size={15} className="text-emerald-400" /> {eq}
                  </button>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
