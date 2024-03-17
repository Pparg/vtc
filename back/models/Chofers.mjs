import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";
import Role from "./Roles.mjs";


let Chofer = sequelize.define('Chofer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  valid_account: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  role_id: {
    type: DataTypes.SMALLINT,
    references: {
      model: 'roles',
      key: 'id'
    }
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
  tableName: 'chofers',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
})

export default Chofer