import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import CreateProductForm from "../components/CreateProductForm.jsx";

const tabs = [
    { id: "create", label: "Create Product", icon: PlusCircle },
    { id: "products", label: "Products", icon: ShoppingBasket },
    { id: "analytics", label: "Analytics", icon: BarChart },
];

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState("create");

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="relative z-10 container mx-auto px-8 sm:px-12 lg:px-16 py-16 max-w-4xl">
                {/* Header */}
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex justify-center gap-2 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-300 animate-pulse delay-300" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse delay-700" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight bg-gradient-to-r from-emerald-600 to-pink-600 bg-clip-text text-transparent mb-3">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-500 text-base">
                        Manage your products, inventory & analytics
                    </p>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    className="flex justify-center gap-2 mb-10"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200
                                ${
                                    activeTab === tab.id
                                        ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-500 shadow-sm"
                                        : "bg-white text-gray-500 border-black/5 hover:border-emerald-200 hover:text-emerald-600 hover:bg-emerald-50"
                                }`}
                        >
                            <tab.icon size={15} />
                            {tab.label}
                        </button>
                    ))}
                </motion.div>

                {/* Tab content panel */}
                <motion.div
                    key={activeTab}
                    className="bg-white rounded-2xl border border-black/5 p-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === "create" && <CreateProductForm />}
                    {activeTab === "products" && (
                        <div className="text-gray-400 text-sm text-center py-8">
                            {/* ProductsList goes here */}
                            Products list coming soon…
                        </div>
                    )}
                    {activeTab === "analytics" && (
                        <div className="text-gray-400 text-sm text-center py-8">
                            {/* AnalyticsDashboard goes here */}
                            Analytics coming soon…
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default AdminPage;
