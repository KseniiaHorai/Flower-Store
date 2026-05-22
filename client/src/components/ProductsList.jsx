import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categoryColors = {
    Asters: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
    },
    Poppies: {
        bg: "bg-pink-50",
        text: "text-pink-700",
        border: "border-pink-200",
    },
    Hydrangeas: {
        bg: "bg-violet-50",
        text: "text-violet-700",
        border: "border-violet-200",
    },
    Delphiniums: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
    },
    Peonies: {
        bg: "bg-rose-50",
        text: "text-rose-700",
        border: "border-rose-200",
    },
    Geraniums: {
        bg: "bg-teal-50",
        text: "text-teal-700",
        border: "border-teal-200",
    },
};

const ProductsList = () => {
    const { removeProduct, toggleStarredProduct, products } = useProductStore();

    return (
        <motion.div
            className="py-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-baseline gap-2 mb-6">
                <h2 className="text-lg font-semibold text-gray-800">
                    All products
                </h2>
                <span className="text-sm text-gray-400">
                    {products?.length ?? 0} items
                </span>
            </div>

            {!products?.length ? (
                <p className="text-sm text-gray-400 text-center py-10">
                    No products yet — create your first one.
                </p>
            ) : (
                <div className="flex flex-col gap-2">
                    {products.map((product, i) => {
                        const colors = categoryColors[product.category] ?? {
                            bg: "bg-gray-50",
                            text: "text-gray-600",
                            border: "border-gray-200",
                        };

                        return (
                            <motion.div
                                key={product._id}
                                className="flex items-center gap-3.5 p-2.5 pl-3 rounded-2xl border-[1.5px] border-gray-100 bg-white hover:border-emerald-200 hover:bg-gradient-to-r hover:from-emerald-50/60 hover:to-white transition-all duration-200 group"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                            >
                                {/* Image */}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-black/5"
                                />

                                {/* Name + category */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-[14px] font-semibold text-gray-800 truncate mb-1">
                                        {product.name}
                                    </p>
                                    <span
                                        className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}
                                    >
                                        {product.category}
                                    </span>
                                </div>

                                {/* Price */}
                                <div className="text-right flex-shrink-0 mr-1">
                                    <p className="text-[15px] font-bold text-emerald-600">
                                        ${product.price.toFixed(2)}
                                    </p>
                                    <p className="text-[11px] text-gray-400">
                                        per packet
                                    </p>
                                </div>

                                {/* Feature star */}
                                <button
                                    onClick={() =>
                                        toggleStarredProduct(product._id)
                                    }
                                    className={`flex-shrink-0 w-[34px] h-[34px] rounded-xl border-[1.5px] flex items-center justify-center transition-all duration-200
                                        ${
                                            product.isFeatured
                                                ? "bg-amber-50 border-amber-200 text-amber-500"
                                                : "bg-white border-gray-100 text-gray-300 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-400"
                                        }`}
                                    title={
                                        product.isFeatured
                                            ? "Unfeature"
                                            : "Feature"
                                    }
                                >
                                    <Star
                                        size={15}
                                        className={
                                            product.isFeatured
                                                ? "fill-amber-400"
                                                : ""
                                        }
                                    />
                                </button>

                                {/* Delete */}
                                <button
                                    onClick={() => removeProduct(product._id)}
                                    className="flex-shrink-0 w-[34px] h-[34px] rounded-xl border-[1.5px] border-gray-100 bg-white flex items-center justify-center text-gray-300 hover:bg-pink-50 hover:border-pink-200 hover:text-pink-500 transition-all duration-200"
                                    title="Delete"
                                >
                                    <Trash size={14} />
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </motion.div>
    );
};

export default ProductsList;
