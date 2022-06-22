//Arreglo donde cargo los productos
let dataProducts = [];

//Formulario
export const getForm = (req, res) => {
  res.status(200).render("formAddProduct");
};

//Listado de productos
export const getProducts = (req, res) => {
  res.status(200).render("listProducts", { dataProducts });
};

//POST - Agrega un nuevo producto con id
export const addProduct = (req, res) => {
  let objectId = 0;
  const { title, price, thumbnail } = req.body;
  if (!dataProducts.length) {
    objectId = 1;
  } else {
    let lasIndex = dataProducts.length - 1;
    let newId = dataProducts[lasIndex].id + 1;
    objectId = newId;
  }

  let newProduct = {
    id: objectId,
    title,
    price: Number(price),
    thumbnail,
  };
  dataProducts.push(newProduct);
  res.status(201).redirect("/productos");
};
