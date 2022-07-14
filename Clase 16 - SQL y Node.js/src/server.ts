import express from 'express'
import routes from './routes/routes'
import auth from './middlewares/auth'
import wrongRoute from './middlewares/wrongRoute'
import { Server as IOServer } from 'socket.io'
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import dotenv from 'dotenv'
const port = process.env.PORT
const app = express()
import products from './container/productsContainer';
import chat from './container/chatContainer'
dotenv.config()


const serverExpress = app.listen(port, function(err): any {
    if (err) console.log(err);
    console.log(`Servidor escuchando el puerto: ${port}`)
  });

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(auth)
app.use('/api', routes)
app.use(wrongRoute)//Middleware: checks not implemented route.


app.listen(port, () => { 
    console.log(`Server listening on port: ${port}`)
})

const io = new IOServer(serverExpress)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, './public')))
app.use(wrongRoute)



io.on('connection', async (socket) => {
    socket.emit('server:products', await products.getAll())
    socket.emit('server:message', await chat.getAllMessages())

    socket.on('client:product', async (productInfo) => {
        products.addProduct(productInfo)
        io.emit('server:products', await products.getAll())
    })

    socket.on('client:message', async (messageInfo) => {
        chat.addMessage(messageInfo)
        io.emit('server:message', await chat.getAllMessages())
    })
})