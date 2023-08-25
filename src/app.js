import express from "express";
import __dirname from "./utils.js";
import exphbs from "express-handlebars";
import viewsRouter from "./routes/views.routes.js"
import { Server } from "socket.io";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import mongoose from "mongoose";
import { productModel } from "./dao/models/product.model.js";
import ChatManager from "./dao/ChatManager.js";

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
//agrego mongo
mongoose.connect('mongodb+srv://rodrigarcia455:coder123@clustercoder.zknoder.mongodb.net/PracticaIntegradora?retryWrites=true&w=majority');

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

const CM= new ChatManager()

//Defino los mensajes de mi Servidor Socket
io.on('connection',  (socket) => {
    console.log('A user connected');

    socket.on("newMessage", async (data)=>{
        CM.createMessage(data)
        const messages = await CM.getMessages();
        socket.emit("messages", messages)
    })
});



