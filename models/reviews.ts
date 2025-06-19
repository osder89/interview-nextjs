import { DataTypes, Model, BelongsToGetAssociationMixin } from 'sequelize'
import sequelize from '../utils/db'
import User from './user'

class Reviews extends Model {
  declare id: number
  declare userId: number
  declare booktitle: string
  declare rating: number
  declare review: string
  declare mood: string
  declare createdAt: Date

  declare getUser: BelongsToGetAssociationMixin<typeof User>
}

Reviews.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    booktitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    mood: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Reviews',
    tableName: 'reviews',
    timestamps: true
  }
)

Reviews.belongsTo(User, { foreignKey: 'userId', as: 'User' })
User.hasMany(Reviews, { foreignKey: 'userId', as: 'reviews' })

export default Reviews