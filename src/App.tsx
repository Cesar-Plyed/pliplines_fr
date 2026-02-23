// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import AddItemPage from "./pages/AddItemPage";
import { AuthProvider } from "@context/AuthProvider";
import ErrorBoundary from "@utils/ErrorBoundary";
import MainLayout from "@layouts/Mainlayout"
// import Admin from './pages/Admin';

function App() {
    return (
        <AuthProvider>
            <ErrorBoundary>
                <Router>
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route path="" element={<MenuPage />} />
                        </Route>
                        <Route path="/products" element={<AddItemPage />} />
                        {/* <Route path="/admin" element={<Admin />} /> */}
                    </Routes>
                </Router>
            </ErrorBoundary>
        </AuthProvider>
    );
}

export default App;
