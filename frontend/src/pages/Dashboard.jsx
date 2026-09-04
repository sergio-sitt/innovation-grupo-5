import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CarFront,
  Users,
  CircleDollarSign,
  Siren,
  ArrowUpRight,
  TrendingDown,
  Activity,
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { FadeUp } from "@/components/motion";
import { Ticker } from "@/components/Ticker";
import ViaMap from "@/components/ViaMap";
import Filters from "@/components/Filters";
import { useApp } from "@/state/store";
import {
  CATEGORIZACION,
  SPARK_SINIESTROS,
  FLUJO_ACTORES,
  TICKER_ITEMS,
  ESTADOS_ALERTA,
  fmt,
  tiempoDesde,
} from "@/data/mock";

const CATEGORIA_LABELS = [
  ["municipio", "Municipio / Región"],
  ["tramo", "Tramo"],
  ["km", "Kilómetros de vía"],
  ["peajes", "Cantidad de peajes"],
  ["carriles", "Carriles"],
  ["velocidad", "Velocidad máxima"],
  ["tipo", "Tipo de vía"],
  ["pavimento", "Estado de pavimento"],
  ["iluminacion", "Iluminación nocturna"],
  ["horaPico", "Hora pico"],
  ["flujo", "Flujo promedio diario"],
];

export default function Dashboard() {
  const { alertas, tick } = useApp();
  const [fecha, setFecha] = useState("semana");
  const [tramo, setTramo] = useState("norte-15-22");

  const cat = CATEGORIZACION[tramo] || CATEGORIZACION["norte-15-22"];
  const flujo = 142850 + ((tick * 137) % 900);
  const recaudo = 1845200000 + ((tick * 42130) % 9000000);
  const transacciones = 96430 + ((tick * 29) % 640);

  const incidentes = useMemo(
    () =>
      alertas
        .filter((a) => a.estado !== "resuelta")
        .map((a) => ({ ...a })),
    [alertas]
  );

  const estadoVia = alertas.some((a) => a.estado === "critica")
    ? "critica"
    : alertas.some((a) => a.estado === "advertencia")
    ? "advertencia"
    : "normal";

  return (
    <div className="space-y-6" data-testid="dashboard-page">
      <FadeUp>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.26em] text-blue-400">
              <span className="blink-dot h-1.5 w-1.5 rounded-full bg-red-500" /> Monitoreo en tiempo real
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
              Panel de Control
            </h1>
            <p className="mt-1 text-sm text-slate-400">Monitoreo integral de seguridad vial</p>
          </div>
          <Filters fecha={fecha} setFecha={setFecha} tramo={tramo} setTramo={setTramo} />
        </div>
      </FadeUp>

      <FadeUp delay={0.08}>
        <Ticker items={TICKER_ITEMS} className="rounded-[8px]" />
      </FadeUp>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <FadeUp delay={0.1}>
          <div className="glass-card glass-card-hover h-full p-5" data-testid="dashboard-kpi-siniestros-card">
            <div className="flex items-start justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-red-500/15">
                <CarFront size={17} className="text-red-400" />
              </span>
              <span className="badge-tactical bg-emerald-500/10 text-emerald-400">
                <TrendingDown size={12} /> -18% mes
              </span>
            </div>
            <p className="mt-4 text-xs font-medium text-slate-400">Siniestros & Accidentes</p>
            <p className="mt-1 font-mono text-3xl font-bold tracking-tight text-slate-50">
              2.4<span className="text-sm font-medium text-slate-500"> /día prom.</span>
            </p>
            <div className="mt-2 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SPARK_SINIESTROS}>
                  <defs>
                    <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EF4444" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#EF4444" strokeWidth={2} fill="url(#spark)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 space-y-1 border-t border-slate-800 pt-3 text-[11px] text-slate-400">
              <p>Total incidentes: <span className="font-mono text-slate-200">48</span> · Lesionados: <span className="font-mono text-amber-400">31</span> · Fallecidos: <span className="font-mono text-red-400">4</span></p>
              <p>Tipo más frecuente: <span className="text-slate-200">Colisión</span></p>
            </div>
            <Link to="/accidentes" data-testid="kpi-siniestros-cta" className="mt-3 flex items-center gap-1 text-xs font-semibold text-blue-400 transition-colors hover:text-blue-300">
              Vista de Accidentes <ArrowUpRight size={13} />
            </Link>
          </div>
        </FadeUp>

        <FadeUp delay={0.16}>
          <div className="glass-card glass-card-hover h-full p-5" data-testid="dashboard-kpi-actores-card">
            <div className="flex items-start justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-violet-500/15">
                <Users size={17} className="text-violet-400" />
              </span>
              <span className="badge-tactical bg-blue-500/10 text-blue-400">
                <Activity size={12} /> En vivo
              </span>
            </div>
            <p className="mt-4 text-xs font-medium text-slate-400">Actores Viales · Flujo</p>
            <p className="mt-1 font-mono text-3xl font-bold tracking-tight text-slate-50">
              {fmt(flujo)}
              <span className="text-sm font-medium text-slate-500"> veh/día</span>
            </p>
            <div className="mt-3 space-y-1.5">
              {FLUJO_ACTORES.map((f) => (
                <div key={f.tipo} className="flex items-center gap-2">
                  <span className="w-28 truncate text-[10px] text-slate-400">{f.tipo}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${f.pct}%`, backgroundColor: f.color }} />
                  </div>
                  <span className="w-8 text-right font-mono text-[10px] text-slate-300">{f.pct}%</span>
                </div>
              ))}
            </div>
            <Link to="/actores" data-testid="kpi-actores-cta" className="mt-3 flex items-center gap-1 text-xs font-semibold text-blue-400 transition-colors hover:text-blue-300">
              Vista de Actores Viales <ArrowUpRight size={13} />
            </Link>
          </div>
        </FadeUp>

        <FadeUp delay={0.22}>
          <div className="glass-card glass-card-hover h-full p-5" data-testid="dashboard-kpi-recaudo-card">
            <div className="flex items-start justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-emerald-500/15">
                <CircleDollarSign size={17} className="text-emerald-400" />
              </span>
              <span className="badge-tactical bg-slate-700/40 text-slate-300">COL $</span>
            </div>
            <p className="mt-4 text-xs font-medium text-slate-400">Recaudo del período</p>
            <p className="mt-1 font-mono text-2xl font-bold tracking-tight text-slate-50">
              $ {fmt(recaudo)}
            </p>
            <div className="mt-3 space-y-1 border-t border-slate-800 pt-3 text-[11px] text-slate-400">
              <p>Transacciones: <span className="font-mono text-slate-200">{fmt(transacciones)}</span></p>
              <p>Valor promedio: <span className="font-mono text-slate-200">$ {fmt(Math.round(recaudo / transacciones))}</span></p>
              <p>Telepeaje: <span className="font-mono text-emerald-400">64%</span> · Efectivo: <span className="font-mono text-slate-200">36%</span></p>
            </div>
            <span data-testid="kpi-recaudo-cta" className="mt-3 flex cursor-pointer items-center gap-1 text-xs font-semibold text-blue-400 transition-colors hover:text-blue-300">
              Reportes de Recaudo <ArrowUpRight size={13} />
            </span>
          </div>
        </FadeUp>

        <FadeUp delay={0.28}>
          <div className="glass-card glass-card-hover h-full p-5" data-testid="dashboard-kpi-alertas-card">
            <div className="flex items-start justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-amber-500/15">
                <Siren size={17} className="text-amber-400" />
              </span>
              <span className="badge-tactical bg-red-500/15 text-red-400">
                <span className="blink-dot h-1.5 w-1.5 rounded-full bg-red-400" />
                {alertas.filter((a) => a.estado !== "resuelta").length} activas
              </span>
            </div>
            <p className="mt-4 text-xs font-medium text-slate-400">Alertas en tiempo real</p>
            <div className="mt-3 space-y-2">
              {alertas.slice(0, 4).map((a) => {
                const est = ESTADOS_ALERTA[a.estado];
                return (
                  <div key={a.id} className="flex items-center gap-2.5 rounded-[8px] border border-slate-800 bg-slate-950/40 px-2.5 py-2" data-testid={`dashboard-alert-item-${a.id}`}>
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: est.color }} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-medium text-slate-200">{a.evento}</p>
                      <p className="font-mono text-[9px] text-slate-500">{a.via} · {a.zona} · {tiempoDesde(a.minutos)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link to="/alertas" data-testid="kpi-alertas-cta" className="mt-3 flex items-center gap-1 text-xs font-semibold text-blue-400 transition-colors hover:text-blue-300">
              Centro de Alertas <ArrowUpRight size={13} />
            </Link>
          </div>
        </FadeUp>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <FadeUp delay={0.1} className="xl:col-span-2">
          <div className="glass-card p-5" data-testid="dashboard-map-card">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold text-slate-100">Mapa Interactivo de la Red</h3>
                <p className="text-xs text-slate-400">{cat.tramo} · Capas de servicios e incidentes activos</p>
              </div>
              <span className={`badge-tactical ${estadoVia === "critica" ? "bg-red-500/15 text-red-400" : estadoVia === "advertencia" ? "bg-amber-500/15 text-amber-400" : "bg-emerald-500/15 text-emerald-400"}`} data-testid="map-road-status">
                Vía {estadoVia === "normal" ? "estable" : estadoVia === "advertencia" ? "con advertencia" : "en estado crítico"}
              </span>
            </div>
            <ViaMap incidentes={incidentes} estadoVia={estadoVia} testId="dashboard-map" />
          </div>
        </FadeUp>

        <FadeUp delay={0.16}>
          <div className="glass-card h-full p-5" data-testid="dashboard-categorizacion-card">
            <h3 className="font-display text-lg font-semibold text-slate-100">Categorización Vial</h3>
            <p className="text-xs text-slate-400">Información general del tramo seleccionado</p>
            <dl className="mt-4 space-y-2.5">
              {CATEGORIA_LABELS.map(([key, label]) => (
                <div key={key} className="flex items-start justify-between gap-3 border-b border-slate-800/70 pb-2 last:border-0" data-testid={`categoria-${key}`}>
                  <dt className="text-[11px] text-slate-500">{label}</dt>
                  <dd className="text-right font-mono text-[11px] font-medium text-slate-200">{cat[key]}</dd>
                </div>
              ))}
            </dl>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
