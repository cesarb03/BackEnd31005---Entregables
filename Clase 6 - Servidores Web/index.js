// const express = require('express')
import express from 'express';
const app = express()
const puerto = 8080
import fs from 'fs'
// const fs = require("fs");


class Contenedor{
    constructor(fileName){
        this.fileName = fileName
    }

async getAll(){
    try{
        let data = await fs.promises.readFile("./productos.txt", "utf-8")
        if (data) {
            let productsArray = JSON.parse(data)
            return productsArray
        }else{
            return (console.log(`No existe ningun objeto`))
        }
    }catch(err){
        return (console.log(`Hay un error: ${err}`))
    }
}

async getRandom() {
	try {
		let data = await fs.promises.readFile("./productos.txt", 'utf-8')
        if(data){
		    data = JSON.parse(data)
		    const productRamdom = data[Math.floor(Math.random() * data.length)]
		    return productRamdom
        }else{
            return (console.log(`No existe ningun objeto`))
        }
	}catch(err){
        return (console.log(`Hay un error: ${err}`))
    }
}
}

const productos = new Contenedor("productos.txt")

const objetos = async (req, res) => {
    const respuesta = await productos.getAll()
    res.send(respuesta)
}

const ramdom = async (req, res) => {
    const respuesta = await productos.getRandom()
    res.send(respuesta)
}

app.get('/productos', objetos)
app.get('/productoRandom', ramdom )

app.listen (puerto, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`)
})