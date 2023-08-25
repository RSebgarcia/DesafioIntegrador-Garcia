import express from "express";
import __dirname from '../utils.js';
import ProductManager from "../dao/ProductManager.js";


const viewsRouter = express.Router();
const PM = new ProductManager();
viewsRouter.get("/", async(req, res) => {
    
        const products =await PM.getAllProducts();
        res.render("home", { products });
    });

viewsRouter.get("/realtimeproducts", (req, res) => {
    try {
        const productsData = PM.getAllProducts();
        res.render("realTimeProducts", { productsData });
    } catch (error) {
        console.error("Error reading products file:", error);
        res.status(500).send("Failed to retrieve products");
    }
});

viewsRouter.get("/chat", (req,res)=>{
    res.render("chat")
})


export default viewsRouter;
