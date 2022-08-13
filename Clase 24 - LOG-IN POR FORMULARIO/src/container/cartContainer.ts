import fs from 'fs'
import { cart } from '../interfaces/cart'
import { storedProduct } from '../interfaces/storedProduct'

class cartContainer {
    private static fileName: string
    private readonly productFilePath: string
  
    constructor(fileName: string) {
      cartContainer.fileName = fileName
      this.productFilePath = './src/db/products.txt'

      if (!fs.existsSync(`./${cartContainer.fileName}`)) {
        fs.promises
          .writeFile(`./${cartContainer.fileName}`, ``)
          .then(() => console.log(`${cartContainer.fileName} created`));
        }
    }

    private readonly writeFile = async (data: cart[]): Promise<void> => {
        try {
            await fs.promises.writeFile(cartContainer.fileName, JSON.stringify(data, null, 2))
        } catch (err: any) {
            console.log('Method: writeFile, ', err)
        }
    }

    private readonly readCartFile = async (): Promise<cart[]> => {
        try {
            return (await fs.promises.readFile(cartContainer.fileName, 'utf8'))
                ? JSON.parse(await fs.promises.readFile(cartContainer.fileName, 'utf8'))
                : ([] as cart[])
        } catch (err: any) {
            //Si el archivo NO existe, entonces lo crea.
            if (err.errno === -2) {
                try {
                    await fs.promises.writeFile(cartContainer.fileName, JSON.stringify([]))
                    return [] as cart[]
                } catch (err: any) {
                    console.error('Method: readFile: could not create file in such directory.', err)
                }
            } else {
                console.log('Method readFile: ', err)
            }
            return [] as cart[]
        }
    }

    private readonly readProductsFile = async (): Promise<storedProduct[]> => {
        try {
            return (await fs.promises.readFile(this.productFilePath, 'utf8'))
                ? JSON.parse(await fs.promises.readFile(this.productFilePath, 'utf8'))
                : ([] as storedProduct[])
        } catch (err: any) {
            //Si el archivo NO existe, entonces lo crea.
            if (err.errno === -2) {
                try {
                    await fs.promises.writeFile(this.productFilePath, JSON.stringify([]))
                    return [] as storedProduct[]
                } catch (err: any) {
                    console.error('Could not create file in such directory. ', err)
                }
            } else {
                console.log('Method readFile: ', err)
            }
            return [] as storedProduct[]
        }
    }
    //Crea un nuevo Cart
    public createNewCart = async (): Promise<number | Error> => {
        try {
            const carts = await this.readCartFile()
            const timestamp = new Date().toLocaleString("es-AR")

            if (carts.length === 0 || typeof carts === 'undefined') {
                await this.writeFile([{ cartId: 1, timestamp, products: [] }])
                return 1
            } else {
                const cartId = Math.max(...carts.map((object: cart) => object.cartId)) + 1
                await this.writeFile([...carts, { cartId, timestamp, products: [] }])
                return cartId
            }
        } catch (err: any) {
            console.error(err)
            return err
        }
    }
    //Elimina cart by ID
    public cartDeleteById = async (id: number): Promise<number | Error> => {
        try {
            const carts = await this.readCartFile()

            if (carts.length === 0 || typeof carts === 'undefined') {
                return -1
            } else {
                const newCart = carts.filter((object: cart) => object.cartId !== id)

                if (newCart.length === carts.length) {
                    return -2
                } else {
                    await this.writeFile(newCart)
                    return 200
                }
            }
        } catch (err: any) {
            console.error(err)
            return err
        }
    }
    //Trae todos los productos guardados en el cart seleccionado.
    public getProductsByCartId = async (id: number): Promise<storedProduct[] | Error> => {
        try {
            const carts = await this.readCartFile()
            const foundCart = carts.find((object: cart) => object.cartId === id)

            if (typeof foundCart !== 'undefined') {
                const cartProducts = foundCart.products
                if (cartProducts.length === 0) {
                    return new Error('Cart has no products.')
                } else {
                    return cartProducts
                }
            } else {
                return new Error('Cart not found')
            }
        } catch (err: any) {
            console.error(err)
            return err
        }
    }
    //Añade un producto al carrito target.
    public addToCartById = async (id: number, productId: storedProduct): Promise<void | storedProduct[] | Error> => {
        try {
            const nProductId = Number(productId.id)
            const carts = await this.readCartFile()//Almaceno todos los carts
            const foundCart = carts.find((object: cart) => object.cartId === id)//Selecciono el cart target

            const products = await this.readProductsFile()//Almaceno todos los productos de la tienda
            const productToAdd = products.filter((object: storedProduct) => {//Selecciono el producto elegido
                if (object.id === nProductId) {
                    return object
                }
            })
            if (productToAdd.length === 0) {
                return new Error(`There is no such product with id= ${nProductId}`)
            } else {
                if (typeof foundCart !== 'undefined' && typeof productToAdd !== 'undefined') {
                    const newProducts = [...foundCart.products, ...productToAdd]//Actualizo el nuevo array de productos añadidos al cart.
                    const newCart = carts.map((object: cart) =>
                        object.cartId === id ? { ...object, products: newProducts } : object//Almaceno dicho array al cart target.
                    )
                    await this.writeFile(newCart)
                    return productToAdd
                }
            }
        } catch (err: any) {
            console.error(err)
            return err
        }
    }
    //Elimina un producto target de un carrito target.
    public deleteProductByCartId = async (id: number, productId: number): Promise<void | Error> => {
        try {
            const carts = await this.readCartFile()//Almaceno todos los productos de la tienda
            const foundCart = carts.find((object: cart) => object.cartId === id)//Selecciono el cart target
            if (typeof foundCart !== 'undefined') {
                const newProducts = foundCart.products.filter(
                    (object) => object.id !== productId
                )
                if (newProducts.length === foundCart.products.length) {
                    return new Error(`Product id=${productId} not found in cart id=${id}.`)
                } else {
                    const newCart = carts.map((object) => object.cartId === id ? { ...object, products: newProducts } : object)
                    await this.writeFile(newCart)
                }
            } else {
                return new Error(`Cart id=${id} not found.`)
            }
        } catch (err: any) {
            console.error(err)
            return err
        }
    }
}

export default new cartContainer('./src/db/cart.txt')