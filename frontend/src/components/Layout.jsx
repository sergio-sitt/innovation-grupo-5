import { useEffect, useState } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Map as MapIcon,
  Siren,
  FolderKanban,
  BarChart3,
  Settings,
  ShieldCheck,
  ChevronDown,
  LogOut,
  User,
  Menu,
  X,
  CarFront,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApp } from "@/state/store";

const BREADCRUMBS = {
  "/": "Panel de Control",
  "/mapa": "Mapa de Red",
  "/alertas": "Centro de Alertas",
  "/accidentes": "Operación · Accidentes y Siniestros",
  "/actores": "Operación · Actores Viales",
};

const Reloj = () => {
  const [hora, setHora] = useState("");
  useEffect(() => {
    const fmtHora = () =>
      setHora(
        new Date().toLocaleTimeString("es-CO", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    fmtHora();
    const id = setInterval(fmtHora, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span data-testid="header-live-clock" className="hidden font-mono text-xs tracking-[0.2em] text-slate-400 md:block">
      {hora} <span className="text-slate-600">COT</span>
    </span>
  );
};

const SidebarContent = ({ onNavigate }) => {
  const { alertas } = useApp();
  const [opOpen, setOpOpen] = useState(true);
  const activasCount = alertas.filter((a) => a.estado !== "resuelta").length;

  const linkCls = ({ isActive }) =>
    `group flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-blue-500/15 text-blue-300 shadow-[inset_2px_0_0_#2563EB]"
        : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
    }`;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-5 pb-6 pt-6">
        <span className="relative flex h-10 w-10 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#2563EB] to-[#7C3AED] shadow-lg shadow-blue-500/30">
          <ShieldCheck size={20} className="text-white" strokeWidth={2.4} />
        </span>
        <div>
          <p className="font-display text-base font-extrabold tracking-wide text-slate-50">VÍA SEGURA</p>
          <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-slate-500">Control de red vial</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3" data-testid="sidebar-nav">
        <NavLink to="/" end className={linkCls} data-testid="sidebar-nav-inicio" onClick={onNavigate}>
          <LayoutDashboard size={17} /> Inicio
        </NavLink>
        <NavLink to="/mapa" className={linkCls} data-testid="sidebar-nav-mapa" onClick={onNavigate}>
          <MapIcon size={17} /> Mapa
        </NavLink>
        <NavLink to="/alertas" className={linkCls} data-testid="sidebar-nav-alertas" onClick={onNavigate}>
          <Siren size={17} /> Alertas
          {activasCount > 0 && (
            <span
              data-testid="sidebar-alertas-badge"
              className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500/20 px-1.5 font-mono text-[10px] font-bold text-red-400"
            >
              {activasCount}
            </span>
          )}
        </NavLink>

        <button
          data-testid="sidebar-operacion-toggle"
          onClick={() => setOpOpen((o) => !o)}
          className="flex w-full items-center gap-3 rounded-[8px] px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-slate-100"
        >
          <FolderKanban size={17} /> Operación
          <ChevronDown size={14} className={`ml-auto transition-transform duration-300 ${opOpen ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence initial={false}>
          {opOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden pl-4"
            >
              <NavLink to="/accidentes" className={linkCls} data-testid="sidebar-nav-accidentes" onClick={onNavigate}>
                <CarFront size={15} /> Accidentes / Siniestros
              </NavLink>
              <NavLink to="/actores" className={linkCls} data-testid="sidebar-nav-actores" onClick={onNavigate}>
                <Users size={15} /> Actores Viales
              </NavLink>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex cursor-not-allowed items-center gap-3 rounded-[8px] px-3 py-2.5 text-sm font-medium text-slate-600" data-testid="sidebar-nav-reportes">
          <BarChart3 size={17} /> Reportes
          <span className="ml-auto rounded-[6px] border border-slate-700 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-slate-500">Pronto</span>
        </div>
        <div className="flex cursor-not-allowed items-center gap-3 rounded-[8px] px-3 py-2.5 text-sm font-medium text-slate-600" data-testid="sidebar-nav-configuracion">
          <Settings size={17} /> Configuración
        </div>
      </nav>

      <div className="border-t border-slate-800/80 p-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] leading-relaxed text-slate-600">
          Monitoreamos el riesgo para hacer las vías más seguras
        </p>
      </div>
    </div>
  );
};

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const cerrarSesion = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#1E1B4B]">
      <aside className="fixed bottom-0 left-0 top-0 z-50 hidden w-64 border-r border-slate-800/80 bg-[#0F172A]/90 backdrop-blur-2xl lg:block">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed bottom-0 left-0 top-0 z-[60] w-64 border-r border-slate-800 bg-[#0F172A] lg:hidden"
          >
            <button
              data-testid="sidebar-mobile-close"
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 text-slate-400 hover:text-slate-100"
              aria-label="Cerrar menú"
            >
              <X size={18} />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </motion.aside>
        )}
      </AnimatePresence>

      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-800/80 bg-[#0F172A]/80 pl-4 pr-4 backdrop-blur-xl lg:pl-72 lg:pr-8">
        <div className="flex items-center gap-3">
          <button
            data-testid="sidebar-mobile-open"
            onClick={() => setMobileOpen(true)}
            className="text-slate-300 lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu size={20} />
          </button>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-slate-500">Vía Segura /</p>
            <p data-testid="header-breadcrumb" className="font-display text-sm font-semibold text-slate-100">
              {BREADCRUMBS[location.pathname] || "Panel de Control"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Reloj />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                data-testid="header-user-menu"
                className="flex items-center gap-2.5 rounded-full border border-slate-700 bg-slate-900/60 py-1 pl-1 pr-3 transition-colors hover:border-blue-500"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] font-display text-xs font-bold text-white">
                  OP
                </span>
                <span className="hidden text-xs font-medium text-slate-300 sm:block">Operador Red</span>
                <ChevronDown size={13} className="text-slate-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 border-slate-700 bg-[#0F172A] text-slate-200">
              <DropdownMenuItem data-testid="user-menu-perfil" className="gap-2 text-xs focus:bg-slate-800">
                <User size={14} /> Mi Perfil
              </DropdownMenuItem>
              <DropdownMenuItem data-testid="user-menu-config" className="gap-2 text-xs focus:bg-slate-800">
                <Settings size={14} /> Configuración
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-800" />
              <DropdownMenuItem
                data-testid="user-menu-logout"
                onClick={cerrarSesion}
                className="gap-2 text-xs text-red-400 focus:bg-red-500/10 focus:text-red-300"
              >
                <LogOut size={14} /> Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="px-4 pb-14 pt-24 lg:pl-72 lg:pr-8">
        <Outlet />
      </main>
    </div>
  );
}
