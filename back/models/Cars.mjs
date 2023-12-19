import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";


let Car = sequelize.define('Car', {
  id: {
    type: DataTypes.SMALLINT,
    primaryKey: true,
    autoIncrement: true
  },
  model: {
    type: DataTypes.STRING(80),
    allowNull: false
  },
  brand: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  seats: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'cars',
})


export default Car