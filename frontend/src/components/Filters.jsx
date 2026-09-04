import { CalendarDays, Route } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TRAMOS } from "@/data/mock";

const PRESETS = [
  { id: "hoy", label: "Hoy" },
  { id: "semana", label: "Esta semana" },
  { id: "mes", label: "Este mes" },
  { id: "30d", label: "Últimos 30 días" },
];

const ESTADOS = [
  { id: "todas", label: "Todas" },
  { id: "critica", label: "Crítica" },
  { id: "advertencia", label: "Advertencia" },
  { id: "activa", label: "Activa" },
  { id: "resuelta", label: "Resuelta" },
];

export default function Filters({ fecha, setFecha, tramo, setTramo, estado, setEstado }) {
  return (
    <div
      data-testid="global-filters"
      className="glass-card flex flex-wrap items-center gap-3 px-4 py-3"
    >
      <div className="flex items-center gap-2 text-slate-400">
        <CalendarDays size={16} className="text-blue-400" />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Fecha</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            data-testid={`filter-fecha-${p.id}`}
            onClick={() => setFecha(p.id)}
            className={`rounded-[6px] border px-2.5 py-1 text-xs font-medium transition-all duration-200 ${
              fecha === p.id
                ? "border-blue-500 bg-blue-500/15 text-blue-300"
                : "border-slate-700 bg-slate-950/50 text-slate-400 hover:border-slate-500 hover:text-slate-200"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <span className="hidden h-5 w-px bg-slate-700 md:block" />

      <div className="flex items-center gap-2 text-slate-400">
        <Route size={16} className="text-violet-400" />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Tramo</span>
      </div>
      <Select value={tramo} onValueChange={setTramo}>
        <SelectTrigger
          data-testid="filter-tramo-select"
          className="input-tactical h-8 w-[220px] text-xs"
        >
          <SelectValue placeholder="Selecciona un tramo" />
        </SelectTrigger>
        <SelectContent className="border-slate-700 bg-[#0F172A] text-slate-200">
          {TRAMOS.map((t) => (
            <SelectItem
              key={t.id}
              value={t.id}
              data-testid={`filter-tramo-option-${t.id}`}
              className="text-xs focus:bg-slate-800 focus:text-slate-100"
            >
              {t.nombre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {typeof estado !== "undefined" && setEstado && (
        <>
          <span className="hidden h-5 w-px bg-slate-700 md:block" />
          <div className="flex items-center gap-2 text-slate-400">
            <span className="blink-dot h-2 w-2 rounded-full bg-red-500" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Estado</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {ESTADOS.map((e) => (
              <button
                key={e.id}
                data-testid={`filter-estado-${e.id}`}
                onClick={() => setEstado(e.id)}
                className={`rounded-[6px] border px-2.5 py-1 text-xs font-medium transition-all duration-200 ${
                  estado === e.id
                    ? "border-blue-500 bg-blue-500/15 text-blue-300"
                    : "border-slate-700 bg-slate-950/50 text-slate-400 hover:border-slate-500 hover:text-slate-200"
                }`}
              >
                {e.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
