import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard.jsx";

const CategoryPage = () => {
    const { fetchProductsByCategory, products } = useProductStore();
    const { category } = useParams();

    useEffect(() => {
        fetchProductsByCategory(category);
    }, [fetchProductsByCategory, category]);

    const displayName = category.charAt(0).toUpperCase() + category.slice(1);

    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto px-8 sm:px-12 lg:px-16 py-16">
                {/* Header — matches HomePage */}
                <motion.div
                    className="text-center mb-12"
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
                        {displayName}
                    </h1>
                    <p className="text-gray-500 text-base">
                        Seeds & seedlings · Dispatched fresh every Monday
                    </p>
                </motion.div>

                {/* Grid */}
                {products?.length === 0 ? (
                    <motion.p
                        className="text-center text-gray-400 text-base py-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        No products in this category yet — check back soon.
                    </motion.p>
                ) : (
                    <motion.div
                        className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {products?.map((product, i) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                index={i}
                            />
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
