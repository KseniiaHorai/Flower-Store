import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product, index = 0 }) => {
    const { user } = useUserStore();
    const { addItemToCart } = useCartStore();

    const handleAddToCart = () => {
        if (!user) {
            toast.error("Please login to add products to cart", {
                id: "login",
            });
            return;
        }
        addItemToCart(product);
    };

    return (
        <motion.div
            className="group bg-white rounded-2xl border-[1.5px] border-gray-100 overflow-hidden hover:border-emerald-200 hover:-translate-y-1 transition-all duration-250"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
        >
            {/* Square image */}
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badge */}
                <div className="absolute top-2 left-2">
                    <span className="text-[10px] font-medium bg-white/90 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full backdrop-blur-sm">
                        {product.isSeedling ? "Seedling" : "Seeds"}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-3">
                <p className="text-[13px] font-semibold text-gray-800 truncate mb-0.5">
                    {product.name}
                </p>
                <p className="text-[11px] text-gray-400 truncate mb-2.5">
                    {product.description}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-[15px] font-bold text-emerald-600">
                        ${product.price.toFixed(2)}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:opacity-90 hover:-translate-y-px text-white text-[11px] font-medium px-2.5 py-1.5 rounded-lg transition-all duration-200"
                    >
                        <ShoppingCart size={12} />
                        Add
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
