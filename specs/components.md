# Components — Pliplines Frontend

## App (App.tsx)
**Props:** Ninguna (componente raíz).
**Estado:** `isSidebarVisible` (boolean).
**Layout:**
```
┌──────────────┐  ← NavBar (h-16)
│   NavBar     │
├──────────────┤  ← Main (Menu) + Sidebar (condicional)
│  Menu (lazy) │
│  [Sidebar]   │
└──────────────┘  ← Footer (h-[80px])
```

## NavBar
- Botón hamburguesa toggle sidebar.
- Props: `onButtonClick`, `isSideBarOpen`.

## Sidebar
- `AnimatePresence` (Motion). Posición: `fixed top-[42px] h-full w-[15%]`.

## Menu / MenuCards
- Lazy (code-split). Muestra items del menú (drinks + food).
- Usa TanStack React Query.

## Footer
- Altura fija 80px.

## Not Found
- Página 404 para rutas no definidas.

## New Item (Create)
- Ruta `/new/:type` (`:type = bebida | comida`).
- Formulario: name, price, description, image.
- Envío form-data al backend.

## Stack
| Capa | Tecnología |
|------|------------|
| UI | React 18.2 + MUI 5.15 |
| Routing | React Router 6.22 |
| State/Query | TanStack React Query 5.69 |
| Styling | Tailwind 4 + SCSS + Emotion |
| Animations | Motion (framer-motion) |
| Build | Vite 6.1 |
| Type | TypeScript 5.7 |
