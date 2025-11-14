import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import Order from "./orderModel.js";
import User from "./userModel.js";

const Delivery = sequelize.define("Delivery", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deliveryBoyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("assigned", "picked", "inTransit", "delivered", "returned"),
    defaultValue: "assigned",
  },
  proofImage: {
    type: DataTypes.STRING, // optional image URL for delivery proof
    allowNull: true,
  },
});

// 🔗 Relations
Order.hasOne(Delivery, { foreignKey: "orderId", onDelete: "CASCADE" });
Delivery.belongsTo(Order, { foreignKey: "orderId" });

User.hasMany(Delivery, { foreignKey: "deliveryBoyId", as: "deliveries" });
Delivery.belongsTo(User, { foreignKey: "deliveryBoyId", as: "deliveryBoy" });

export default Delivery;
