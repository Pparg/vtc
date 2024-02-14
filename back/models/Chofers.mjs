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
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  role_id: {
    type: DataTypes.SMALLINT,
    references: {
      model: 'roles',
      key: 'id'
    }
  }
}, {
  tableName: 'chofers',
  timestamps: false
})

export default Chofer