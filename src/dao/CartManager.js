import { cartsModel } from "./models/cart.models.js";
import { productModel } from "./models/product.model.js";

class CartManager {
    async createCart() {
        await cartsModel.create({ products: [] });
        console.log("Cart Created!");

        return true;
    }
    isValidId(id) {
        return /^[0-9a-fA-F]{24}$/.test(id);
    }
    async getCartById(cartId) {
        if (!this.isValidId(cartId)) {
            return null;
        }
        return await cartsModel.findOne({ _id: cartId }).lean();
    }

    async addProductToCart(cartId, productId) {
        if (!this.isValidId(cartId) || !this.isValidId(productId)) {
            throw new Error('Invalid cart or product ID');
        }
    
        const cart = await cartsModel.findOne({ _id: cartId });
        const product = await productModel.findOne({ _id: productId });
    
        if (!cart) {
            throw new Error(`Cart with id ${cartId} not found`);
        }
    
        if (!product) {
            throw new Error(`Product with id ${productId} not found`);
        }
    
        // Check if the product is already in the cart
        const isInCart = cart.products.find(item => item.id === productId);
    
        if (!isInCart) {
            // If the product is not in the cart, add it
            const newProduct = {
                id: productId,
                quantity: 1
            };
            cart.products.push(newProduct);
        } else {
            // If the product is already in the cart, increase the quantity
            isInCart.quantity++;
        }
    
        // Save the updated cart
        await cart.save();
        return cart;
    }

}

export default CartManager;
