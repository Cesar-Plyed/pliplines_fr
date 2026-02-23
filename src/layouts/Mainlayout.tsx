import React, { useState, useTransition } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import styles from "@styles/Layout.module.scss";
import NavBar from "@organisms/NavBar";

const Layout: React.FC = () => {
    const [isPending, startTransition] = useTransition();
    const navigate = useNavigate();

    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const handlePageClick = () => {
        if (isSidebarVisible) {
            setIsSidebarVisible(false);
        }
    };

    // Función para navegar con transición (evita bloqueos en rutas pesadas)
    const handleNavigation = (
        e: React.MouseEvent<HTMLAnchorElement>,
        to: string,
    ) => {
        e.preventDefault();
        startTransition(() => {
            navigate(to);
        });
    };

    return (
        <div className={styles.container}>
            {/* FILA 1: NAV (Persistente) */}

            <NavBar
                onButtonClick={toggleSidebar}
                isSideBarOpen={isSidebarVisible}
            />

            {isPending && (
                <span className={styles.status}>Cargando sección...</span>
            )}

            {/* FILA 2: MAIN (Aquí renderizan los hijos como en Angular) */}
            <main
                className={`${styles.main} ${isPending ? styles.isPending : ""}`}
                onClick={() => {
                    handlePageClick();
                }}>
                <Outlet />
            </main>

            {/* FILA 3: FOOTER (Persistente) */}
            <footer className={styles.footer}>
                <p>Sistema Operativo v2.0 - 2026</p>
            </footer>
        </div>
    );
};

export default Layout;
