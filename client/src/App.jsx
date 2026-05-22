import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage.jsx";
import PurchaseCancelPage from "./pages/PurchaseCancelPage.jsx";

import Navbar from "./components/Navbar.jsx";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore.js";
import { useCartStore } from "./stores/useCartStore.js";

function App() {
    const [count, setCount] = useState(0);
    const { user, checkAuth, checkingAuth } = useUserStore();
    const { getCartItems } = useCartStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        getCartItems();
    }, [getCartItems]);

    if (checkingAuth) {
        return <LoadingSpinner />;
    }

    return (
        <div
            className="min-h-screen text-gray-800 relative overflow-hidden"
            style={{ backgroundColor: "#f0faf0" }}
        >
            {/* Background gradient */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0">
                    {/* Світло-зелений градієнт зверху */}
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full"
                        style={{
                            background:
                                "radial-gradient(ellipse at top, rgba(134,239,172,0.4) 0%, rgba(187,247,208,0.2) 45%, transparent 100%)",
                        }}
                    />
                    {/* Рожевий акцент знизу праворуч */}
                    <div
                        className="absolute bottom-0 right-0 w-2/3 h-2/3"
                        style={{
                            background:
                                "radial-gradient(ellipse at bottom right, rgba(249,168,212,0.35) 0%, rgba(253,213,236,0.2) 50%, transparent 100%)",
                        }}
                    />
                    {/* М'який рожевий зліва */}
                    <div
                        className="absolute top-1/3 left-0 w-1/2 h-1/2"
                        style={{
                            background:
                                "radial-gradient(ellipse at left, rgba(244,194,218,0.25) 0%, transparent 70%)",
                        }}
                    />
                </div>
            </div>

            <div className="relative z-50 pt-20">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/signup"
                        element={!user ? <SignUpPage /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/login"
                        element={!user ? <LoginPage /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/secret-dashboard"
                        element={
                            user?.role === "admin" ? (
                                <AdminPage />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/category/:category"
                        element={<CategoryPage />}
                    />
                    <Route
                        path="/cart"
                        element={user ? <CartPage /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/purchase-success"
                        element={
                            user ? (
                                <PurchaseSuccessPage />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/purchase-cancel"
                        element={
                            user ? (
                                <PurchaseCancelPage />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                </Routes>
            </div>
            <Toaster />
        </div>
    );
}

export default App;
