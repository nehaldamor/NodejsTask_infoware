import {
  getSellerOrders,
  getOrderById,
  updateOrderStatus,
  updateOrderItemStatus,
} from "../services/orderServices.js";

//  Get all orders for a seller
export const getAllOrders = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const orders = await getSellerOrders(sellerId);
    res.json({ count: orders.length, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//  Get one order details
export const getSingleOrder = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const { id } = req.params;
    const order = await getOrderById(sellerId, id);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: err.message });
  }
};

//  Update order status (accept/reject/packed etc.)
export const changeOrderStatus = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "pending",
      "accepted",
      "rejected",
      "packed",
      "readyForDispatch",
      "inDelivery",
      "delivered",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const updatedOrder = await updateOrderStatus(sellerId, id, status);
    res.json({
      message: `Order status updated to ${status}`,
      order: updatedOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};
export const updateItemStatus = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const { orderId, itemId } = req.params;
    const { itemStatus } = req.body;

    const updatedItem = await updateOrderItemStatus(sellerId, orderId, itemId, itemStatus);
    res.json({ message: "Item status updated", item: updatedItem });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};