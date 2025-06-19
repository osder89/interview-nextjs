import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/db";


class Reviews extends Model {
    declare id: number;
    declare userId: number;
    declare booktitle: string;
    declare rating: number;
    declare review: string;
    declare mood: string;
    declare createdAt: Date;
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
