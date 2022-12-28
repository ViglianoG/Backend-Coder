import express from "express";
import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";

const app = express();
const port = 8080;
const httpServer = app.listen(port, () =>
  console.log(`Corriendo en el puerto ${port}`)
);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado.");
  socket.on("message", (data) => {
    console.log("SERVER: ", data);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

export default io;
