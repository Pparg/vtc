import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/database.mjs";


let Availability = sequelize.define('Availability', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  chofer_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'chofers',
      key: 'id'
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: false
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
  tableName: 'availability',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
})

export default Availability