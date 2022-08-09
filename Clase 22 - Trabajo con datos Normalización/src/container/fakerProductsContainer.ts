import { faker } from '@faker-js/faker';
faker.locale = 'es'

class FakerProductsContainer {
    
    memoryProducts: any[]
    constructor() {
        this.memoryProducts = []
    }

    listFakerProducts (qty = 5) {
        const fakerProductsArray = []
        for (let i = 0; i < qty; i++) {
            const product= {
                code: faker.random.word(),
                name: faker.commerce.productName(),
                price: Number(faker.commerce.price()),
                stock: Number(faker.random.numeric()),
                description: faker.commerce.productDescription(),
                photoURL: faker.image.imageUrl(),  
            }
            fakerProductsArray.push(product)
        }
        return fakerProductsArray
    }
}

export default FakerProductsContainer

// export const productsTest = async (req: Request, res: Response) => {
//     const products: product[] = []
//     const cantidad = req.query.cant || 5
//     let id = 1
//       for (let i = 1; i <= cantidad; i++) {
//         const prod: product = {
//           id: id++,
//           name: faker.commerce.product(),
//           price: Number(faker.commerce.price()),
//           photoURL: faker.image.abstract()
//         };
//         products.push(prod);
//       }
    //   res.json({
    //     products
    // })