import knex from 'knex'

const configMariaDB = {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '',
      database: 'Clase_16',
    },
    pool: {
      min: 0,
      max: 7,
    },
  }
  
const configSQLite3 = {
    client: 'sqlite3',
    connection: {
      filename: './DB/ecommerce.sqlite',
    },
    useNullAsDefault: true,
  }

export const connectionDB = knex(configMariaDB);
export const connectionSQL = knex(configSQLite3);