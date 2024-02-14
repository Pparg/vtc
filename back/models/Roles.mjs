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

Role.hasMany(User, {
  foreignKey: 'role_id',
  sourceKey: 'id',
  as: 'user_role'
})

Role.hasMany(Chofer, {
  foreignKey: 'role_id',
  sourceKey: 'id',
  as: 'chofer_role'
})
User.belongsTo(Role, {
  foreignKey: 'role_id',
  targetKey: 'id',
  as: 'user_role'
})

Chofer.belongsTo(Role, {
  foreignKey: 'role_id',
  targetKey: 'id',
  as: 'chofer_role'
})


export default Role