import express from "express";
import { Server as IOServer } from "socket.io";
const app = express();
const puerto = 8080;
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const products = [];
const messages = [];

const serverExpress = app.listen(puerto, (err) => {
  if (err) console.log(err);
  console.log(`Servidor escuchando el puerto: ${puerto}`);
});
const io = new IOServer(serverExpress);

app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", (socket) => {
  console.log(`Se conectó un usuario: ${socket.id}`);
  io.emit("server:product", products);
  io.emit("server:message", messages);

  socket.on("client:product", (productInfo) => {
    products.push(productInfo);
    io.emit("server:product", products);
  });

  socket.on("client:message", (messageInfo) => {
    messages.push(messageInfo);
    io.emit("server:message", messages);
  });
});
