import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";

let User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  birthday: {
    type: DataTypes.DATE
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  }, 
  phone_number: {
    type: DataTypes.STRING(20),
  }, 
  has_accepted_terms: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  newsletter: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  last_login: {
    type: DataTypes.DATE,
  },
  role_id: {
    type: DataTypes.SMALLINT,
    references: {
      model: 'roles',
      key: 'id'
    }
  }
}, {
  tableName: 'users',
  timestamps: false
})

export default User
