import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { ALERTAS_SEED, NUEVAS_ALERTAS_POOL } from "@/data/mock";

const AppCtx = createContext(null);

export const CREDENCIALES = { usuario: "operador", clave: "via2026" };

export function AppProvider({ children }) {
  const [sesion, setSesion] = useState(() => localStorage.getItem("vs_sesion") === "1");
  const [alertas, setAlertas] = useState(ALERTAS_SEED);
  const [tick, setTick] = useState(0);

  const login = useCallback((usuario, clave) => {
    if (usuario.trim().toLowerCase() === CREDENCIALES.usuario && clave === CREDENCIALES.clave) {
      localStorage.setItem("vs_sesion", "1");
      setSesion(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("vs_sesion");
    setSesion(false);
  }, []);

  useEffect(() => {
    if (!sesion) return undefined;
    const id = setInterval(() => {
      setTick((t) => t + 1);
      const roll = Math.random();
      if (roll < 0.42) {
        const plantilla = NUEVAS_ALERTAS_POOL[Math.floor(Math.random() * NUEVAS_ALERTAS_POOL.length)];
        const nueva = {
          ...plantilla,
          id: `AL-${Math.floor(1000 + Math.random() * 9000)}`,
          minutos: 0,
          x: plantilla.x + (Math.random() * 30 - 15),
          y: plantilla.y + (Math.random() * 20 - 10),
        };
        setAlertas((prev) => [nueva, ...prev].slice(0, 14));
        if (nueva.estado === "critica") {
          toast.error(`Nueva alerta crítica: ${nueva.evento} en ${nueva.via} ${nueva.zona}`);
        } else {
          toast.info(`Nueva novedad: ${nueva.evento} en ${nueva.via} ${nueva.zona}`);
        }
      } else if (roll < 0.72) {
        setAlertas((prev) => {
          const idx = prev.findIndex((a) => a.estado === "critica" || a.estado === "advertencia");
          if (idx === -1) return prev.map((a) => ({ ...a, minutos: a.minutos + 2 }));
          return prev.map((a, i) =>
            i === idx
              ? { ...a, estado: "resuelta", minutos: a.minutos + 2 }
              : { ...a, minutos: a.minutos + 2 }
          );
        });
      } else {
        setAlertas((prev) => prev.map((a) => ({ ...a, minutos: a.minutos + 3 })));
      }
    }, 9000);
    return () => clearInterval(id);
  }, [sesion]);

  return (
    <AppCtx.Provider value={{ sesion, login, logout, alertas, setAlertas, tick }}>
      {children}
    </AppCtx.Provider>
  );
}

export const useApp = () => useContext(AppCtx);
