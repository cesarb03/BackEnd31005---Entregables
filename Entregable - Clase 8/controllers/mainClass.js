//DATA
let dataProducts = [];

//CONTROLLERS
//Main page
export const mainController = (req, res) => {
    if(dataProducts.length > 0) {
        res.status(200).json(dataProducts)
    } else {
        res.status(200).send("<h1>Por favor ingrese algún producto, yendo a la ruta /api/productos.html</h1>")
    }
};

//Add a new product - POST
export const addNewProduct = (req, res) => {
    let objectId = 0;
    const { nombre, price, url } = req.body;
    if(!dataProducts.length) {
        objectId = 1;
    } else {
        let lasIndex = dataProducts.length - 1;
        let newId = dataProducts[lasIndex].id + 1;
        objectId = newId; 
    };

    let newProduct = {
        id: objectId,
        nombre,
        price: Number(price),
        url
    }
    dataProducts.push(newProduct);
    res.status(201).redirect('index');
};

//Find a product by its ID
export const singleProduct = (req, res) => {
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

//Update a product base on his ID
export const updateProduct = (req, res) => {
    const id = Number(req.params.id);
    if(dataProducts.length) {
        if(!isNaN(id)) {
            const product = dataProducts.find(data => data.id == id);
            const newArray = dataProducts.filter(data => data.id !== id);
            if(product) {
                const { nombre, price, url } = req.body;
                let productToUpdate = {
                    id,
                    nombre,
                    price: Number(price),
                    url
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

//DELETE a product base on its ID
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
