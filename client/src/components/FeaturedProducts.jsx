import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";

const FeaturedProducts = ({ featuredProducts }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const { addItemToCart } = useCartStore();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setItemsPerPage(1);
            else if (window.innerWidth < 1024) setItemsPerPage(2);
            else setItemsPerPage(3);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const nextSlide = () => setCurrentIndex((i) => i + itemsPerPage);
    const prevSlide = () => setCurrentIndex((i) => i - itemsPerPage);

    const isStartDisabled = currentIndex === 0;
    const isEndDisabled =
        currentIndex >= featuredProducts.length - itemsPerPage;

    return (
        <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Section header */}
            <div className="text-center mb-8">
                <div className="flex justify-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-300 animate-pulse delay-300" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse delay-700" />
                </div>
                <h2 className="inline-block text-3xl sm:text-4xl font-semibold tracking-tight bg-gradient-to-r from-emerald-600 to-pink-600 bg-clip-text text-transparent">
                    Staff picks
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                    Our favourite seeds & seedlings this season
                </p>
            </div>

            {/* Carousel */}
            <div className="relative">
                <div className="overflow-hidden rounded-2xl">
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
                        }}
                    >
                        {featuredProducts.map((product, i) => (
                            <div
                                key={product._id}
                                className="flex-shrink-0 px-2"
                                style={{ width: `${100 / itemsPerPage}%` }}
                            >
                                <div className="bg-white border-[1.5px] border-gray-100 hover:border-emerald-200 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 group">
                                    {/* Square image */}
                                    <div className="relative aspect-square overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-2 left-2">
                                            <span className="text-[10px] font-medium bg-white/90 text-amber-600 border border-amber-100 px-2 py-0.5 rounded-full backdrop-blur-sm">
                                                ★ Featured
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
                                                onClick={() =>
                                                    addItemToCart(product)
                                                }
                                                className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:opacity-90 hover:-translate-y-px text-white text-[11px] font-medium px-2.5 py-1.5 rounded-lg transition-all duration-200"
                                            >
                                                <ShoppingCart size={11} />
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Prev button */}
                <button
                    onClick={prevSlide}
                    disabled={isStartDisabled}
                    className={`absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 rounded-xl border-[1.5px] flex items-center justify-center transition-all duration-200
                        ${
                            isStartDisabled
                                ? "border-gray-100 bg-white text-gray-200 cursor-not-allowed"
                                : "border-emerald-100 bg-white text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200"
                        }`}
                >
                    <ChevronLeft size={16} />
                </button>

                {/* Next button */}
                <button
                    onClick={nextSlide}
                    disabled={isEndDisabled}
                    className={`absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 rounded-xl border-[1.5px] flex items-center justify-center transition-all duration-200
                        ${
                            isEndDisabled
                                ? "border-gray-100 bg-white text-gray-200 cursor-not-allowed"
                                : "border-emerald-100 bg-white text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200"
                        }`}
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </motion.div>
    );
};

export default FeaturedProducts;
