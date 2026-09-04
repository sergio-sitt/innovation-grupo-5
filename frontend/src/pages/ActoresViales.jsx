import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Bike, CarFront, Truck, PersonStanding } from "lucide-react";

const ACTOR_ICON = {
  Bicicleta: Bike,
  "Automóvil": CarFront,
  "Camión / Transporte pesado": Truck,
  Motocicleta: Bike,
  "Peatón": PersonStanding,
};
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { FadeUp } from "@/components/motion";
import Filters from "@/components/Filters";
import { ACTORES } from "@/data/mock";

const riesgoColor = (r) => (r >= 85 ? "#EF4444" : r >= 70 ? "#F59E0B" : "#22C55E");

export default function ActoresViales() {
  const [fecha, setFecha] = useState("mes");
  const [tramo, setTramo] = useState("todos");
  const [sort, setSort] = useState({ key: "cantidad", dir: -1 });
  const [detalle, setDetalle] = useState(null);

  const ordenados = useMemo(
    () =>
      [...ACTORES].sort((a, b) => {
        const va = a[sort.key];
        const vb = b[sort.key];
        if (typeof va === "string") return va.localeCompare(vb) * sort.dir;
        return (va - vb) * sort.dir;
      }),
    [sort]
  );

  const toggleSort = (key) => setSort((s) => ({ key, dir: s.key === key ? -s.dir : -1 }));

  const Th = ({ id, children }) => (
    <th
      data-testid={`actores-sort-${id}`}
      onClick={() => toggleSort(id)}
      className="cursor-pointer select-none px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 transition-colors hover:text-slate-200"
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {sort.key === id &&
          (sort.dir === 1 ? <ArrowUp size={11} className="text-blue-400" /> : <ArrowDown size={11} className="text-blue-400" />)}
      </span>
    </th>
  );

  return (
    <div className="space-y-6" data-testid="actores-page">
      <FadeUp>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-violet-400">Operación · Analítica</p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-50">Vista de Actores Viales</h1>
            <p className="mt-1 text-sm text-slate-400">Distribución de siniestros por tipo de actor vial</p>
          </div>
          <Filters fecha={fecha} setFecha={setFecha} tramo={tramo} setTramo={setTramo} />
        </div>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div className="glass-card overflow-hidden" data-testid="actores-table-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead className="border-b border-slate-800 bg-slate-950/50">
                <tr>
                  <Th id="tipo">Tipo de Actor Vial</Th>
                  <Th id="cantidad">Cantidad</Th>
                  <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">Género</th>
                  <Th id="accidente">Tipo de Accidente</Th>
                  <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">Ubicación</th>
                  <Th id="riesgo">Nivel de Riesgo</Th>
                </tr>
              </thead>
              <tbody>
                {ordenados.map((a, i) => {
                  const Icon = ACTOR_ICON[a.tipo] || CarFront;
                  return (
                    <tr
                      key={a.id}
                      data-testid={`actor-row-${a.id}`}
                      onClick={() => setDetalle(a)}
                      className={`cursor-pointer border-b border-slate-800/60 transition-colors duration-200 ${
                        i % 2 === 0 ? "bg-[#0F172A]/40 hover:bg-slate-800/50" : "bg-[#1E293B]/30 hover:bg-slate-800/50"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5 font-medium text-slate-100">
                          <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-slate-800/70">
                            <Icon size={15} className="text-blue-400" />
                          </span>
                          {a.tipo}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-lg font-bold text-slate-50">{a.cantidad}</td>
                      <td className="px-4 py-3 text-xs text-slate-400">{a.genero}</td>
                      <td className="px-4 py-3 text-slate-300">{a.accidente}</td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-400">{a.ubicacion}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-800">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${a.riesgo}%`, backgroundColor: riesgoColor(a.riesgo) }}
                            />
                          </div>
                          <span className="font-mono text-[10px]" style={{ color: riesgoColor(a.riesgo) }}>
                            {a.riesgo}
                          </span>
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

      <Sheet open={Boolean(detalle)} onOpenChange={(o) => !o && setDetalle(null)}>
        <SheetContent className="border-slate-800 bg-[#0F172A] text-slate-100" data-testid="actor-detail-panel">
          {detalle && (
            <>
              <SheetHeader>
                <SheetTitle className="font-display text-xl text-slate-50">{detalle.tipo}</SheetTitle>
                <SheetDescription className="text-slate-400">
                  Detalle del registro · {detalle.ubicacion}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {[
                  ["Incidentes registrados", detalle.cantidad],
                  ["Distribución de género", detalle.genero],
                  ["Accidente más frecuente", detalle.accidente],
                  ["Ubicación crítica", detalle.ubicacion],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-[8px] border border-slate-800 bg-slate-950/50 p-3">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">{k}</p>
                    <p className="mt-1 font-mono text-sm font-semibold text-slate-100">{v}</p>
                  </div>
                ))}
                <div className="rounded-[8px] border border-slate-800 bg-slate-950/50 p-3">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">Nivel de riesgo</p>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full rounded-full" style={{ width: `${detalle.riesgo}%`, backgroundColor: riesgoColor(detalle.riesgo) }} />
                  </div>
                  <p className="mt-1.5 font-mono text-xs" style={{ color: riesgoColor(detalle.riesgo) }}>
                    Índice {detalle.riesgo}/100
                  </p>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
