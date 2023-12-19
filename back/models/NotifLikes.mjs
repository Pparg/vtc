import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";
import User from "./Users.mjs";
import Notification from "./Notifications.mjs";


let NotifLike = sequelize.define('NotifLike', {
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
  notification_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'notifications',
      key: 'id'
    }
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  tableName: 'notif_likes',
  timestamps: false
})

User.belongsToMany(Notification, { through: NotifLike });
Notification.belongsToMany(User, { through: NotifLike });