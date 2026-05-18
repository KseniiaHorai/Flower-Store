import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const PeopleAlsoBought = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const res = await axios.get("/products/recommendations");
                setRecommendations(res.data);
            } catch (error) {
                toast.error(
                    error.response.data.message ||
                        "An error occurred while fetching recommendations",
                );
            } finally {
                setIsLoading(false);
            }
        };
        fetchRecommendations();
    }, []);

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="mt-10">
            <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                <div className="w-1.5 h-1.5 rounded-full bg-pink-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-5">
                You might also like
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {recommendations.map((product, i) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        index={i}
                    />
                ))}
            </div>
        </div>
    );
};

export default PeopleAlsoBought;
