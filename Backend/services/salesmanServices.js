import Beat from "../models/beatModel.js";
import User from "../models/userModel.js";
import Attendance from "../models/attendanceModel.js";
import Visit from "../models/visitModel.js";
import Order from "../models/orderModel.js";
import { Op } from "sequelize";
// Admin assigns a beat to a salesman
export const assignBeatService = async (salesmanId, area, city, pincode, beatName) => {
  const beat = await Beat.create({ salesmanId, area, city, pincode, beatName });
  return beat;
};

// Salesman views all their beats
export const getBeatsBySalesmanService = async (salesmanId) => {
  return await Beat.findAll({ where: { salesmanId }, order: [["id", "DESC"]] });
};


// 🧱 Mark attendance (check-in)
export const markAttendanceService = async (salesmanId) => {
  const today = new Date().toISOString().slice(0, 10);

  // Check if already marked today
  const existing = await Attendance.findOne({
    where: { salesmanId, date: today },
  });

  if (existing) throw new Error("Attendance already marked for today");

  const attendance = await Attendance.create({
    salesmanId,
    date: today,
    checkInTime: new Date(),
  });

  return attendance;
};

// 🕒 Mark checkout
export const markCheckoutService = async (salesmanId) => {
  const today = new Date().toISOString().slice(0, 10);

  const attendance = await Attendance.findOne({
    where: { salesmanId, date: today },
  });

  if (!attendance) throw new Error("No check-in record for today");
  if (attendance.checkOutTime) throw new Error("Already checked out today");

  attendance.checkOutTime = new Date();
  await attendance.save();
  return attendance;
};

// 📋 Admin view all attendance
export const getAllAttendanceService = async () => {
  return await Attendance.findAll({
    include: [{ model: User, attributes: ["id", "name", "email"] }],
    order: [["date", "DESC"]],
  });
};



// Log a visit
export const logVisitService = async (salesmanId, sellerId, beatId, remarks, feedback) => {
  const visit = await Visit.create({
    salesmanId,
    sellerId,
    beatId,
    remarks,
    feedback,
  });
  return visit;
};

// Get all visits for a salesman
export const getVisitsBySalesmanService = async (salesmanId) => {
  return await Visit.findAll({
    where: { salesmanId },
    include: [
      { model: Beat },
      { model: User, as: "seller", attributes: ["id", "name", "email", "city", "pincode"] },
    ],
    order: [["visitDate", "DESC"]],
  });
};

// Admin view all visits
export const getAllVisitsService = async () => {
  return await Visit.findAll({
    include: [
      { model: User, as: "salesman", attributes: ["id", "name", "email"] },
      { model: User, as: "seller", attributes: ["id", "name", "email"] },
      { model: Beat },
    ],
    order: [["visitDate", "DESC"]],
  });
};

export const getSalesmanDashboardService = async (salesmanId) => {
  const today = new Date().toISOString().slice(0, 10);

  // ✅ 1. Total visits
  const totalVisits = await Visit.count({ where: { salesmanId } });

  // ✅ 2. Distinct stores covered (unique sellerIds)
  const storesCoveredData = await Visit.findAll({
    where: { salesmanId },
    attributes: ["sellerId"],
    group: ["sellerId"],
  });
  const totalStoresCovered = storesCoveredData.length;

  // ✅ 3. Orders placed by salesman (secondary sales)
  const totalOrders = await Order.count({
    where: { createdBySalesmanId: salesmanId },
  });

  // ✅ 4. Attendance today
  const todayAttendance = await Attendance.findOne({
    where: { salesmanId, date: today },
  });

  return {
    totalVisits,
    totalStoresCovered,
    totalOrders,
    attendanceMarked: !!todayAttendance,
    checkInTime: todayAttendance ? todayAttendance.checkInTime : null,
    checkOutTime: todayAttendance ? todayAttendance.checkOutTime : null,
  };
};