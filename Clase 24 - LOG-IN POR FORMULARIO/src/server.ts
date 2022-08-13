import express from "express";
import { Server as IOServer } from "socket.io";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import products from "./container/dbProductsContainer";
import chat from "./container/chatContainer";
import normalizeAndDenormalize from "./utils/normalizr";
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from "connect-mongo"; 

declare module 'express-session' {
  export interface SessionData {
    user: any
  }
}

const port = process.env.PORT;
const app = express();

const serverExpress = app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

const io = new IOServer(serverExpress);

app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CONFIGURACION MOTOR DE PLANTILLAS EJS    
app.set('views', path.join(__dirname, '../public'))
app.set('view engine', 'ejs')

const mongoOptions: any = { useNewUrlParser: true, useUnifiedTopology: true }
app.use(
    session({
      store: MongoStore.create({
        mongoUrl:
       'mongodb+srv://cesarb03:q1w2e3@project-backend.lwnru.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions,
      }),
      secret: "coderhouse",
      resave: false,
      saveUninitialized: false,
      rolling: true, // Reinicia el tiempo de expiracion con cada request
      cookie: {
        maxAge: 30000,
      },
    })
  );

//Login session Middleware
function checkUserSessionnn (req:any, res:any, next:any) {
  if (req.session?.user) {
      console.log('Acá llego, SI existe sesion')
      next()
  } 
  else {
      console.log('Acá llego, NO existe sesion')
      res.redirect('/login')
  }
  
}

//App Routes
app.get('/', checkUserSessionnn, (req, res) => {
  const name = req.session.user
  const userName = name.user
  res.render('home.ejs', { userName })
})

app.get("/login", (req, res)=>{
    if (req.session.user) return res.redirect("/")
    res.render('login.ejs')
})

app.post("/login", (req, res)=>{
    
    try {
        const user = req.body
        req.session.user = user
        res.redirect("/")
        
    } catch (err) {
        res.json({ error: true, message: err })
    }
})

app.get('/logout', (req, res) => {
    if (req.session?.user) {
        const name = req.session?.user
        const userName = name.user
        req.session.destroy(e => console.log(e))
        return res.render('logout.ejs', { userName })
    }
    res.redirect('/login')
})

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
