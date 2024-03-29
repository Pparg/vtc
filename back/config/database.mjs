import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

let sequelize = new Sequelize('63vtc', 'postgres', `${process.env.DB_PASSWORD}`, {
  host: 'localhost',
  dialect: 'postgres',
  logging: (query) => {
    console.log(query)
  },
  port: 5433
})

export default sequelize
