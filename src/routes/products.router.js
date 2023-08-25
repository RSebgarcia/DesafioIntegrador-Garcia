import { Router } from 'express';
import ProductManager from '../dao/ProductManager.js';

const productsRouter = Router();
const PM = new ProductManager();

productsRouter.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const products = await PM.getAllProducts(limit);
        res.send({ status: 'success', payload: products });
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ status: 'Error', error: 'Failed to retrieve products' });
    }
});

productsRouter.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await PM.getProductById(pid);

        if (!product) {
            res.status(404).send({ status: 'Error', error: `Product with id ${pid} not found, please try another.` });
        } else {
            res.status(200).send({ status: 'success', payload: product });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

productsRouter.post('/', async (req, res) => {
    try {
        let { title, description, code,price, status, stock, category, thumbnails } = req.body;
        if(await PM.addProduct({title, description, code,price, status, stock, category, thumbnails})){

            res.status(201).json({ status: 'success', payload: "Creado Correctamente" });
        } ;
    } catch (error) {
        res.status(400).json({ status: 'error', error: error.message });
    }
});

productsRouter.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const updatedFields = req.body;
        const updatedProduct = await PM.updateProduct(pid, updatedFields);
        res.status(200).json({ status: 'success', payload: updatedProduct });
    } catch (error) {
        res.status(400).json({ status: 'error', error: error.message });
    }
});

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        await PM.deleteProduct(pid);
        res.status(200).json({ status: 'success', payload: `Product with id ${pid} deleted succesfully` });
    } catch (error) {
        res.status(400).json({ status: 'error', error: error.message });
    }
});

export default productsRouter;
