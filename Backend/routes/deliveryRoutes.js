import express from "express";
import multer from "multer";
const upload = multer({ dest: "uploads/proofs/" });
import Delivery from "../models/deliveryModel.js";
import {
  assignDeliveryController,
  updateDeliveryStatusController,
  getMyDeliveries,
} from "../controllers/deliveryController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

//  Assign delivery boy to an order (Seller only)
router.post("/assign", verifyToken(["seller"]), assignDeliveryController);

//  Update delivery status (Delivery boy)
router.put("/:id/status", verifyToken(["delivery"]), updateDeliveryStatusController);

//  Get all deliveries for current delivery boy
router.get("/my", verifyToken(["delivery"]), getMyDeliveries);


router.post(
  "/:id/proof",
  verifyToken(["delivery"]),
  upload.single("proof"),
  async (req, res) => {
    try {
      const delivery = await Delivery.findByPk(req.params.id);
      if (!delivery) return res.status(404).json({ message: "Delivery not found" });

      delivery.proofImage = req.file.path;
      delivery.status = "delivered";
      await delivery.save();

      res.json({ message: "Proof uploaded successfully", delivery });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

export default router;
/**
 * @swagger
 * /api/delivery/{id}/proof:
 *   post:
 *     summary: Upload proof of delivery
 *     description: Allows a delivery boy to upload a proof image for a delivery. Automatically updates the delivery status to "delivered".
 *     tags: [Delivery]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the delivery
 *         schema:
 *           type: integer
 *           example: 501
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - proof
 *             properties:
 *               proof:
 *                 type: string
 *                 format: binary
 *                 description: Proof image for the delivery
 *     responses:
 *       200:
 *         description: Proof uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Proof uploaded successfully
 *                 delivery:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 501
 *                     orderId:
 *                       type: integer
 *                       example: 101
 *                     deliveryBoyId:
 *                       type: integer
 *                       example: 12
 *                     status:
 *                       type: string
 *                       example: delivered
 *                     proofImage:
 *                       type: string
 *                       example: "uploads/delivery/proof_501.jpg"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-11-14T15:30:00.000Z
 *       400:
 *         description: Bad request - invalid file or other error
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - delivery boy cannot upload proof for other deliveries
 *       404:
 *         description: Delivery not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/delivery/my:
 *   get:
 *     summary: Get all deliveries assigned to the logged-in delivery boy
 *     description: Fetches all deliveries assigned to the authenticated delivery user, including current status and order details.
 *     tags: [Delivery]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deliveries fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Deliveries fetched successfully
 *                 deliveries:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 501
 *                       orderId:
 *                         type: integer
 *                         example: 101
 *                       deliveryBoyId:
 *                         type: integer
 *                         example: 12
 *                       status:
 *                         type: string
 *                         enum: [assigned, picked, inTransit, delivered, returned]
 *                         example: inTransit
 *                       proofImage:
 *                         type: string
 *                         nullable: true
 *                         example: "uploads/delivery/proof_501.jpg"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-11-14T12:00:00.000Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-11-14T14:30:00.000Z
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/delivery/{id}/status:
 *   put:
 *     summary: Update the status of a delivery
 *     description: Allows a delivery boy to update the status of an assigned delivery by sending only the new status.
 *     tags: [Delivery]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the delivery to update
 *         schema:
 *           type: integer
 *           example: 501
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [assigned, picked, inTransit, delivered, returned]
 *                 example: inTransit
 *     responses:
 *       200:
 *         description: Delivery status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Delivery status updated successfully
 *                 delivery:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 501
 *                     orderId:
 *                       type: integer
 *                       example: 101
 *                     deliveryBoyId:
 *                       type: integer
 *                       example: 12
 *                     status:
 *                       type: string
 *                       example: inTransit
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-11-14T14:30:00.000Z
 *       400:
 *         description: Bad request - missing or invalid status
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - delivery boy cannot update other deliveries
 *       404:
 *         description: Delivery not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * tags:
 *   - name: Delivery
 *     description: APIs related to orders 
 */
/**
 * @swagger
 * /api/delivery/assign:
 *   post:
 *     summary: Assign a delivery to a delivery boy
 *     description: Allows a seller to assign a specific order to a delivery boy.
 *     tags: [Delivery]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - deliveryBoyId
 *             properties:
 *               orderId:
 *                 type: integer
 *                 description: ID of the order to assign
 *                 example: 101
 *               deliveryBoyId:
 *                 type: integer
 *                 description: ID of the delivery boy to assign
 *                 example: 7
 *               status:
 *                 type: string
 *                 description: Status of the delivery assignment
 *                 enum: [assigned, picked, inTransit, delivered, returned]
 *                 example: assigned
 *               proofImage:
 *                 type: string
 *                 description: Optional URL for delivery proof image
 *                 example: "uploads/delivery/proof_101.jpg"
 *     responses:
 *       201:
 *         description: Delivery assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Delivery assigned successfully
 *                 delivery:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 201
 *                     orderId:
 *                       type: integer
 *                       example: 101
 *                     deliveryBoyId:
 *                       type: integer
 *                       example: 7
 *                     status:
 *                       type: string
 *                       example: assigned
 *                     proofImage:
 *                       type: string
 *                       nullable: true
 *                       example: "uploads/delivery/proof_101.jpg"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-11-14T14:00:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-11-14T14:30:00.000Z
 *       400:
 *         description: Bad request - missing or invalid fields
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - only seller can assign deliveries
 *       500:
 *         description: Internal server error
 */
