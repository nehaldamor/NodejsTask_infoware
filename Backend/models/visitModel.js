import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import User from "./userModel.js";
import Beat from "./beatModel.js";

const Visit = sequelize.define("Visit", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  salesmanId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  sellerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  beatId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  visitDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  remarks: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  feedback: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Relations
User.hasMany(Visit, { foreignKey: "salesmanId", as: "salesmanVisits" });
Visit.belongsTo(User, { foreignKey: "salesmanId", as: "salesman" });

User.hasMany(Visit, { foreignKey: "sellerId", as: "sellerVisits" });
Visit.belongsTo(User, { foreignKey: "sellerId", as: "seller" });

Beat.hasMany(Visit, { foreignKey: "beatId" });
Visit.belongsTo(Beat, { foreignKey: "beatId" });

export default Visit;
