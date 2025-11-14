/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: APIs related to orders 
 */
import express from "express";
import {
  getAllOrders,
  getSingleOrder,
  changeOrderStatus,
  updateItemStatus,
} from "../controllers/orderController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

//  Get all orders for seller
router.get("/", verifyToken(["seller"]), getAllOrders);

//  Get single order details
router.get("/:id", verifyToken(["seller"]), getSingleOrder);

//  Update order status (accept/reject/packed/etc.)
router.put("/:id/status", verifyToken(["seller"]), changeOrderStatus);

router.put("/:orderId/item/:itemId/status", verifyToken(["seller"]), updateItemStatus);
export default router;
/**
 * @swagger
 * /api/orders/{orderId}/item/{itemId}/status:
 *   put:
 *     summary: Update the status of a specific order item
 *     description: Allows a seller to update the status of a single item in an order. Status can be either "accepted" or "unavailable".
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: ID of the order containing the item
 *         schema:
 *           type: integer
 *           example: 101
 *       - name: itemId
 *         in: path
 *         required: true
 *         description: ID of the item to update
 *         schema:
 *           type: integer
 *           example: 12
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               itemStatus:
 *                 type: string
 *                 enum: [accepted, unavailable]
 *                 example: accepted
 *     responses:
 *       200:
 *         description: Item status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item status updated successfully
 *                 item:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 12
 *                     productId:
 *                       type: integer
 *                       example: 5
 *                     orderId:
 *                       type: integer
 *                       example: 101
 *                     status:
 *                       type: string
 *                       example: accepted
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-11-14T11:30:00.000Z
 *       400:
 *         description: Bad request - invalid or missing status value
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - seller does not own this order/item
 *       404:
 *         description: Order or item not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update the status of an order
 *     description: Allows a seller to update the status of a specific order (e.g., pending → accepted → shipped → delivered → cancelled).
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the order to update
 *         schema:
 *           type: integer
 *           example: 101
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
 *                 enum: [pending, accepted, rejected, packed, readyForDispatch, inDelivery, delivered]
 *                 example: shipped
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order status updated successfully
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 101
 *                     orderNumber:
 *                       type: string
 *                       example: ORD-2025-0001
 *                     status:
 *                       type: string
 *                       example: shipped
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-11-13T14:22:00.000Z
 *       400:
 *         description: Bad request - invalid or missing status value
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - seller does not own this order
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get single order details by ID
 *     description: Fetch detailed information about a specific order belonging to the logged-in seller.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the order to fetch
 *         schema:
 *           type: integer
 *           example: 101
 *     responses:
 *       200:
 *         description: Order details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order details fetched successfully
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 101
 *                     orderNumber:
 *                       type: string
 *                       example: ORD-2025-0001
 *                     totalAmount:
 *                       type: number
 *                       example: 1299.99
 *                     status:
 *                       type: string
 *                       enum: [pending, accepted, shipped, delivered, cancelled]
 *                       example: shipped
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-11-13T10:30:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-11-13T12:00:00.000Z
 *                     customer:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 7
 *                         name:
 *                           type: string
 *                           example: Nehal Damor
 *                         email:
 *                           type: string
 *                           example: nehal@example.com
 *                         mobile:
 *                           type: string
 *                           example: "9876543210"
 *                         city:
 *                           type: string
 *                           example: Ahmedabad
 *                         area:
 *                           type: string
 *                           example: SG Highway
 *                         pincode:
 *                           type: string
 *                           example: "380015"
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           productId:
 *                             type: integer
 *                             example: 12
 *                           productName:
 *                             type: string
 *                             example: Organic Honey
 *                           quantity:
 *                             type: integer
 *                             example: 2
 *                           price:
 *                             type: number
 *                             example: 299.99
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - seller does not own this order
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders for the logged-in seller
 *     description: Fetches all customer orders related to the logged-in seller. Each order includes order details and customer information.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Orders fetched successfully
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 101
 *                       orderNumber:
 *                         type: string
 *                         example: ORD-2025-0001
 *                       customerName:
 *                         type: string
 *                         example: Nehal Damor
 *                       totalAmount:
 *                         type: number
 *                         example: 1299.99
 *                       status:
 *                         type: string
 *                         enum: [pending, accepted, shipped, delivered, cancelled]
 *                         example: delivered
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-11-13T10:30:00.000Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-11-13T12:00:00.000Z
 *                       customer:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 7
 *                           name:
 *                             type: string
 *                             example: Nehal Damor
 *                           email:
 *                             type: string
 *                             example: nehal@example.com
 *                           city:
 *                             type: string
 *                             example: Ahmedabad
 *                           area:
 *                             type: string
 *                             example: SG Highway
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       500:
 *         description: Internal server error
 */


