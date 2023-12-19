import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";

let User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: true
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
