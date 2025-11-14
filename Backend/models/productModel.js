import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import User from "./userModel.js";

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  unit: {
    type: DataTypes.STRING,
    defaultValue: "pcs",
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

// Relation: A Seller (User.role = 'seller') → has many Products
User.hasMany(Product, { foreignKey: "sellerId", onDelete: "CASCADE" });
Product.belongsTo(User, { foreignKey: "sellerId" });

export default Product;
