import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ShieldCheck, User, Lock, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Line } from "@/components/motion";
import { Ticker } from "@/components/Ticker";
import { useApp } from "@/state/store";
import { TICKER_ITEMS } from "@/data/mock";

const CAPITULOS = [
  { n: "01", titulo: "Monitoreo", texto: "Vigilancia táctica de peajes, cámaras y sensores en tiempo real." },
  { n: "02", titulo: "Prevención", texto: "Analítica de siniestralidad para anticipar el riesgo en cada kilómetro." },
  { n: "03", titulo: "Respuesta", texto: "Coordinación inmediata de cuadrillas, SOS y autoridades de tránsito." },
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [verClave, setVerClave] = useState(false);
  const [recordar, setRecordar] = useState(true);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const imgX = useTransform(mx, [-0.5, 0.5], [-18, 18]);
  const imgY = useTransform(my, [-0.5, 0.5], [-12, 12]);

  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (cargando) return;
    setError("");
    setCargando(true);
    setTimeout(() => {
      const ok = login(usuario, clave);
      if (ok) {
        navigate("/");
      } else {
        setCargando(false);
        setError("Usuario o contraseña incorrectos. Verifica tus credenciales");
      }
    }, 1100);
  };

  return (
    <div className="flex min-h-screen bg-[#0F172A]" data-testid="login-page">
      <div
        className="relative hidden w-[45%] overflow-hidden lg:block"
        onMouseMove={onMouseMove}
        data-testid="login-brand-panel"
      >
        <motion.img
          src="https://images.unsplash.com/photo-1542705959-878ca346eb20?auto=format&fit=crop&q=85&w=1400"
          alt="Autopista nocturna monitoreada"
          className="absolute inset-0 h-full w-full scale-110 object-cover"
          style={{ x: imgX, y: imgY }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-[#1E1B4B]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.18),transparent_55%)]" />

        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          <div className="flex items-center gap-3">
            <span className="relative flex h-12 w-12 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#2563EB] to-[#7C3AED] shadow-xl shadow-blue-500/40">
              <span className="pulse-ring absolute inset-0 rounded-[12px] bg-blue-500/40" />
              <ShieldCheck size={24} className="relative text-white" strokeWidth={2.4} />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400">
              Red Nacional de Peajes
            </span>
          </div>

          <div>
            <h1 className="font-display text-6xl font-extrabold leading-[0.95] tracking-tight text-slate-50 xl:text-7xl">
              <Line delay={0.15}>VÍA</Line>
              <Line delay={0.3}>
                <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
                  SEGURA
                </span>
              </Line>
            </h1>
            <Line delay={0.5}>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-slate-300">
                Plataforma de gestión y monitoreo de seguridad vial en peajes
              </p>
            </Line>

            <div className="mt-10 space-y-5">
              {CAPITULOS.map((c, i) => (
                <motion.div
                  key={c.n}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.75 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-4"
                  data-testid={`login-chapter-${c.n}`}
                >
                  <span className="font-mono text-sm font-bold text-blue-400">{c.n}</span>
                  <div>
                    <p className="font-display text-sm font-semibold text-slate-100">{c.titulo}</p>
                    <p className="mt-0.5 max-w-xs text-xs leading-relaxed text-slate-400">{c.texto}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="max-w-md border-l-2 border-blue-500 pl-4 text-sm italic text-slate-300"
          >
            "Monitoreamos el riesgo para hacer las vías más seguras"
          </motion.p>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#1E1B4B]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(124,58,237,0.14),transparent_50%)]" />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card relative z-10 w-full max-w-md p-8 sm:p-10"
          data-testid="login-card"
        >
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-50">Bienvenido</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Inicia sesión para acceder al sistema de monitoreo y gestión de seguridad vial
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5" data-testid="login-form">
            <div>
              <label htmlFor="usuario" className="mb-1.5 block text-xs font-semibold text-slate-300">
                Usuario
              </label>
              <div className="relative">
                <User size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="usuario"
                  data-testid="login-form-username-input"
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder="Ingresa tu usuario"
                  autoComplete="username"
                  className={`input-tactical h-12 w-full pl-10 pr-4 text-sm ${error ? "border-red-500" : ""}`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="clave" className="mb-1.5 block text-xs font-semibold text-slate-300">
                Contraseña
              </label>
              <div className="relative">
                <Lock size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="clave"
                  data-testid="login-form-password-input"
                  type={verClave ? "text" : "password"}
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  autoComplete="current-password"
                  className={`input-tactical h-12 w-full pl-10 pr-11 text-sm ${error ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  data-testid="login-toggle-password"
                  onClick={() => setVerClave((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-slate-200"
                  aria-label={verClave ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {verClave ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                data-testid="login-error-message"
                className="flex items-center gap-2 rounded-[8px] border border-red-500/40 bg-red-500/10 px-3 py-2.5 text-xs font-medium text-red-400"
              >
                <AlertCircle size={14} className="shrink-0" /> {error}
              </motion.p>
            )}

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-400">
                <Checkbox
                  data-testid="login-remember-checkbox"
                  checked={recordar}
                  onCheckedChange={(v) => setRecordar(Boolean(v))}
                  className="border-slate-600 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
                />
                Recordar sesión
              </label>
              <span data-testid="login-forgot-link" className="cursor-pointer text-xs font-medium text-blue-400 transition-colors hover:text-blue-300">
                ¿Olvidaste tu contraseña?
              </span>
            </div>

            <button
              type="submit"
              data-testid="login-form-submit-button"
              disabled={cargando}
              className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[8px] bg-gradient-to-r from-[#2563EB] to-[#7C3AED] font-display text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:from-[#1D4ED8] hover:to-[#6D28D9] hover:shadow-violet-500/30 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {cargando ? (
                <>
                  <Loader2 size={17} className="animate-spin" /> Iniciando sesión...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </button>

            <p className="flex items-center justify-center gap-1.5 pt-1 text-center text-xs text-slate-500">
              <Lock size={12} /> Acceso seguro y protegido — Sistema de monitoreo de infraestructura vial
            </p>
          </form>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <Ticker items={TICKER_ITEMS} testId="login-ticker" />
        </div>
      </div>
    </div>
  );
}
