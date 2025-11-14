import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import User from "./userModel.js";

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sellerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(
      "pending",
      "accepted",
      "rejected",
      "packed",
      "readyForDispatch",
      "inDelivery",
      "delivered"
    ),
    defaultValue: "pending",
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
  createdBySalesmanId: {
  type: DataTypes.INTEGER,
  allowNull: true, // only filled when salesman creates secondary sales
},
});

//  Relations
User.hasMany(Order, { foreignKey: "customerId", as: "customerOrders" });
User.hasMany(Order, { foreignKey: "sellerId", as: "sellerOrders" });
Order.belongsTo(User, { foreignKey: "customerId", as: "customer" });
Order.belongsTo(User, { foreignKey: "sellerId", as: "seller" });

export default Order;
