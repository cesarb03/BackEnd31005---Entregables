//Arreglo donde cargo los productos
let dataProducts = [];

//GET - Muestra el array con los productos
export const allArray = (req, res) => {
    if(dataProducts.length > 0) {
        res.status(200).json(dataProducts)
    } else {
        res.status(200).send("<h1>INGRESA EL PRODUCTO EN LA SIGUIENTE RUTA --> /index.html</h1>")
    }
};

//POST - Agrega un nuevo producto con id
export const addProduct = (req, res) => {
    let objectId = 0;
    const { title, price, thumbnail } = req.body;
    if(!dataProducts.length) {
        objectId = 1;
    } else {
        let lasIndex = dataProducts.length - 1;
        let newId = dataProducts[lasIndex].id + 1;
        objectId = newId; 
    };

    let newProduct = {
        id: objectId,
        title,
        price: Number(price),
        thumbnail
    }
    dataProducts.push(newProduct);
    res.status(201).json(dataProducts)
};

//GET - Busca y muestra un producto segun su id
export const viewProduct = (req, res) => {
    const id = Number(req.params.id);
    if(dataProducts.length) {
        if(!isNaN(id)) {
            let prodSelected = dataProducts.find( prod => prod.id === id);
            if(prodSelected) {
                res.status(200).json(prodSelected);
            } else {
                res.status(404).json({ error: 'Producto no encontrado!'});
            }
        } else {
            res.status(400).json({ error: 'El ID debe ser un número!'});
        }
    
    } else {
        res.status(404).json({error: 'No se cuenta con ningun producto registrado'});
    }
};

//PUT - Actualiza un producto segun su id
export const updateProduct = (req, res) => {
    const id = Number(req.params.id);
    if(dataProducts.length) {
        if(!isNaN(id)) {
            const product = dataProducts.find(data => data.id == id);
            const newArray = dataProducts.filter(data => data.id !== id);
            if(product) {
                const { title, price, thumbnail } = req.body;
                let productToUpdate = {
                    id,
                    title,
                    price: Number(price),
                    thumbnail
                };
    
                dataProducts = [...newArray, productToUpdate];
                res.status(200).send('Producto actualizado!');
            } else {
                res.status(404).json({ error: 'Producto no encontrado!'});
            };
        } else {
            res.status(400).json({ error: 'El ID debe ser un número!'});
        };
    } else {
        res.status(404).json({error: 'No se cuenta con productos para actualizar'});
    }
};

//DELETE - Borra un producto segun su id
export const deleteProduct = (req, res) => {
    const id = Number(req.params.id);
    if(dataProducts.length) {
        if(!isNaN(id)) {
            const newAllProducts = dataProducts.filter(data => data.id !== id);
            dataProducts = newAllProducts;
            res.status(200).send('Producto eliminado!');
        } else {
            res.status(400).json({ error: 'ID debe ser un numero!'});
        };
    } else {
        res.status(404).json({error: 'No se cuenta con productos para eliminar'});
    };
};
