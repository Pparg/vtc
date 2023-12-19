import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";
import User from "./Users.mjs";

let Address = sequelize.define('Address', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }, 
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  }, 
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  city: {
    type: DataTypes.TEXT,
    defaultValue: 'clermont-ferrand'
  },
  zip_code: {
    type: DataTypes.STRING(50),
    defaultValue: '63000'
  }, 
  country: {
    type: DataTypes.STRING(20),
    defaultValue: 'FR'
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'address'
})

User.hasMany(Address)
Address.belongsTo(User)

export default Address