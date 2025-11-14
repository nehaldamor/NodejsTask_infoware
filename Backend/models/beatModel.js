import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import User from "./userModel.js";

const Beat = sequelize.define("Beat", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  salesmanId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

 
  area: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: true },
  pincode: { type: DataTypes.STRING, allowNull: true },

  
  beatName: { type: DataTypes.STRING, allowNull: true },
});


User.hasMany(Beat, { foreignKey: "salesmanId" });
Beat.belongsTo(User, { foreignKey: "salesmanId" });

export default Beat;
