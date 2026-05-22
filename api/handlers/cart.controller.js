const Product = require("../models/Product.js");
const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        const existingItem = user.cartContents.find(
            (item) => item.id === productId,
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cartContents.push(productId);
        }

        await user.save();
        res.json(user.cartContents);
    } catch (error) {
        console.log("Error in addToCart controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const removeAllFromCart = async (req, res) => {
    try {
        const productId = req.body?.productId;
        const user = req.user;

        if (!productId) {
            user.cartContents = [];
        } else {
            user.cartContents = user.cartContents.filter(
                (item) => item.product?.toString() !== productId,
            );
        }

        await user.save();
        res.json(user.cartContents);
    } catch (error) {
        console.log("Error in removeAllFromCart controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const updateQuantity = async (req, res) => {
    try {
        const { id: productId } = req.params;
        const { quantity } = req.body;
        const user = req.user;
        const existingItem = user.cartContents.find(
            (item) => item.id === productId,
        );

        if (existingItem) {
            if (quantity === 0) {
                user.cartContents = user.cartContents.filter(
                    (item) => item.id !== productId,
                );
                await user.save();
                return res.json(user.cartContents);
            }

            existingItem.quantity = quantity;
            await user.save();
            return res.json(user.cartContents);
        } else {
            res.status(404).json({ message: "Item not found in cart" });
        }
    } catch (error) {
        console.log("Error in updateQuantity controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getCartItems = async (req, res) => {
    try {
        const products = await Product.find({
            _id: { $in: req.user.cartContents.map((item) => item.id || item) },
        });

        const cartContents = products.map((product) => {
            const item = req.user.cartContents.find(
                (cartItem) =>
                    (cartItem.id || cartItem).toString() ===
                    product._id.toString(),
            );

            return {
                ...product.toJSON(),
                quantity: item?.quantity || 1,
            };
        });

        res.json(cartContents);
    } catch (error) {
        console.log("Error in getCartItems controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    addToCart,
    removeAllFromCart,
    updateQuantity,
    getCartItems,
};
