import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config({path: '../.env'})


let sequelize = new Sequelize('63vtc', 'postgres', `${process.env.DB_PASSWORD}`, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  port: 5433
})

export default sequelize
