import { error } from '../interfaces/error'
import { product } from '../interfaces/product'
import { storedProduct } from '../interfaces/storedProduct'
import { Knex } from 'knex'
import { configMariaDB } from '../db/db'


class DBProductsContainer {

    productList: storedProduct[]
    private db: Knex
    private table: string

    constructor(options: any, table: string) {
        this.productList = []
        this.db = require('knex')(options)
        this.table = table
        this.createTableIfNotExists()
    }

    private async createTableIfNotExists(): Promise<void> {
        if (!(await this.db.schema.hasTable(this.table))) {
            try {
                await this.db.schema.createTableIfNotExists(this.table, (table) => {
                    table.increments('id').primary()
                    table.string('title')
                    table.integer('price')
                    table.string('thumbnail')
                    table.integer('timestamp')
                });
            } catch (error) {
                console.error(error)
            }
        }
    }

    public async getAll(): Promise<storedProduct[]> {

        const products: storedProduct[] = await this.db.select('*').from(this.table)
        return products

    }

    public async getById(id: number): Promise<storedProduct | error> {
        try {
            const product: storedProduct = await this.db.select('*').where('id',id).from(this.table)

            if (product) return product
            else return { 
                error: 'Product not found.' 
            }
        } catch (err: any) {
            console.log('Method getById: ', err)
        }
        return { error: 'Fetch item method failed' }
    }

    public async addProduct(product: product): Promise<void> {
        try {
            const timestamp = Date.now()
            await this.db.insert({ ...product, timestamp }).into(this.table)
        }
        catch (err: any) {
            console.log('Method save: ', err)
        }
    }

    public async updateProductById(id: number, product: product): Promise<void | error> {
        try {
            await this.db.where('id',id)
              .update({title: product.name, price: product.price, thumbnail: product.photoURL})
                .from(this.table)
          } catch (err: any) {
            console.log('Method update: ', err)
          }
        }

    public async deleteProductById(id: number): Promise<void | error> {
        try {
            await this.db.delete('*').where('id',id).from(this.table)
           } catch (err: any) {
             console.log('Method deleteById: ', err)
           }
         }
}

export default new DBProductsContainer(configMariaDB, 'products')