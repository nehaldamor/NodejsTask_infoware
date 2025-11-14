import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import { Op } from "sequelize";

export const getSellerDashboardSummary = async (sellerId) => {
  const totalOrders = await Order.count({ where: { sellerId } });
  const pendingOrders = await Order.count({ where: { sellerId, status: "pending" } });
  const deliveredOrders = await Order.count({ where: { sellerId, status: "delivered" } });
  const totalProducts = await Product.count({ where: { sellerId } });
  const activeProducts = await Product.count({ where: { sellerId, isActive: true } });

  return {
    totalOrders,
    pendingOrders,
    deliveredOrders,
    totalProducts,
    activeProducts,
  };
};
// Add new product
export const addProduct = async (sellerId, data) => {
  return await Product.create({
    ...data,
    sellerId, // link product with the logged-in seller
  });
};

// Get all products of a seller
export const getSellerProducts = async (sellerId) => {
  return await Product.findAll({
    where: { sellerId },
    order: [["id", "DESC"]],
  });
};

// Update product
export const updateProduct = async (sellerId, productId, data) => {
  const product = await Product.findOne({ where: { id: productId, sellerId } });
  if (!product) throw new Error("Product not found");
  await product.update(data);
  return product;
};

// Delete product
export const deleteProduct = async (sellerId, productId) => {
  const product = await Product.findOne({ where: { id: productId, sellerId } });
  if (!product) throw new Error("Product not found");
  await product.destroy();
  return true;
};

// 🔍Get product by ID
export const getProductByIdService = async (sellerId, productId) => {
  const product = await Product.findOne({ where: { id: productId, sellerId } });
  if (!product) throw new Error("Product not found");
  return product;
};

