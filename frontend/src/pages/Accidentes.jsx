import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, CarFront, Bike, Truck, PersonStanding } from "lucide-react";
import { FadeUp } from "@/components/motion";
import ViaMap from "@/components/ViaMap";
import Filters from "@/components/Filters";
import { SINIESTROS, SEVERIDADES } from "@/data/mock";

const ACTOR_ICON = {
  "Automóvil": CarFront,
  "Motocicleta": Bike,
  "Transporte pesado": Truck,
  "Peatón": PersonStanding,
  "Bicicleta": Bike,
};

const SEV_ORDER = { critica: 0, alta: 1, media: 2, baja: 3 };

export default function Accidentes() {
  const [fecha, setFecha] = useState("30d");
  const [tramo, setTramo] = useState("todos");
  const [selectedId, setSelectedId] = useState(SINIESTROS[0].id);
  const [sort, setSort] = useState({ key: "fecha", dir: 1 });

  const filtrados = useMemo(() => {
    const base = SINIESTROS.filter((s) => tramo === "todos" || s.tramoId === tramo);
    return [...base].sort((a, b) => {
      let va = a[sort.key];
      let vb = b[sort.key];
      if (sort.key === "severidad") {
        va = SEV_ORDER[a.severidad];
        vb = SEV_ORDER[b.severidad];
      }
      if (typeof va === "string") return va.localeCompare(vb) * sort.dir;
      return (va - vb) * sort.dir;
    });
  }, [tramo, sort]);

  const seleccionado = SINIESTROS.find((s) => s.id === selectedId) || filtrados[0];

  const toggleSort = (key) =>
    setSort((s) => ({ key, dir: s.key === key ? -s.dir : 1 }));

  const Th = ({ id, children, className = "" }) => (
    <th
      data-testid={`accidentes-sort-${id}`}
      onClick={() => toggleSort(id)}
      className={`cursor-pointer select-none px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 transition-colors hover:text-slate-200 ${className}`}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {sort.key === id &&
          (sort.dir === 1 ? <ArrowUp size={11} className="text-blue-400" /> : <ArrowDown size={11} className="text-blue-400" />)}
      </span>
    </th>
  );

  return (
    <div className="space-y-6" data-testid="accidentes-page">
      <FadeUp>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-red-400">Operación · Siniestralidad</p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-50">
              Vista de Accidentes y Siniestros
            </h1>
            <p className="mt-1 text-sm text-slate-400">Historial de siniestros por tramo vial</p>
          </div>
          <Filters fecha={fecha} setFecha={setFecha} tramo={tramo} setTramo={setTramo} />
        </div>
      </FadeUp>

      <FadeUp delay={0.08}>
        <div className="glass-card p-5" data-testid="accidentes-map-card">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-base font-semibold text-slate-100">
              Ubicación del siniestro {seleccionado ? `· ${seleccionado.id}` : ""}
            </h3>
            {seleccionado && (
              <span
                className="badge-tactical"
                style={{ backgroundColor: `${SEVERIDADES[seleccionado.severidad].color}22`, color: SEVERIDADES[seleccionado.severidad].color }}
                data-testid="accidentes-selected-badge"
              >
                {seleccionado.tipo} · {seleccionado.zona}
              </span>
            )}
          </div>
          <ViaMap
            incidentes={seleccionado ? [{ ...seleccionado, estado: seleccionado.severidad === "baja" || seleccionado.severidad === "media" ? "activa" : seleccionado.severidad === "alta" ? "advertencia" : "critica" }] : []}
            selectedId={seleccionado?.id}
            onSelect={setSelectedId}
            estadoVia={seleccionado?.severidad === "critica" ? "critica" : "normal"}
            focusPoint={seleccionado ? { ...seleccionado, nonce: selectedId } : null}
            mostrarCapas={false}
            height="h-[340px]"
            testId="accidentes-map"
          />
        </div>
      </FadeUp>

      <FadeUp delay={0.14}>
        <div className="glass-card overflow-hidden" data-testid="accidentes-table-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead className="border-b border-slate-800 bg-slate-950/50">
                <tr>
                  <Th id="tipo">Tipo</Th>
                  <Th id="severidad">Severidad</Th>
                  <Th id="actor">Actor Vial</Th>
                  <Th id="lesionados">Lesionados</Th>
                  <Th id="fallecidos">Fallecidos</Th>
                  <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">Causas</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((s, i) => {
                  const sev = SEVERIDADES[s.severidad];
                  const Icon = ACTOR_ICON[s.actor] || CarFront;
                  const selected = selectedId === s.id;
                  return (
                    <tr
                      key={s.id}
                      data-testid={`accident-row-${s.id}`}
                      onClick={() => setSelectedId(s.id)}
                      className={`cursor-pointer border-b border-slate-800/60 transition-colors duration-200 ${
                        selected
                          ? "bg-blue-500/15 shadow-[inset_3px_0_0_#2563EB]"
                          : i % 2 === 0
                          ? "bg-[#0F172A]/40 hover:bg-slate-800/50"
                          : "bg-[#1E293B]/30 hover:bg-slate-800/50"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 font-medium text-slate-100">
                          <Icon size={15} className="text-slate-400" /> {s.tipo}
                        </div>
                        <p className="mt-0.5 font-mono text-[9px] text-slate-600">{s.id} · {s.fecha}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="badge-tactical" style={{ backgroundColor: `${sev.color}22`, color: sev.color }}>
                          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: sev.color }} />
                          {sev.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-300">{s.actor}</td>
                      <td className="px-4 py-3 font-mono text-amber-300">{s.lesionados}</td>
                      <td className="px-4 py-3 font-mono text-red-400">{s.fallecidos}</td>
                      <td className="px-4 py-3 text-xs text-slate-400">{s.causa}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
