import Order from "../models/orderModel.js";
import OrderItem from "../models/orderitemModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";

// Get all orders for a seller
export const getSellerOrders = async (sellerId) => {
  return await Order.findAll({
    where: { sellerId },
    include: [
      {
        model: User,
        as: "customer",
        attributes: ["id", "name", "email"],
      },
      {
        model: OrderItem,
        as: "items",
        include: [
          {
            model: Product,
            attributes: ["id", "name", "price"],
          },
        ],
      },
    ],
    order: [["id", "DESC"]],
  });
};

//  Get single order by ID
export const getOrderById = async (sellerId, orderId) => {
  const order = await Order.findOne({
    where: { id: orderId, sellerId },
    include: [
      { model: User, as: "customer", attributes: ["id", "name", "email"] },
      {
        model: OrderItem,
        as: "items",
        include: [{ model: Product, attributes: ["id", "name", "price"] }],
      },
    ],
  });
  if (!order) throw new Error("Order not found");
  return order;
};

//  Accept or Reject order
export const updateOrderStatus = async (sellerId, orderId, status) => {
  const order = await Order.findOne({ where: { id: orderId, sellerId } });
  if (!order) throw new Error("Order not found");
  order.status = status;
  await order.save();
  return order;
};


export const updateOrderItemStatus = async (sellerId, orderId, itemId, itemStatus) => {
  const validStatuses = ["accepted", "unavailable"];
  if (!validStatuses.includes(itemStatus)) throw new Error("Invalid item status");

  const item = await OrderItem.findOne({ where: { id: itemId, orderId } });
  if (!item) throw new Error("Order item not found");

  //  Verify seller owns this order (safety check)
  const order = await Order.findOne({ where: { id: orderId, sellerId } });
  if (!order) throw new Error("You are not authorized for this order");

  item.itemStatus = itemStatus;
  await item.save();

  return item;
};