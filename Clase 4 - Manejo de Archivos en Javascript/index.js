// function mostrarLetras(parametro1){
// for(let i=0; parametro1.length>i; i++){
//     let [deletreado] = parametro1[i]
//     return deletreado
// }
// }

// mostrarLetras("Bergamasco")
// setTimeout(mostrarLetras(), 2000)

// const fs = require('fs')

// const data = fs.readFileSync('./productos.txt', 'utf-8')
// console.log(data)

// const user = [{
//     name: "Cesar"
// }, {
//     name: "Roberto"
// }, {
//     name: "Pedro"
// }, {
//     name: "Juan"
// }]

//writeFileSync --> Sobrescribe
// fs.writeFileSync('./productos.TXT', JSON.stringify(user))//pasar arreglo a string
// const prueba= fs.readFileSync('./productos.txt', 'utf-8')//es un string, hay q parsearlo
// console.log(prueba[10])

// const prueba= JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'))
// console.log(prueba[3])

//appendFileAsync --> Agrega datos al archivo, no sobrescribe
// fs.appendFileSync('./productos.txt', JSON.stringify(user))
// prueba2= JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'))//string a objeto
// console.log(prueba2[2])
// fs.appendFileSync('./productos.txt', 'JOYAAAAAAAAAAAAAAA')

// console.log(fs.readFileSync('./productos.txt', 'utf-8'))

// try{
//     fs.writeFileSync('./productos.TXT', {})

// }
// catch(error){
//     console.log(`Esto es un error: `, error)
// }

// const fs = require('fs')

// fs.mkdir("./prueba", error => {
//     if(error){
//         console.log(`No se creo la carpeta: ${error}`)}
//     else{
//         console.log("Carpeta creada con éxito")}
// })

import fs from "fs";
// let arr= []

class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
    fs.promises.writeFile(`./${fileName}`, "");
    //cada vez que creemos una instancia de esta clase el contenido
    //va a quedar vacío. Para eso se puede usar el método existsSync de fs, el cual comprueba si
    //la ruta que se le pasa existe. En caso de que no exista crea este archivo.
    if (!fs.existsSync(`./${this.fileName}`)) {
      fs.promises
        .writeFile(`./${this.fileName}`, ``)
        .then(() => console.log(`${this.fileName} created`));
    }
  }

  async save(product) {
    try {
      let data = await fs.promises.readFile(`./${this.fileName}`, "utf-8");
      if (!data) {
        product.id = 1;
        // arr.push(product)
        const arr = [product];
        await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(arr));
        return product.id;
      } else {
        const contenido = JSON.parse(data);
        let lasIndex = contenido.length - 1;
        let newId = contenido[lasIndex].id + 1;
        product.id = newId;
        contenido.push(product);
        await fs.promises.writeFile(
          `./${this.fileName}`,
          JSON.stringify(contenido, null, 2)
        );
        return product.id ? product.id : null;
      }
    } catch (err) {
      console.log(`Hay un error: ${err}`);
    }
  }

  async getById(id) {
    try {
      let data = await fs.promises.readFile("./productos.txt", "utf-8");
      let productsArray = JSON.parse(data);
      let prodSelected = productsArray.find((prod) => prod.id === id);
      return prodSelected ? prodSelected : null;
    } catch (err) {
      console.log(`Hay un error: ${err}`);
    }
  }

  async getAll() {
    try {
      let data = await fs.promises.readFile("./productos.txt", "utf-8");
      let productsArray = JSON.parse(data);
      return productsArray ? productsArray : null;
    } catch (err) {
      console.log(`Hay un error: ${err}`);
    }
  }

  async deleteById(id) {
    try {
      let data = await fs.promises.readFile("./productos.txt", "utf-8");
      let productsArray = JSON.parse(data);
      let productsFilter = productsArray.filter((product) => product.id != id)
      await fs.promises.writeFile(
            "./productos.txt",
            JSON.stringify(productsFilter)
          );
      return (productsArray.length < id || id <= 0) ? `No existe el Id ${id}` : productsFilter
    } catch (err) {
      console.log(`Hay un error: ${err}`);
    }
  }

  async deleteAll() {
    try {
      let data = await fs.promises.readFile("./productos.txt", "utf-8");
      let productsArray = JSON.parse(data);
      productsArray.splice(0);
      await fs.promises.writeFile(
        `./${this.fileName}`,
        JSON.stringify(productsArray)
      );
      return "Todos los elementos fueron borrados con exito";
    } catch (err) {
      console.log(`Hay un error: ${err}`);
    }
  }
}

export default Contenedor;
