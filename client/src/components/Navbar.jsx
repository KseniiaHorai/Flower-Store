import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
    const { user, logout } = useUserStore();
    const isAdmin = user?.role === "admin";
    const { cart } = useCartStore();

    return (
        <header className="fixed top-0 left-0 w-full z-40 bg-white/70 backdrop-blur-xl border-b border-emerald-100 shadow-[0_1px_24px_rgba(134,239,172,0.08),0_1px_3px_rgba(0,0,0,0.04)]">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-300 via-pink-300 to-emerald-300 opacity-70" />

            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-emerald-300 to-pink-300 flex items-center justify-content-center shadow-[0_2px_8px_rgba(134,239,172,0.35)] group-hover:scale-105 transition-transform duration-200">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="mx-auto"
                            >
                                <path
                                    d="M8 2C5 2 2 5 2 9c0 2.5 1.5 4 4 4 1 0 2-.3 2.8-.8C10.2 11 11 9.5 11 8V5l-3 3"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M11 5c1.5 0 3 1.2 3 3.5 0 1.5-.8 2.8-2 3.5"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                        <span className="text-[17px] font-semibold tracking-tight bg-gradient-to-r from-emerald-600 to-pink-600 bg-clip-text text-transparent">
                            Bloom
                        </span>
                        <span className="text-[17px] font-normal text-gray-400 tracking-tight">
                            Shop
                        </span>
                    </Link>

                    {/* Nav links */}
                    <nav className="flex items-center gap-1">
                        <Link
                            to="/"
                            className="text-sm font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-all duration-200"
                        >
                            Home
                        </Link>

                        {user && (
                            <Link
                                to="/cart"
                                className="relative flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-pink-600 hover:bg-pink-50 px-3 py-1.5 rounded-lg transition-all duration-200"
                            >
                                <div className="relative">
                                    <ShoppingCart size={18} />

                                    {cart.length > 0 && (
                                        <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-br from-pink-400 to-pink-500 text-white rounded-full text-[10px] font-semibold px-1.5 leading-[14px] shadow-[0_1px_4px_rgba(236,72,153,0.4)] border-2 border-white">
                                            {cart.length}
                                        </span>
                                    )}
                                </div>
                                <span className="hidden sm:inline">Cart</span>
                            </Link>
                        )}

                        {/* Divider */}
                        <div className="w-px h-5 bg-gray-200 mx-1" />

                        {isAdmin && (
                            <Link
                                to="/secret-dashboard"
                                className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 hover:border-emerald-300 px-3 py-1.5 rounded-lg transition-all duration-200"
                            >
                                <Lock size={14} />
                                <span className="hidden sm:inline">
                                    Dashboard
                                </span>
                            </Link>
                        )}

                        {user ? (
                            <button
                                className="flex items-center gap-1.5 text-xs font-medium text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 hover:border-pink-300 px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer"
                                onClick={logout}
                            >
                                <LogOut size={15} />
                                <span className="hidden sm:inline">
                                    Log out
                                </span>
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/signup"
                                    className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 hover:border-emerald-300 px-3 py-1.5 rounded-lg transition-all duration-200"
                                >
                                    <UserPlus size={15} />
                                    <span>Sign up</span>
                                </Link>

                                <Link
                                    to="/login"
                                    className="flex items-center gap-1.5 text-xs font-medium text-white bg-gradient-to-r from-emerald-300 to-pink-300 hover:opacity-90 hover:-translate-y-px px-3.5 py-[7px] rounded-lg transition-all duration-200 shadow-[0_2px_8px_rgba(134,239,172,0.3)] hover:shadow-[0_4px_12px_rgba(134,239,172,0.4)]"
                                >
                                    <LogIn size={15} />
                                    <span>Login</span>
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
