import express from "express";
import routes from "./routes/routes";
import auth from "./middlewares/auth";
import { Server as IOServer } from "socket.io";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import products from "./container/dbProductsContainer";
import chat from "./container/chatContainer";
import normalizeAndDenormalize from "./utils/normalizr";

const port = process.env.PORT;
const app = express();

const serverExpress = app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(auth);
app.use("/api", routes);
app.use(express.static(path.join(__dirname, "../public")));

// app.get('/api/products-tests', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/indexFaker.html'))
//   });

// app.use(wrongRoute)//Middleware: checks not implemented route.

const io = new IOServer(serverExpress);

let messages: any[] = [];

io.on("connection", async (socket) => {
  console.log(`Se conectó un usuario: ${socket.id}`);
  socket.emit("server:product", await products.getAll());
  socket.emit("server:message", messages);

  socket.on("client:product", async (productInfo) => {
    products.addProduct(productInfo);
    io.emit("server:product", await products.getAll());
  });

  socket.on("client:message", async (messageInfo) => {
    messageInfo.id = messages.length + 1;
    messages.push(messageInfo);
    chat.writeChatToFile(messages);
    //compression rate
    const denormalizedMessages = messages;
    const normalizedMessages = normalizeAndDenormalize("normalize", messages);
    const lengthNormalized = JSON.stringify(normalizedMessages).length;
    const lengthDenormalized = JSON.stringify(denormalizedMessages).length;
    let compressionRate = Math.round(
      (lengthNormalized * 100) / lengthDenormalized
    );
    console.log(`Compression Rate: ${(100 - compressionRate).toFixed(2)}%`);
    console.log(`Length Normalized: ${lengthNormalized}`);
    console.log(`Length Denormalized: ${lengthDenormalized}`);

    io.emit("server:message", messages);
  });
});
