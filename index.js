// const http = require('http')
// const puerto = 8080

// const server = http.createServer((req, res) => {
//     const hora = new Date().getHours()
//     if(hora >= 6 && hora <= 12)
//         res.end('Buen día')
//     else if(hora >= 13 && hora <= 20)
//         res.end('Buenas tardes')
//     else if(hora >= 20 || hora <= 5)
//         res.end('Buenas noches')
// })

// server.listen(puerto, () => {
//     console.log(`Server escuchando puerto ${puerto}`)
// })


const express = require('express')
const app = express()
const puerto = 8080
let visitas = 0
const moment = require ('moment')
moment.locale('es')

app.get('/', (req, res) => {
    res.send('<h1 style="color:blue">Bienvenidos al servidor Express</h1>')
})

app.get('/visitas', (req, res) => {
    visitas ++
    res.send(`Se están recibiendo ${visitas} visitas`)
})

app.get('/fyh', (req, res) => {
    res.send(`Hoy es: ${moment().format('DD/MM/YYYY       HH:mm:ss')}`)
})

app.listen (puerto, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`)
})