import { useState } from "react";
import { FadeUp } from "@/components/motion";
import ViaMap from "@/components/ViaMap";
import Filters from "@/components/Filters";
import { useApp } from "@/state/store";

export default function MapaView() {
  const { alertas } = useApp();
  const [fecha, setFecha] = useState("hoy");
  const [tramo, setTramo] = useState("todos");

  const estadoVia = alertas.some((a) => a.estado === "critica")
    ? "critica"
    : alertas.some((a) => a.estado === "advertencia")
    ? "advertencia"
    : "normal";

  return (
    <div className="space-y-6" data-testid="mapa-page">
      <FadeUp>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-blue-400">Vista central de vía</p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-50">Mapa de Red</h1>
            <p className="mt-1 text-sm text-slate-400">
              Peajes, servicios, cámaras, sensores e incidentes en un solo lienzo táctico
            </p>
          </div>
          <Filters fecha={fecha} setFecha={setFecha} tramo={tramo} setTramo={setTramo} />
        </div>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div className="glass-card p-5">
          <ViaMap
            incidentes={alertas}
            estadoVia={estadoVia}
            height="h-[560px]"
            testId="mapa-full-map"
          />
        </div>
      </FadeUp>
    </div>
  );
}
