import {placeOrderService, getMyOrdersService,getNearbySellersService } from "../services/customerServices.js";
import Order from "../models/orderModel.js";
import Complaint from "../models/complaintModel.js";
import multer from "multer";
import fs from "fs";
import path from "path";

export const getNearbySellers = async (req, res) => {
  try {
    const sellers = await getNearbySellersService(req.query);
    res.json({ count: sellers.length, sellers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const placeOrder = async (req, res) => {
  try {
    const customerId = req.user.id;
    const { sellerId, products, address } = req.body;

    if (!sellerId || !products || products.length === 0)
      return res.status(400).json({ success: false, message: "Seller & products are required" });

    const order = await placeOrderService(customerId, sellerId, products, address);
    res.status(201).json({ success: true, message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
//  Get all orders for current customer
export const getMyOrders = async (req, res) => {
  try {
    const customerId = req.user.id;
    const orders = await getMyOrdersService(customerId);
    res.json({ success: true, count: orders.length, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ---------- Multer setup for optional image ----------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/complaints";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `complaint-${Date.now()}${path.extname(file.originalname)}`);
  },
});
export const uploadComplaintImage = multer({ storage });

// ---------- Raise Complaint ----------
export const raiseComplaint = async (req, res) => {
  try {
    const customerId = req.user.id;
    const { orderId, description } = req.body;
    const image = req.file ? req.file.path : null;

    if (!orderId || !description)
      return res.status(400).json({ success: false, message: "Order ID and description required" });

    const complaint = await Complaint.create({
      customerId,
      orderId,
      description,
      image,
    });

    res.status(201).json({ success: true, message: "Complaint raised", complaint });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------- View My Complaints ----------
export const getMyComplaints = async (req, res) => {
  try {
    const customerId = req.user.id;
    const complaints = await Complaint.findAll({
      where: { customerId },
      include: [{ model: Order }],
      order: [["id", "DESC"]],
    });

    res.json({ success: true, count: complaints.length, complaints });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
