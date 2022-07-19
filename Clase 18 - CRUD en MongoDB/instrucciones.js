//1º Crear Db "ecommerce" --> : use ecommerce

//2º y 3º Crear 2 collections "productos y "mensajes" (crear 10 doc. en c/u) --> db.coll.insert()

db.messages.insert([
    { email: 'cesar@gmail.com', date: '18/07/2022 17:00:00', message: 'Hola' },
    { email: 'daniela@gmail.com', date: '18/07/2022 17:01:00', message: 'Hola!' },
    { email: 'cesar@gmail.com', date: '18/07/2022 17:02:00', message: 'Como estas?' },
    { email: 'daniela@gmail.com', date: '18/07/2022 17:03:00', message: 'bien, y vos?' },
    { email: 'cesar@gmail.com', date: '18/07/2022 17:04:00', message: 'Excelente!' },
    { email: 'daniela@gmail.com', date: '18/07/2022 17:05:00', message: 'Me alegro' },
    { email: 'cesar@gmail.com', date: '18/07/2022 17:06:00', message: 'Estudiaste para el examen?' },
    { email: 'daniela@gmail.com', date: '18/07/2022 17:08:00', message: 'Estoy en eso' },
    { email: 'cesar@gmail.com', date: '18/07/2022 17:09:00', message: 'Genial, repasamos?' },
    { email: 'daniela@gmail.com', date: '18/07/2022 17:10:00', message: 'Si, dale!' }
])
db.products.insert([
    { name: 'Chicles', price: 149, thumbnail: 'https://i.ytimg.com/vi/PTGOxqKyE4M/maxresdefault.jpg' },
    { name: 'Chupetin', price: 4032, thumbnail: 'https://i.ytimg.com/vi/PTGOxqKyE4M/maxresdefault.jpg' },
    { name: 'Turron', price: 1039, thumbnail: 'https://i.ytimg.com/vi/PTGOxqKyE4M/maxresdefault.jpg' },
    { name: 'Caramelos', price: 3586, thumbnail: 'https://i.ytimg.com/vi/PTGOxqKyE4M/maxresdefault.jpg' },
    { name: 'Chocolate', price: 783, thumbnail: 'https://i.ytimg.com/vi/PTGOxqKyE4M/maxresdefault.jpg' },
    { name: 'Gomitas', price: 3452, thumbnail: 'https://i.ytimg.com/vi/PTGOxqKyE4M/maxresdefault.jpg' },
    { name: 'Heladito', price: 123, thumbnail: 'https://i.ytimg.com/vi/PTGOxqKyE4M/maxresdefault.jpg' },
    { name: 'Galletitas', price: 4539, thumbnail: 'https://i.ytimg.com/vi/PTGOxqKyE4M/maxresdefault.jpg' },
    { name: 'Cigarrillos', price: 201, thumbnail: 'https://i.ytimg.com/vi/PTGOxqKyE4M/maxresdefault.jpg' },
    { name: 'Pipas', price: 3000, thumbnail: 'https://i.ytimg.com/vi/PTGOxqKyE4M/maxresdefault.jpg' }
])

//4º Lista los duscumentos de cada collections
db.products.find().pretty()
db.messages.find().pretty()

//5º Cantidad de documentos de cada collections
db.products.estimatedDocumentCount()
db.messages.estimatedDocumentCount()

//6º CRUD en la collection "products"
    //a) Agregar un producto mas
    db.products.insertOne( { name: 'Puflitos', price: 200, thumbnail: 'https://i.ytimg.com/vi/PTGOxqKyE4M/maxresdefault.jpg' } )
    //b) Consultas por nombre específico.
        //- Listar por precios menores a 1000
        db.products.find({price:{$lt:1000}}, {_id:0, name:1}).pretty()
        //- Listar por precios entre 1000 y 3000
        db.products.find({$and: [{price:{$gte:1000}}, {price:{$lte:3000}}] }, {_id:0, name:1}).pretty()
        //- Listar por precios mayores a 3000
        db.products.find({price:{$gt:3000}}, {_id:0, name:1}).pretty()
        //- Consulta que traiga el nombre del 3er producto mas barato
        db.products.find({}, {_id:0, name:1}).sort({price: 1}).limit(1).skip(2)
    //c) Actualizar todos los productos, agregando el campo stock=100
    db.products.updateMany({}, {$set:{stock: 100}})
    //d) Cambiar el stock=0 los productos con precios mayores a 4000
    db.products.updateMany({price:{$gt:4000}}, {$set:{stock: 0}})
    //e) Borrar los productos con precios menos a 1000
    db.products.deleteMany({ price: { $lt: 1000 } })

//7º Crear user "pepe" clave:asd456 read only
// En el servidor para autenticar --> mongod --auth --dbpath ./base
db.createUser(
    {
      user: "pepe",
      pwd: "asd456",
      roles: [
         { role: "read", db: "ecommerce" }
      ]
    }
  )

//mongo -u pepe -p asd456

//8º Creé un user readWrite
db.createUser(
    {
      user: "cesar",
      pwd: "q1w2e3",
      roles: [
         { role: "readWrite", db: "ecommerce" }
      ]
    }
    )
//9º Creé el user root
db.createUser(
  {
    user: "root",
    pwd: "123456",
    roles: ["root"]
  }
  )

