const Product = require("../models/Product.js");
const { redis } = require("../lib/redis.js");
const cloudinary = require("../lib/cloudinary.js");

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ products });
    } catch (error) {
        console.log("Error in getAllProducts controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await redis.get("featured_products");
        if (featuredProducts) {
            return res.json(JSON.parse(featuredProducts));
        }

        //if not in redis, fetch from mongodb
        featuredProducts = await Product.find({ isFeatured: true }).lean();
        if (!featuredProducts) {
            return res
                .status(404)
                .json({ message: "No featured products found" });
        }

        await redis.set("featured_products", JSON.stringify(featuredProducts));
        res.json(featuredProducts);
    } catch (error) {
        console.log("Error in getFeaturedProducts controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;

        let cloudinatyResponse = null;

        if (image) {
            cloudinatyResponse = await cloudinary.uploader.upload(image, {
                folder: "myproducts",
            });
        }
        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinatyResponse?.secure_url
                ? cloudinatyResponse.secure_url
                : "",
            category,
        });
        res.status(201).json(product);
    } catch (error) {
        console.log("Error in getFeaturedProducts controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy(`myproducts/${publicId}`);
                console.log("deleted image from cloudinary");
            } catch (error) {
                console.log("error deleting image from cloudinary", error);
            }
        }
        await Product.findByIdAndDelete(req.params.id);

        res.json({ message: "Prouduct deleted successfully" });
    } catch (error) {
        console.log("Error in deleteProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: { size: 3 },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1,
                },
            },
        ]);
        res.json(products);
    } catch (error) {
        console.log(
            "Error in getRecommendedProducts controller",
            error.message,
        );
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const products = await Product.find({ category });
        res.json({ products });
    } catch (error) {
        console.log("Error in getProductsByCategory controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const toggleFeaturedProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.isFeatured = !product.isFeatured;
            const updatedProduct = await product.save();
            //update redis
            await updateFeaturedProductsCache();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.log("Error in toggleFeaturedProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateFeaturedProductsCache = async (req, res) => {
    try {
        const featuredProducts = await Product.find({
            isFeatured: true,
        }).lean();
        await redis.set("featured_products", JSON.stringify(featuredProducts));
    } catch (error) {
        console.log("Error in updateFeaturedProductsCache", error.message);
    }
};

module.exports = {
    getAllProducts,
    getFeaturedProducts,
    createProduct,
    deleteProduct,
    getRecommendedProducts,
    getProductsByCategory,
    toggleFeaturedProduct,
};
