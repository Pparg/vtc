import { Sequelize, DataTypes, TIME, SMALLINT } from "sequelize";
import sequelize from "../config/database.mjs";

let Review = sequelize.define('Review', {
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
  entity_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  user_grade: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  user_comment: {
    type: DataTypes.TEXT
  },
  chofer_comment: {
    type: DataTypes.TEXT
  },
  type: {
    type: DataTypes.ENUM('event', 'ride'),
    allowNull: false 
  }
}, {
  tableName: 'reviews',
  timestamps: false
}
)

export default Review