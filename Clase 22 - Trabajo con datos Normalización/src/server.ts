import express from 'express'
import routes from './routes/routes'
import auth from './middlewares/auth'
import wrongRoute from './middlewares/wrongRoute'
import { Server as IOServer } from 'socket.io'
import path from "path";
import { fileURLToPath } from "url";
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
import dotenv from 'dotenv'
dotenv.config()
import products from './container/dbProductsContainer';
import chat from './container/chatContainer'
import { engine } from "express-handlebars";
const port = process.env.PORT
const app = express()


const serverExpress = app.listen(port, () => { 
    console.log(`Server listening on port: ${port}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(auth)
app.use('/api', routes)
app.use(express.static(path.join(__dirname, '../public')))

// app.get('/api/products-tests', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/indexFaker.html'))
//   });

// app.use(wrongRoute)//Middleware: checks not implemented route.

const io = new IOServer(serverExpress)


io.on('connection', async (socket) => {
    console.log(`Se conectó un usuario: ${socket.id}`);
    socket.emit('server:product', await products.getAll())
    socket.emit('server:message', await chat.getAllMessages())

    socket.on('client:product', async (productInfo) => {
        products.addProduct(productInfo)
        io.emit('server:product', await products.getAll())
    })

    socket.on('client:message', async (messageInfo) => {
        chat.addMessage(messageInfo)
        io.emit('server:message', await chat.getAllMessages())
    })
})