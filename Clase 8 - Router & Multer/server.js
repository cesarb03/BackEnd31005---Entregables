import express from 'express'
const app = express()
const puerto = 8080
//Para poder usar el ${__dirname} en ES6. Hay que definir _dirname en proyectos con ES Modules
import path from 'path';
import { fileURLToPath } from 'url';
// import cookieParser from 'cookie-parser';
import productRouter from './api/productos.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// app.use(cookieParser)
//Config. basica para acceder al req.body
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
//Apunta a la carpeta public donde esta el index.html
// app.use('/index.html', express.static(path.join(__dirname, 'public')));
//Para que el html se muestre directamente en el root
app.use(express.static(path.join(__dirname, 'public')))


app.use('/api/productos', productRouter)

// app.use((error, req, res) => {
//     res.status(error.httpStatusCode).send(error)
// })

app.listen(puerto, function(err){
    if (err) console.log(err)
    console.log(`Servidor escuchando el puerto: ${puerto}`)
})
    