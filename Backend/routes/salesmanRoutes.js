import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {logVisit,getSalesmanDashboard, getMyVisits, getAllVisits , assignBeat, getMyBeats, markAttendance, markCheckout, getAllAttendance } from "../controllers/salesmanController.js";

const router = express.Router();

// Admin assigns beat to salesman
router.post("/assign-beat", verifyToken(["admin"]), assignBeat);

// Salesman views their beats
router.get("/beats", verifyToken(["salesman"]), getMyBeats);

// Salesman marks attendance (check-in)
router.post("/attendance/checkin", verifyToken(["salesman"]), markAttendance);

// Salesman marks check-out
router.post("/attendance/checkout", verifyToken(["salesman"]), markCheckout);

// Admin views all attendance
router.get("/attendance", verifyToken(["admin"]), getAllAttendance);

import { } from "../controllers/salesmanController.js";

// Salesman logs visit
router.post("/visits", verifyToken(["salesman"]), logVisit);

// Salesman views own visits
router.get("/visits", verifyToken(["salesman"]), getMyVisits);

// Admin views all visits
router.get("/visits/all", verifyToken(["admin"]), getAllVisits);


router.get("/dashboard", verifyToken(["salesman"]), getSalesmanDashboard);
export default router;
/**
 * @swagger
 * tags:
 *   name: Salesman
 *   description: Authentication APIs
 */
/**
 * @swagger
 * /api/salesman/dashboard:
 *   get:
 *     tags:
 *       - Salesman
 *     summary: Get Salesman Dashboard
 *     description: Retrieves the dashboard information for the logged-in salesman.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved dashboard data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSales:
 *                   type: number
 *                   example: 15000
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       orderId:
 *                         type: integer
 *                         example: 101
 *                       customerName:
 *                         type: string
 *                         example: "John Doe"
 *                       amount:
 *                         type: number
 *                         example: 500
 *                 performance:
 *                   type: object
 *                   properties:
 *                     monthlyTarget:
 *                       type: number
 *                       example: 20000
 *                     achieved:
 *                       type: number
 *                       example: 15000
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User role is not salesman
 */

/**
/**
 * @swagger
 * /api/salesman/visits/all:
 *   get:
 *     summary: Get all visits logged by all salesmen Admin Route
 *     description: Allows an admin to fetch all visits logged by all salesmen, including seller, beat, visit date, remarks, and feedback.
 *     tags: [Salesman]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Visits fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Visits fetched successfully
 *                 visits:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 501
 *                       salesmanId:
 *                         type: integer
 *                         example: 7
 *                       sellerId:
 *                         type: integer
 *                         example: 12
 *                       beatId:
 *                         type: integer
 *                         example: 101
 *                       visitDate:
 *                         type: string
 *                         format: date
 *                         example: "2025-11-14"
 *                       remarks:
 *                         type: string
 *                         example: "Discussed new product launch"
 *                       feedback:
 *                         type: string
 *                         example: "Seller interested in bulk order"
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - only admin can access this
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/salesman/attendance:
 *   get:
 *     summary: Get all attendance records Admin Route
 *     description: Allows an admin to fetch all attendance records for all salesmen, including check-in and check-out times, location, and status.
 *     tags: [Salesman]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Attendance records fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Attendance records fetched successfully
 *                 attendance:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 301
 *                       salesmanId:
 *                         type: integer
 *                         example: 7
 *                       status:
 *                         type: string
 *                         example: "checkedIn"
 *                       checkInTime:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-11-14T09:15:00.000Z
 *                       checkOutTime:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                         example: 2025-11-14T18:00:00.000Z
 *                       location:
 *                         type: string
 *                         nullable: true
 *                         example: "SG Highway, Ahmedabad"
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - only admin can access this
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/salesman/visits:
 *   get:
 *     summary: Get all visits logged by the logged-in salesman
 *     description: Fetches all visits logged by the authenticated salesman, including seller, beat, visit date, remarks, and feedback.
 *     tags: [Salesman]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Visits fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Visits fetched successfully
 *                 visits:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 501
 *                       salesmanId:
 *                         type: integer
 *                         example: 7
 *                       sellerId:
 *                         type: integer
 *                         example: 12
 *                       beatId:
 *                         type: integer
 *                         example: 101
 *                       visitDate:
 *                         type: string
 *                         format: date
 *                         example: "2025-11-14"
 *                       remarks:
 *                         type: string
 *                         example: "Discussed new product launch"
 *                       feedback:
 *                         type: string
 *                         example: "Seller interested in bulk order"
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - only salesman can access this
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/salesman/visits:
 *   post:
 *     summary: Log a visit by a salesman
 *     description: Allows a salesman to log a visit to a seller. Optional beat, remarks, feedback, and visit date can also be included.
 *     tags: [Salesman]
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
 *             properties:
 *               salesmanId:
 *                 type: integer
 *                 description: Automatically inferred from logged-in user
 *                 example: 7
 *               sellerId:
 *                 type: integer
 *                 example: 12
 *                 description: ID of the seller visited
 *               beatId:
 *                 type: integer
 *                 example: 101
 *                 description: Optional beat ID associated with the visit
 *               visitDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-11-14"
 *                 description: Optional date of visit (defaults to today)
 *               remarks:
 *                 type: string
 *                 example: "Discussed new product launch"
 *                 description: Optional remarks about the visit
 *               feedback:
 *                 type: string
 *                 example: "Seller interested in bulk order"
 *                 description: Optional feedback from the visit
 *     responses:
 *       201:
 *         description: Visit logged successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Visit logged successfully
 *                 visit:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 501
 *                     salesmanId:
 *                       type: integer
 *                       example: 7
 *                     sellerId:
 *                       type: integer
 *                       example: 12
 *                     beatId:
 *                       type: integer
 *                       example: 101
 *                     visitDate:
 *                       type: string
 *                       format: date
 *                       example: "2025-11-14"
 *                     remarks:
 *                       type: string
 *                       example: "Discussed new product launch"
 *                     feedback:
 *                       type: string
 *                       example: "Seller interested in bulk order"
 *       400:
 *         description: Bad request - missing or invalid fields
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - only salesman can log visits
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/salesman/visits:
 *   post:
 *     summary: Log a visit by a salesman
 *     description: Allows a salesman to log a visit to a seller, optionally including the beat, remarks, and feedback.
 *     tags: [Salesman]
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
 *             properties:
 *               sellerId:
 *                 type: integer
 *                 example: 12
 *                 description: ID of the seller visited
 *               beatId:
 *                 type: integer
 *                 example: 101
 *                 description: Optional beat ID related to the visit
 *               remarks:
 *                 type: string
 *                 example: "Discussed new product launch"
 *                 description: Optional remarks about the visit
 *               feedback:
 *                 type: string
 *                 example: "Seller interested in bulk order"
 *                 description: Optional feedback from the visit
 *               visitDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-11-14"
 *                 description: Optional date of the visit (defaults to today)
 *     responses:
 *       201:
 *         description: Visit logged successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Visit logged successfully
 *                 visit:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 501
 *                     salesmanId:
 *                       type: integer
 *                       example: 7
 *                     sellerId:
 *                       type: integer
 *                       example: 12
 *                     beatId:
 *                       type: integer
 *                       example: 101
 *                     visitDate:
 *                       type: string
 *                       format: date
 *                       example: "2025-11-14"
 *                     remarks:
 *                       type: string
 *                       example: "Discussed new product launch"
 *                     feedback:
 *                       type: string
 *                       example: "Seller interested in bulk order"
 *       400:
 *         description: Bad request - missing or invalid fields
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - only salesman can log visits
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/salesman/attendance/checkout:
 *   post:
 *     summary: Mark attendance checkout for a salesman
 *     description: Allows the logged-in salesman to mark their checkout time for the day.
 *     tags: [Salesman]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *                 description: Optional location or notes for checkout
 *                 example: "SG Highway, Ahmedabad"
 *     responses:
 *       200:
 *         description: Attendance checked out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Attendance checked out successfully
 *                 attendance:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 301
 *                     salesmanId:
 *                       type: integer
 *                       example: 7
 *                     status:
 *                       type: string
 *                       example: "checkedOut"
 *                     checkOutTime:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-11-14T18:00:00.000Z
 *                     location:
 *                       type: string
 *                       example: "SG Highway, Ahmedabad"
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - only salesman can mark checkout
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/salesman/attendance/checkin:
 *   post:
 *     summary: Mark attendance (check-in) for a salesman
 *     description: Allows the logged-in salesman to mark their attendance for the day (check-in).
 *     tags: [Salesman]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *                 description: Optional location or notes for check-in
 *                 example: "SG Highway, Ahmedabad"
 *     responses:
 *       201:
 *         description: Attendance marked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Attendance checked in successfully
 *                 attendance:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 301
 *                     salesmanId:
 *                       type: integer
 *                       example: 7
 *                     status:
 *                       type: string
 *                       example: "checkedIn"
 *                     checkInTime:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-11-14T09:15:00.000Z
 *                     location:
 *                       type: string
 *                       example: "SG Highway, Ahmedabad"
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - only salesman can mark attendance
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/salesman/beats:
 *   get:
 *     summary: Get all beats assigned to the logged-in salesman
 *     description: Fetches all beats assigned to the authenticated salesman, including area, city, pincode, and optional beat name.
 *     tags: [Salesman]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Beats fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Beats fetched successfully
 *                 beats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 101
 *                       salesmanId:
 *                         type: integer
 *                         example: 7
 *                       area:
 *                         type: string
 *                         example: "SG Highway"
 *                       city:
 *                         type: string
 *                         example: "Ahmedabad"
 *                       pincode:
 *                         type: string
 *                         example: "380015"
 *                       beatName:
 *                         type: string
 *                         example: "North SG Beat"
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - only salesman can access this
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/salesman/assign-beat:
 *   post:
 *     summary: Assign a beat to a salesman
 *     description: Allows an admin to assign a beat (area, city, pincode) to a specific salesman.
 *     tags: [Salesman]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - salesmanId
 *               - area
 *             properties:
 *               salesmanId:
 *                 type: integer
 *                 example: 7
 *                 description: ID of the salesman
 *               area:
 *                 type: string
 *                 example: "SG Highway"
 *                 description: Beat area assigned to the salesman
 *               city:
 *                 type: string
 *                 example: "Ahmedabad"
 *                 description: Optional city for the beat
 *               pincode:
 *                 type: string
 *                 example: "380015"
 *                 description: Optional pincode for the beat
 *               beatName:
 *                 type: string
 *                 example: "North SG Beat"
 *                 description: Optional name for the beat
 *     responses:
 *       201:
 *         description: Beat assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Beat assigned successfully
 *                 beat:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 101
 *                     salesmanId:
 *                       type: integer
 *                       example: 7
 *                     area:
 *                       type: string
 *                       example: "SG Highway"
 *                     city:
 *                       type: string
 *                       example: "Ahmedabad"
 *                     pincode:
 *                       type: string
 *                       example: "380015"
 *                     beatName:
 *                       type: string
 *                       example: "North SG Beat"
 *       400:
 *         description: Bad request - missing or invalid fields
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - only admins can assign beats
 *       500:
 *         description: Internal server error
 */
