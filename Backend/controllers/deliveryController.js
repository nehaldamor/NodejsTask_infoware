import {
  assignDelivery,
  updateDeliveryStatus,
  getDeliveriesByBoy,
} from "../services/deliveryService.js";

// Assign delivery boy to an order (by seller)
export const assignDeliveryController = async (req, res) => {
  try {
    const { orderId, deliveryBoyId } = req.body;
    const delivery = await assignDelivery(orderId, deliveryBoyId);
    res.json({ message: "Delivery assigned successfully", delivery });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

//  Update delivery status (by delivery boy)
export const updateDeliveryStatusController = async (req, res) => {
  try {
    const { id } = req.params; // deliveryId
    const { status } = req.body;
    const deliveryBoyId = req.user.id; // from token

    const validStatuses = ["assigned", "picked", "inTransit", "delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const delivery = await updateDeliveryStatus(id, deliveryBoyId, status);
    res.json({ message: `Delivery status updated to ${status}`, delivery });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

//  Get all deliveries assigned to current delivery boy
export const getMyDeliveries = async (req, res) => {
  try {
    const deliveryBoyId = req.user.id;
    const deliveries = await getDeliveriesByBoy(deliveryBoyId);
    res.json({ count: deliveries.length, deliveries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
