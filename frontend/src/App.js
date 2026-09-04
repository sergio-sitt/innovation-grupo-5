import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { AppProvider, useApp } from "@/state/store";
import Layout from "@/components/Layout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import MapaView from "@/pages/MapaView";
import Accidentes from "@/pages/Accidentes";
import ActoresViales from "@/pages/ActoresViales";
import Alertas from "@/pages/Alertas";

const RequireAuth = ({ children }) => {
  const { sesion } = useApp();
  const location = useLocation();
  if (!sesion) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
};

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1.05 });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App">
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Layout />
                </RequireAuth>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="mapa" element={<MapaView />} />
              <Route path="alertas" element={<Alertas />} />
              <Route path="accidentes" element={<Accidentes />} />
              <Route path="actores" element={<ActoresViales />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        <Toaster theme="dark" position="top-right" richColors closeButton />
      </AppProvider>
    </div>
  );
}

export default App;
