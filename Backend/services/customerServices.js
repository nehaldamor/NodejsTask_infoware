import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import OrderItem from "../models/orderitemModel.js";
import Delivery from "../models/deliveryModel.js";
export const getNearbySellersService = async ({ city, area, pincode }) => {
  const where = { role: "seller" };
  if (city) where.city = city;
  if (area) where.area = area;
  if (pincode) where.pincode = pincode;

  const sellers = await User.findAll({
    where,
    attributes: ["id", "name", "email", "mobile", "city", "area", "pincode"],
    include: [
      {
        model: Product,
        attributes: ["id", "name", "price", "stock", "isActive"],
      },
    ],
  });

  return sellers;
};
export const placeOrderService = async (customerId, sellerId, products, address) => {
  let total = 0;
  products.forEach((p) => (total += p.price * p.quantity));

  const order = await Order.create({
    customerId,
    sellerId,
    totalAmount: total,
    address,
    status: "pending",
  });

  for (const item of products) {
    await OrderItem.create({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    });
  }

  return order;
};

export const getMyOrdersService = async (customerId) => {
  return await Order.findAll({
    where: { customerId },
    include: [
      { model: User, as: "seller", attributes: ["id", "name", "email", "mobile"] },
      {
        model: Delivery,
        include: [
          { model: User, as: "deliveryBoy", attributes: ["id", "name", "email", "mobile"] },
        ],
      },
    ],
    order: [["id", "DESC"]],
  });
};