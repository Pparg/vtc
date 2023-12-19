import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";

let Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  type: {
    type: DataTypes.STRING(60),
  }
}, {
  tableName: 'notifications',
  timestamps: false
})

export default Notification