import mongoose from 'mongoose';
import { productModel } from './models/product.model.js';


class ProductManager {
    constructor() {
        this.products = []
    }


    async getAllProducts(limit) {
        return await limit ? productModel.find().limit(limit).lean() : productModel.find().lean();
    }

    async writeProductsData(products) {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        } catch (error) {
            console.error('Error writing products data:', error);
        }
    }


    async getProductById(id) {
        if (id.length === 24) {
            return productModel.find({ _id: id }).lean()
        } else {
            console.log("Id Not Found")
        }
    }

    async addProduct(product) {
        let codeExist = await productModel.findOne({ code: product.code })

        if (codeExist) {
            throw new Error(`This code is already being used`);
        } else {
            const producto = {
                title: product.title,
                description: product.description,
                code: product.code,
                price: product.price,
                status: product.status,
                stock: product.stock,
                category: product.category,
                thumbnails: product.thumbnails
            }
            await productModel.create(producto)
            console.log(producto)
            console.log("Product Added correctly")
            return product;
        }

    }

    async updateProduct(productId, updatedFields) {
        try {
            if (await this.getProductById(productId)) {
                await productModel.updateOne({ _id: productId}, updatedFields);
                console.log("Product Updated")
                return true;
            }
            return false
        } catch (error) {
            console.log("Id not found")
            return false
        }

    }
    

    async deleteProduct(productId) {
        try {
            if (await this.getProductById(productId)) {
                await productModel.deleteOne({ _id: productId });
                console.log("Product Deleted")
                return true;
            }
            return false
        } catch (error) {
            console.log("Id not found")
            return false
        }
    }
}

export default ProductManager;
