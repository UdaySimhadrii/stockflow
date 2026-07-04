import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

export class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'organizations', key: 'id' },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
      set(value) {
        this.setDataValue('sku', String(value).trim().toUpperCase());
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    quantityOnHand: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 },
    },
    costPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: { min: 0 },
    },
    sellingPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: { min: 0 },
    },
    lowStockThreshold: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { min: 0 },
    },
    lastUpdatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'users', key: 'id' },
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
    indexes: [
      { unique: true, fields: ['organizationId', 'sku'] },
      { fields: ['organizationId'] },
    ],
  }
);

export default Product;
