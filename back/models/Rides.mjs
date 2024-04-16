import { Sequelize, DataTypes, TIME } from "sequelize";
import sequelize from "../config/database.mjs";
import User from "./Users.mjs";

let Ride = sequelize.define('Ride', {
  id: {
    type: DataTypes.BIGINT,
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
  chofer_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'chofers',
      key: 'id'
    }
  },
  destination: {
    type: DataTypes.TEXT, 
    allowNull: false
  },
  departure: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  hour: {
    type: DataTypes.TIME,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  comments: {
    type: DataTypes.TEXT
  },
  number_of_people: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  distance_km: {
    type: DataTypes.DECIMAL(6,2),
  },
  estimated_time: {
    type: DataTypes.TIME,
  }
}, {
  tableName: 'rides',
  timestamps: false
}
)

Ride.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
})
User.hasMany(Ride, {
  foreignKey: 'user_id',
  as: 'user'
})

export default Ride