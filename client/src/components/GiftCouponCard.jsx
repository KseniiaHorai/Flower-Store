import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { Tag, X } from "lucide-react";

const GiftCouponCard = () => {
    const [userInputCode, setUserInputCode] = useState("");
    const {
        coupon,
        isCouponApplied,
        useMyCoupon,
        receiveMyCoupon,
        deleteCoupon,
    } = useCartStore();

    useEffect(() => {
        receiveMyCoupon();
    }, [receiveMyCoupon]);

    useEffect(() => {
        if (coupon) setUserInputCode(coupon.code);
    }, [coupon]);

    const handleApplyCoupon = () => {
        if (!userInputCode) return;
        useMyCoupon(userInputCode);
    };

    const handleRemoveCoupon = async () => {
        await deleteCoupon();
        setUserInputCode("");
    };

    return (
        <motion.div
            className="bg-white border-[1.5px] border-gray-100 rounded-2xl p-4 mt-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
        >
            <h2 className="text-[15px] font-semibold text-gray-800 mb-4">
                Gift card or coupon
            </h2>

            {/* Available coupon hint */}
            {coupon && !isCouponApplied && (
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 mb-3">
                    <Tag size={13} className="text-emerald-600 flex-shrink-0" />
                    <p className="text-[12px] text-emerald-700">
                        You have a coupon available:
                        <span className="font-semibold ml-1">
                            {coupon.code}
                        </span>
                        <span className="text-emerald-500 ml-1">
                            ({coupon.discountPercentage}% off)
                        </span>
                    </p>
                </div>
            )}

            {/* Applied coupon pill */}
            {isCouponApplied && coupon && (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 mb-3">
                    <div className="flex items-center gap-2">
                        <Tag
                            size={13}
                            className="text-emerald-600 flex-shrink-0"
                        />
                        <span className="text-[12px] font-semibold text-emerald-700">
                            {coupon.code}
                        </span>
                        <span className="text-[11px] text-emerald-500">
                            −{coupon.discountPercentage}%
                        </span>
                    </div>
                    <button
                        onClick={handleRemoveCoupon}
                        className="w-[22px] h-[22px] rounded-lg border-[1.5px] border-pink-100 bg-white flex items-center justify-center text-pink-400 hover:bg-pink-50 hover:border-pink-200 transition-all duration-200"
                        title="Remove coupon"
                    >
                        <X size={11} />
                    </button>
                </div>
            )}

            {/* Input + button */}
            {!isCouponApplied && (
                <div className="flex gap-2">
                    <input
                        type="text"
                        id="voucher"
                        placeholder="Enter code"
                        value={userInputCode}
                        onChange={(e) => setUserInputCode(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" && handleApplyCoupon()
                        }
                        className="flex-1 rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-3.5 py-2 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 transition-all duration-200"
                    />
                    <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200 transition-all duration-200"
                    >
                        Apply
                    </button>
                </div>
            )}
        </motion.div>
    );
};

export default GiftCouponCard;
