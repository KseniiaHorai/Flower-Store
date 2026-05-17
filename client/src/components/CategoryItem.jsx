import { Link } from "react-router-dom";
import { Sprout } from "lucide-react";

const CategoryItem = ({ category }) => {
    return (
        <Link
            to={"/category" + category.href}
            className="group rounded-xl overflow-hidden bg-white border border-black/5 hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1"
        >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 flex gap-1">
                    <span className="text-[10px] font-medium bg-white/90 text-emerald-700 border border-emerald-100 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                        Seeds
                    </span>
                    <span className="text-[10px] font-medium bg-white/90 text-pink-700 border border-pink-100 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                        Seedlings
                    </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-3">
                <p className="text-[13px] font-medium text-gray-900 mb-0.5">
                    {category.name}
                </p>
                <p className="text-[11px] text-gray-400 mb-2.5">
                    {category.tagline}
                </p>
                <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 px-2.5 py-1 rounded-lg transition-all duration-200 w-fit">
                    <Sprout size={11} />
                    Shop seeds & seedlings
                </div>
            </div>
        </Link>
    );
};

export default CategoryItem;
