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
  name: {
    type: DataTypes.STRING(200),
    allowNull: true
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
    type: DataTypes.TEXT
  },
  latitude: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  longitude: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  tableName: 'address',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
})

User.hasMany(Address, {foreignKey: 'user_id'})
Address.belongsTo(User, {foreignKey: 'user_id'})

export default Address