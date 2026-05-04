const Product = require("../models/Product.js");
const { redis } = require("../lib/redis.js");
const claudinary = require("../lib/cloudinary.js");

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

module.exports = { getAllProducts, getFeaturedProducts, createProduct };
