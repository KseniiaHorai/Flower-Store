import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

const PurchaseSuccessPage = () => {
    const [isProcessing, setIsProcessing] = useState(true);
    const { emptyCart } = useCartStore();
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleCheckoutSuccess = async (sessionId) => {
            try {
                await axios.post("/payments/checkout-success", { sessionId });
                emptyCart();
            } catch (error) {
                console.log(error);
            } finally {
                setIsProcessing(false);
            }
        };

        const sessionId = new URLSearchParams(window.location.search).get(
            "session_id",
        );
        if (sessionId) {
            handleCheckoutSuccess(sessionId);
        } else {
            setIsProcessing(false);
            setError("No session ID found in the URL");
        }
    }, [emptyCart]);

    if (isProcessing) return "Processing...";
    if (error) return `Error: ${error}`;

    return (
        <div className="h-screen flex items-center justify-center px-4">
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                gravity={0.1}
                style={{ zIndex: 99 }}
                numberOfPieces={700}
                recycle={false}
                colors={[
                    "#86efac",
                    "#f9a8d4",
                    "#6ee7b7",
                    "#fbcfe8",
                    "#34d399",
                    "#fce7f3",
                ]}
            />

            <motion.div
                className="max-w-md w-full bg-white rounded-2xl border-[1.5px] border-gray-100 overflow-hidden relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="p-6 sm:p-8">
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                        <CheckCircle className="text-emerald-500 w-16 h-16" />
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl sm:text-3xl font-semibold text-center tracking-tight bg-gradient-to-r from-emerald-600 to-pink-600 bg-clip-text text-transparent pb-3 mb-2">
                        Purchase Successful!
                    </h1>

                    <p className="text-gray-500 text-center mb-1">
                        Thank you for your order. We're processing it now.
                    </p>
                    <p className="text-emerald-600 text-center text-sm mb-6">
                        Check your email for order details and updates.
                    </p>

                    {/* Order details */}
                    <div className="bg-gray-50 border-[1.5px] border-gray-100 rounded-xl p-4 mb-6">
                        <div className="flex items-center justify-between mb-2.5">
                            <span className="text-sm text-gray-500">
                                Order number
                            </span>
                            <span className="text-sm font-semibold text-emerald-600">
                                #12345
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                                Estimated delivery
                            </span>
                            <span className="text-sm font-semibold text-gray-800">
                                3-5 business days
                            </span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-2.5">
                        <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:opacity-90 hover:-translate-y-px transition-all duration-200">
                            <HandHeart size={16} />
                            Thanks for trusting us!
                        </button>
                        <Link
                            to="/"
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200 transition-all duration-200"
                        >
                            Continue Shopping
                            <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PurchaseSuccessPage;
