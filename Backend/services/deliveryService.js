import Delivery from "../models/deliveryModel.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

// Assign delivery boy to an order (by seller)
export const assignDelivery = async (orderId, deliveryBoyId) => {
  // check if order exists
  const order = await Order.findByPk(orderId);
  if (!order) throw new Error("Order not found");

  // check if delivery boy exists
  const deliveryBoy = await User.findByPk(deliveryBoyId);
  if (!deliveryBoy || deliveryBoy.role !== "delivery") {
    throw new Error("Invalid delivery boy");
  }

  // check if delivery already assigned
  const existing = await Delivery.findOne({ where: { orderId } });
  if (existing) throw new Error("Delivery already assigned for this order");

  // create delivery record
  const delivery = await Delivery.create({
    orderId,
    deliveryBoyId,
    status: "assigned",
  });

  // update order status
  order.status = "inDelivery";
  await order.save();

  return delivery;
};

// Update delivery status (by delivery boy)
export const updateDeliveryStatus = async (deliveryId, deliveryBoyId, status) => {
  const delivery = await Delivery.findOne({ where: { id: deliveryId, deliveryBoyId } });
  if (!delivery) throw new Error("Delivery not found or not assigned to you");

  delivery.status = status;
  await delivery.save();

  // if delivered, update order as delivered too
  if (status === "delivered") {
    const order = await Order.findByPk(delivery.orderId);
    order.status = "delivered";
    await order.save();
  }

  return delivery;
};

// Get all deliveries for a delivery boy
export const getDeliveriesByBoy = async (deliveryBoyId) => {
  return await Delivery.findAll({
    where: { deliveryBoyId },
    include: [
      {
        model: Order,
        include: [
          {
            model: User,
            as: "seller",
            attributes: ["id", "name", "email"],
          },
          {
            model: User,
            as: "customer",
            attributes: ["id", "name", "email"],
          },
        ],
        attributes: ["id", "status", "address", "totalAmount"],
      },
    ],
    order: [["id", "DESC"]],
  });
};

