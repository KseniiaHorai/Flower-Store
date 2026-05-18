import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import PeopleAlsoBought from "../components/PeopleAlsoBought.jsx";
import CartItem from "../components/CartItem.jsx";

const CartPage = () => {
    const { cart, total, subtotal, coupon } = useCartStore();

    return (
        <div className="min-h-screen">
            <div className="max-w-2xl mx-auto px-8 sm:px-12 lg:px-16 py-16">
                {/* Header */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-baseline gap-2">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Your cart
                        </h1>
                        <span className="text-sm text-gray-400">
                            {cart.length} {cart.length === 1 ? "item" : "items"}
                        </span>
                    </div>
                </motion.div>

                {cart.length === 0 ? (
                    <EmptyCartUI />
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        {/* Cart items */}
                        <div className="flex flex-col gap-2.5 mb-6">
                            {cart.map((item, i) => (
                                <CartItem
                                    key={item._id}
                                    item={item}
                                    index={i}
                                />
                            ))}
                        </div>

                        {/* Recommendations */}
                        <PeopleAlsoBought />
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default CartPage;

const EmptyCartUI = () => (
    <motion.div
        className="flex flex-col items-center justify-center py-20 gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className="w-16 h-16 rounded-2xl bg-gray-50 border-[1.5px] border-gray-100 flex items-center justify-center">
            <ShoppingCart size={24} className="text-gray-300" />
        </div>
        <div className="text-center">
            <h3 className="text-base font-semibold text-gray-800 mb-1">
                Your cart is empty
            </h3>
            <p className="text-sm text-gray-400">
                Add some seeds or seedlings to get started.
            </p>
        </div>
        <Link
            to="/"
            className="mt-2 flex items-center gap-1.5 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-all duration-200"
        >
            Browse the shop
        </Link>
    </motion.div>
);
