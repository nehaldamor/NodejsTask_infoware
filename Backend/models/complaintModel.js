import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import User from "./userModel.js";
import Order from "./orderModel.js";

const Complaint = sequelize.define("Complaint", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  customerId: { type: DataTypes.INTEGER, allowNull: false },
  orderId: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: true },
  status: {
    type: DataTypes.ENUM("open", "resolved"),
    defaultValue: "open",
  },
});

// Relations
User.hasMany(Complaint, { foreignKey: "customerId" });
Complaint.belongsTo(User, { foreignKey: "customerId" });
Order.hasMany(Complaint, { foreignKey: "orderId" });
Complaint.belongsTo(Order, { foreignKey: "orderId" });

export default Complaint;
