


import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { getNearbySellers,placeOrder, getMyOrders,raiseComplaint, getMyComplaints, uploadComplaintImage} from "../controllers/customerController.js";

const router = express.Router();

router.get("/sellers", verifyToken(["customer"]), getNearbySellers);
router.post("/orders", verifyToken(["customer"]), placeOrder);
router.get("/orders", verifyToken(["customer"]), getMyOrders);
router.post(
  "/complaints",
  verifyToken(["customer"]),
  uploadComplaintImage.single("image"),
  raiseComplaint
);
router.get("/complaints", verifyToken(["customer"]), getMyComplaints);
export default router;
/**
 * @swagger
 * /api/customers/complaints:
 *   get:
 *     summary: Get all complaints of the logged-in customer
 *     description: Fetches all complaints raised by the authenticated customer, including status and optional image URL.
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Complaints fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Complaints fetched successfully
 *                 complaints:
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
 *                       message:
 *                         type: string
 *                         example: The product was damaged upon delivery
 *                       imageUrl:
 *                         type: string
 *                         example: "uploads/complaints/complaint_501.jpg"
 *                       status:
 *                         type: string
 *                         example: pending
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-11-14T12:00:00.000Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-11-14T12:30:00.000Z
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/customers/complaints:
 *   post:
 *     summary: Raise a complaint
 *     description: Allows a customer to raise a complaint related to an order. An optional image can be uploaded with the complaint.
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - message
 *             properties:
 *               orderId:
 *                 type: integer
 *                 description: ID of the order the complaint is about
 *                 example: 101
 *               description:
 *                 type: string
 *                 description: Complaint details
 *                 example: The product was damaged upon delivery
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Optional image attachment for the complaint
 *     responses:
 *       201:
 *         description: Complaint raised successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Complaint raised successfully
 *                 complaint:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 501
 *                     orderId:
 *                       type: integer
 *                       example: 101
 *                     description:
 *                       type: string
 *                       example: The product was damaged upon delivery
 *                     imageUrl:
 *                       type: string
 *                       example: "uploads/complaints/complaint_501.jpg"
 *                     status:
 *                       type: string
 *                       example: pending
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-11-14T12:00:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-11-14T12:00:00.000Z
 *       400:
 *         description: Bad request - missing or invalid fields
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/customers/orders:
 *   get:
 *     summary: Get all orders of the logged-in customer
 *     description: Fetches all orders placed by the authenticated customer.
 *     tags: [Customer]
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
 *                       sellerId:
 *                         type: integer
 *                         example: 3
 *                       status:
 *                         type: string
 *                         enum: [pending, accepted, rejected, packed, readyForDispatch, inDelivery, delivered]
 *                         example: pending
 *                       totalAmount:
 *                         type: number
 *                         example: 1299.99
 *                       address:
 *                         type: string
 *                         example: "Nikol, Ahmedabad"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-11-14T10:30:00.000Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-11-14T11:00:00.000Z
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             productId:
 *                               type: integer
 *                               example: 1
 *                             price:
 *                               type: number
 *                               example: 200
 *                             quantity:
 *                               type: integer
 *                               example: 3
 *                             itemStatus:
 *                               type: string
 *                               enum: [accepted, unavailable]
 *                               example: accepted
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/customers/orders:
 *   post:
 *     summary: Place a new order
 *     description: Allows a customer to place an order with one or more products from a seller.
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sellerId
 *               - address
 *               - products
 *             properties:
 *               sellerId:
 *                 type: integer
 *                 example: 1
 *               address:
 *                 type: string
 *                 example: "Nikol, Ahmedabad"
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - price
 *                     - quantity
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 1
 *                     price:
 *                       type: number
 *                       example: 200
 *                     quantity:
 *                       type: integer
 *                       example: 3
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order placed successfully
 *                 orderId:
 *                   type: integer
 *                   example: 101
 *       400:
 *         description: Bad request - missing or invalid fields
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * tags:
 *   - name: Customer
 *     description: APIs related to customers
 */

/**
 * @swagger
 * /api/customers/sellers:
 *   get:
 *     summary: Get nearby sellers
 *     description: Fetch a list of sellers filtered by city, area, or pincode for the logged-in customer.
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: city
 *         in: query
 *         required: false
 *         description: Filter sellers by city
 *         schema:
 *           type: string
 *           example: Ahmedabad
 *       - name: area
 *         in: query
 *         required: false
 *         description: Filter sellers by area
 *         schema:
 *           type: string
 *           example: SG Highway
 *       - name: pincode
 *         in: query
 *         required: false
 *         description: Filter sellers by pincode
 *         schema:
 *           type: string
 *           example: "380015"
 *     responses:
 *       200:
 *         description: List of nearby sellers fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sellers fetched successfully
 *                 sellers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 3
 *                       name:
 *                         type: string
 *                         example: John Seller
 *                       email:
 *                         type: string
 *                         example: seller@example.com
 *                       city:
 *                         type: string
 *                         example: Ahmedabad
 *                       area:
 *                         type: string
 *                         example: SG Highway
 *                       pincode:
 *                         type: string
 *                         example: "380015"
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       500:
 *         description: Internal server error
 */
