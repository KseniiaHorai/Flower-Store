import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";

const CartItem = ({ item, index = 0 }) => {
    const { removeFromCart, updateQuantity } = useCartStore();

    return (
        <motion.div
            className="flex items-center gap-3.5 bg-white border-[1.5px] border-gray-100 hover:border-emerald-200 rounded-2xl p-2.5 pl-3 transition-all duration-200"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
        >
            {/* Image */}
            <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-black/5"
            />

            {/* Name + category */}
            <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-gray-800 truncate mb-0.5">
                    {item.name}
                </p>
                <p className="text-[11px] text-gray-400">
                    {item.isSeedling ? "Seedling" : "Seeds"} · {item.category}
                </p>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
                <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="w-[26px] h-[26px] rounded-lg border-[1.5px] border-gray-100 bg-white flex items-center justify-center text-gray-400 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200"
                >
                    <Minus size={12} />
                </button>
                <span className="text-[13px] font-semibold text-gray-800 min-w-[16px] text-center">
                    {item.quantity}
                </span>
                <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="w-[26px] h-[26px] rounded-lg border-[1.5px] border-gray-100 bg-white flex items-center justify-center text-gray-400 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200"
                >
                    <Plus size={12} />
                </button>
            </div>

            {/* Price */}
            <span className="text-[15px] font-bold text-emerald-600 flex-shrink-0 min-w-[52px] text-right">
                ${(item.price * item.quantity).toFixed(2)}
            </span>

            {/* Delete */}
            <button
                onClick={() => removeFromCart(item._id)}
                className="w-[30px] h-[30px] rounded-[10px] border-[1.5px] border-gray-100 bg-white flex items-center justify-center text-gray-300 hover:border-pink-200 hover:bg-pink-50 hover:text-pink-500 transition-all duration-200 flex-shrink-0"
            >
                <Trash size={13} />
            </button>
        </motion.div>
    );
};

export default CartItem;
