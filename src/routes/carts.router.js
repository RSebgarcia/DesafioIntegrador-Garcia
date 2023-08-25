import { Router } from 'express';
import CartManager from '../dao/CartManager.js';

const cartsRouter = Router();
const cartManager = new CartManager();

cartsRouter.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(cid);

        if (!cart) {
            res.status(404).send({ status: 'Error', error: `Cart with id ${cid} not found, please try another.` });
        } else {
            res.status(200).send({
                status: 'success',
                detail: `Cart with id ${cid} has ${cart.products.length} items`,
                payload: cart
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

cartsRouter.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json({ status: 'success', payload: newCart });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

cartsRouter.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartManager.addProductToCart(cid, pid);
        res.status(201).json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(400).json({ status: 'error', error: error.message });
    }
});

export default cartsRouter;
