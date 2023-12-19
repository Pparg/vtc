import { Sequelize, DataTypes, TIME } from "sequelize";
import sequelize from "../config/database.mjs";

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
  car_id: {
    type: DataTypes.SMALLINT,
    references: {
      model: 'cars',
      key: 'id'
    }
  },
  address_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'address',
      key: 'id'
    }
  },
  review_id: {
    type: DataTypes.BIGINT,
    references: {
      model: 'reviews',
      key: 'id'
    }
  },
  destination: {
    type: DataTypes.TEXT, 
    allowNull: false
  },
  city: {
    type: DataTypes.STRING(100),
    defaultValue: 'clermont-ferrand',
  },
  zip_code: {
    type: DataTypes.STRING(20),
    defaultValue: '63000'
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
  accepted_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  distance_km: {
    type: DataTypes.DECIMAL(6,2),
    allowNull: false
  },
  estimated_price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  estimated_time: {
    type: DataTypes.TIME,
    allowNull: false
  }
}, {
  tableName: 'rides',
  timestamps: false
}
)

export default Ride