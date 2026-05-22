import { XCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-white rounded-2xl border-[1.5px] border-gray-100 overflow-hidden relative z-10"
            >
                <div className="p-6 sm:p-8">
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                        <XCircle className="text-pink-400 w-16 h-16" />
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl sm:text-3xl font-semibold text-center tracking-tight bg-gradient-to-r from-emerald-600 to-pink-600 bg-clip-text text-transparent pb-3 mb-2">
                        Purchase Cancelled
                    </h1>

                    <p className="text-gray-500 text-center mb-6">
                        Your order has been cancelled. No charges have been
                        made.
                    </p>

                    {/* Info box */}
                    <div className="bg-gray-50 border-[1.5px] border-gray-100 rounded-xl p-4 mb-6">
                        <p className="text-sm text-gray-400 text-center">
                            If you encountered any issues during checkout,
                            please don't hesitate to contact our support team.
                        </p>
                    </div>

                    {/* Button */}
                    <Link
                        to="/"
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200 transition-all duration-200"
                    >
                        <ArrowLeft size={15} />
                        Return to shop
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default PurchaseCancelPage;
