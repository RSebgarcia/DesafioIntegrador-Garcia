import express from "express";
import __dirname from "./utils.js";
import exphbs from "express-handlebars";
import viewsRouter from "./routes/views.routes.js"
import { Server } from "socket.io";
import fs from "fs"
import path from "path";


const app = express();
const puerto = 8080;
const httpServer = app.listen(puerto, () => {
    console.log("Servidor Activo en el puerto: " + puerto);
});
const io = new Server(httpServer);
//defino plantillas del sv
app.engine("handlebars", exphbs.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", viewsRouter);

//Defino los mensajes de mi Servidor Socket
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('addProduct', (productData) => {
        const productsFilePath = path.join(__dirname, "public/storage/products.json");
        fs.readFile(productsFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading products file:', err);
                return;
            }
            const existingProducts = JSON.parse(data);
            existingProducts.push(productData);
            fs.writeFile(productsFilePath, JSON.stringify(existingProducts, null, 2), (err) => {
                if (err) {
                    console.error('Error writing products file:', err);
                    return;
                }
                io.emit('newProductAdded', productData);
            });
        });
    });
});
