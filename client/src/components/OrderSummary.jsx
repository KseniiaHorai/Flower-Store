import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";

const stripePromise = loadStripe(
    "pk_test_51TVVgSDfVHQowCb5eznkJbfzAuGVaOTFvse35vBtGldXYyADgvhzUbnWZNZ9CMFLhtcSSReCQfzqbU7uBlRBrHXY00pKYQuhMI",
);

const OrderSummary = () => {
    const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

    const savings = subtotal - total;
    const formattedSubtotal = subtotal.toFixed(2);
    const formattedTotal = total.toFixed(2);
    const formattedSavings = savings.toFixed(2);

    const handlePayment = async () => {
        try {
            const res = await axios.post("/payments/create-checkout-session", {
                products: cart,
                couponCode: coupon ? coupon.code : null,
            });

            window.location.href = res.data.url;
        } catch (error) {
            console.error("Payment error:", error);
        }
    };

    return (
        <motion.div
            className="bg-white border-[1.5px] border-gray-100 rounded-2xl p-4 mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h2 className="text-[15px] font-semibold text-gray-800 mb-4">
                Order summary
            </h2>

            <div className="space-y-2.5 mb-4">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                        Subtotal ({cart.length}{" "}
                        {cart.length === 1 ? "item" : "items"})
                    </span>
                    <span className="text-sm font-medium text-gray-800">
                        ${formattedSubtotal}
                    </span>
                </div>

                {savings > 0 && (
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-pink-500">Savings</span>
                        <span className="text-sm font-medium text-pink-500">
                            −${formattedSavings}
                        </span>
                    </div>
                )}

                {coupon && isCouponApplied && (
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-emerald-600 flex items-center gap-1.5">
                            Coupon
                            <span className="text-[11px] font-medium bg-emerald-50 border border-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">
                                {coupon.code}
                            </span>
                        </span>
                        <span className="text-sm font-medium text-emerald-600">
                            −{coupon.discountPercentage}%
                        </span>
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Shipping</span>
                    <span className="text-sm font-medium text-emerald-600">
                        Free
                    </span>
                </div>
            </div>

            <div className="border-t border-gray-50 pt-3.5 flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-gray-800">
                    Total
                </span>
                <span className="text-xl font-bold text-emerald-600">
                    ${formattedTotal}
                </span>
            </div>

            <button
                onClick={handlePayment}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:opacity-90 hover:-translate-y-px transition-all duration-200"
            >
                <ShoppingBag size={14} />
                Place order
                <ArrowRight size={14} />
            </button>

            <div className="flex items-center justify-center gap-1.5 mt-3">
                <span className="text-[11px] text-gray-400">or</span>
                <Link
                    to="/"
                    className="text-[11px] font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors duration-200"
                >
                    Continue shopping
                    <ArrowRight size={11} />
                </Link>
            </div>

            <p className="text-center text-[11px] text-gray-400 mt-2">
                Dispatched fresh every Monday
            </p>
        </motion.div>
    );
};

export default OrderSummary;
