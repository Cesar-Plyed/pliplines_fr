// src/components/ErrorBoundary.tsx
import React, { ReactNode, ErrorInfo } from "react";

// 1. Definimos qué props acepta nuestro componente
interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

// 2. Pasamos la interfaz a la clase
class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Aquí podrías enviar el error a un servicio como Sentry
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // 3. Tip: Puedes personalizar este fallback
            return (
                <div className="p-[20px] text-center">
                    <h1>Algo salió mal.</h1>
                    <button onClick={() => window.location.reload()}>
                        Recargar página
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
