import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";

const App = lazy(() => import("./App"));
const NotFound = lazy(() => import("./pages/notFound"));
const Create = lazy(() => import("./pages/newItem"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<App />} />
        {/* Ruta para agregar un nuevo producto */}
        <Route path={`/new/:type`} element={<Create />} />
        {/* Ruta para cualquier ruta no programada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
