import express from "express";
import fs from "fs"
import path from 'path'
import __dirname from '../utils.js';

const viewsRouter = express.Router();
const productsFilePath = path.join(__dirname, "public/storage/products.json");

viewsRouter.get("/", (req, res) => {
    try {
        const productsData = fs.readFileSync(productsFilePath, "utf-8");
        const products = JSON.parse(productsData);
        res.render("home", { products });
    } catch (error) {
        console.error("Error reading products file:", error);
        res.status(500).send("Failed to retrieve products");
    }
});

viewsRouter.get("/realtimeproducts", (req, res) => {
    try {
        const productsData = fs.readFileSync(productsFilePath, "utf-8");
        const products = JSON.parse(productsData);
        res.render("realTimeProducts", { products });
    } catch (error) {
        console.error("Error reading products file:", error);
        res.status(500).send("Failed to retrieve products");
    }
});


export default viewsRouter;
