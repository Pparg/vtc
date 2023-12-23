import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";
import User from "./Users.mjs";
import Chofer from "./Chofers.mjs";

let Role = sequelize.define('Role', {
  id: {
    type: DataTypes.SMALLINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'roles',
  timestamps: false
})

User.belongsTo(Role, {foreignKey: 'role_id'})
Chofer.belongsTo(Role, {foreignKey: 'role_id'})

export default Role