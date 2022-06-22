import Contenedor from "./index.js"

const productos = new Contenedor("productos.txt");

const objeto1 = {
  nombre: "Garbanzos",
  precio: 203,
  thumbnail:
    "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/040/363/products/garbanzos-31-fc5e033f03cb53716615981405601498-640-0.jpg",
};
const objeto2 = {
  nombre: "Cebada",
  precio: 230,
  thumbnail:
    "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/040/363/products/hisopos-caja11-9f2cf0d7c57f398f8416333590847488-640-0.jpg",
};
const objeto3 = {
  nombre: "Avellanas",
  precio: 203,
  thumbnail:
    "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/040/363/products/avellanas-11-bb9f48a6448a5fdf1316088964111337-640-0.jpg",
};

const test = async () => {
  await productos.save(objeto1);
  await productos.save(objeto2);
  await productos.save(objeto3);
  // console.log(await productos.getById(4))
  // console.log(await productos.getAll())
  console.log(await productos.deleteById(3));
  // console.log(await productos.deleteAll())
};

test();
