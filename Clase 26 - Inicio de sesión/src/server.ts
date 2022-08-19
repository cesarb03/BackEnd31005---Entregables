import express from "express";
import auth from './middlewares/auth'
import { Server as IOServer } from "socket.io";
import path from "path";
import dotenv from "dotenv";
import products from "./container/dbProductsContainer";
import chat from "./container/chatContainer";
import normalizeAndDenormalize from "./utils/normalizr";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import sessionLogin from "./routes/session/login"
import sessionLogout from "./routes/session/logout"
import sessionRegister from "./routes/session/register"
import User from './models/schema/user'
import mongoose from "mongoose";
import flash from "connect-flash";
import config from './db/db'


declare module 'express-session' {
  export interface SessionData {
    user: string;
    logged: boolean;
    contador: number;
    admin: boolean;
  }
}

//DOTENV
dotenv.config();
const port = process.env.PORT;

//SERVER
const app = express();
const serverExpress = app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

const io = new IOServer(serverExpress);

//MIDDLEWARES
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CONFIGURACION MOTOR DE PLANTILLAS EJS
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

const mongoOptions: any = { useNewUrlParser: true, useUnifiedTopology: true };
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        config.mongoDB.URI,
      mongoOptions,
    }),
    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
    rolling: true, // Reinicia el tiempo de expiracion con cada request
    cookie: {
      maxAge: 600000,
    },
  })
);

mongoose.connect(
  config.mongoDB.URI,
    mongoOptions,
  (err) => {
    try {
      console.log("Connected to MongoDB Atlas");
    } catch (err) {
      throw err;
    }
  }
);

//PASSPORT
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.serializeUser((user: any, done: any) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});


//RUTAS
app.use("/login", sessionLogin);
app.use("/logout", sessionLogout);
app.use("/register", sessionRegister);

app.get("/", auth, async (req, res: express.Response) => {
  res.render("home", { logged: true, user: req.user });
});

//SOCKET
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
