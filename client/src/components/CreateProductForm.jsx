import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";

const categories = [
    "Asters",
    "Poppies",
    "Hydrangeas",
    "Delphiniums",
    "Peonies",
    "Geraniums",
];

const CreateProductForm = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newProduct);
    };

    const loading = false;

    const inputClass = `
        mt-1 block w-full rounded-xl border border-black/5 bg-gray-50
        px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-300
        focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300
        transition-all duration-200
    `;

    const labelClass = "block text-sm font-medium text-gray-600 mb-0.5";

    return (
        <motion.div
            className="max-w-lg mx-auto py-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
                New product
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label htmlFor="name" className={labelClass}>
                        Product name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="e.g. Peony 'Sarah Bernhardt'"
                        value={newProduct.name}
                        onChange={(e) =>
                            setNewProduct({
                                ...newProduct,
                                name: e.target.value,
                            })
                        }
                        className={inputClass}
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className={labelClass}>
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Growing tips, bloom time, soil preferences…"
                        value={newProduct.description}
                        onChange={(e) =>
                            setNewProduct({
                                ...newProduct,
                                description: e.target.value,
                            })
                        }
                        rows={3}
                        className={inputClass + " resize-none"}
                        required
                    />
                </div>

                {/* Price + Category side by side */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="price" className={labelClass}>
                            Price ($)
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="0.00"
                            value={newProduct.price}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    price: e.target.value,
                                })
                            }
                            step="0.01"
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className={labelClass}>
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={newProduct.category}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    category: e.target.value,
                                })
                            }
                            className={inputClass}
                            required
                        >
                            <option value="">Select…</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Image upload */}
                <div>
                    <label className={labelClass}>Product image</label>
                    <label
                        htmlFor="image"
                        className={`
                            mt-1 flex items-center gap-2 w-fit cursor-pointer
                            rounded-xl border border-black/5 bg-gray-50 px-3.5 py-2.5
                            text-sm text-gray-500 hover:bg-emerald-50 hover:text-emerald-600
                            hover:border-emerald-200 transition-all duration-200
                        `}
                    >
                        <Upload size={15} />
                        Upload image
                    </label>
                    <input
                        type="file"
                        id="image"
                        className="sr-only"
                        onChange={(e) =>
                            setNewProduct({
                                ...newProduct,
                                image: e.target.files[0]?.name || "",
                            })
                        }
                    />
                    {newProduct.image && (
                        <p className="mt-1.5 text-xs text-emerald-600">
                            ✓ {newProduct.image}
                        </p>
                    )}
                </div>

                {/* Divider */}
                <div className="border-t border-black/5 pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full flex items-center justify-center gap-2
                            py-2.5 px-4 rounded-xl text-sm font-medium text-white
                            bg-gradient-to-r from-emerald-500 to-emerald-600
                            hover:opacity-90 hover:-translate-y-px
                            transition-all duration-200
                            shadow-sm disabled:opacity-50 disabled:cursor-not-allowed
                        "
                    >
                        {loading ? (
                            <>
                                <Loader size={15} className="animate-spin" />
                                Creating…
                            </>
                        ) : (
                            <>
                                <PlusCircle size={15} />
                                Create product
                            </>
                        )}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default CreateProductForm;
