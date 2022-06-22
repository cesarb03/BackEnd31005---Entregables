//Entregable Clase 2

class Usuario{
    constructor(nombre, apellido, libro, AutorLibro, mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = [{Libro: libro, Autor: AutorLibro}]
        this.mascotas = [mascotas]
    }
    getFullName(){
        
        return `El nombre del usuario es: ${this.nombre} ${this.apellido}`
    }
    addMascota(mascota){
        this.mascotas.push(mascota)
        console.log(this.mascotas)
    }
    countMascotas(){
        let totalMascotas = this.mascotas.length
        return `${this.nombre} tiene ${totalMascotas} mascotas en total.`
    }
    addBook(nvoLibro, nvoAutor){
        this.libros.push({ Libro: nvoLibro, Autor: nvoAutor}) 
        console.log(this.libros)
    }
    getBooksNames(){
        let listaLibros = this.libros.map((data) => data.Libro)
        return `${this.nombre} tiene los siguientes libros: ${listaLibros}`
    }
}

const user1 = new Usuario("Cesar", "Bergamasco", "Harry Potter", "J. K. Rowling", "Perra")
console.log(user1.getFullName())
user1.addMascota("Coneja")
console.log(user1.countMascotas())
user1.addBook('La Biblia', null)
console.log(user1.getBooksNames())
