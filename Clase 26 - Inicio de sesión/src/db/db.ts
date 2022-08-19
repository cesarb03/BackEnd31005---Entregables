import dotenv from 'dotenv'
dotenv.config()

export default {
    mongoDB: {
      URI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      }
}


export const configMariaDB = {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '',
      database: process.env.DB_MARIADB_NAME,
    },
    pool: {
      min: 0,
      max: 7,
    },
  }
  
