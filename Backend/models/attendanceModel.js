import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import User from "./userModel.js";

const Attendance = sequelize.define("Attendance", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  salesmanId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  checkInTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  checkOutTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

// Relations
User.hasMany(Attendance, { foreignKey: "salesmanId" });
Attendance.belongsTo(User, { foreignKey: "salesmanId" });

export default Attendance;
