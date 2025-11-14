import express from "express";
import { register, login } from "../controllers/authController.js";
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: This API registers a new user with a specific role.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *               city:
 *                 type: string
 *                 example: Ahmedabad
 *               area:
 *                 type: string
 *                 example: SG Highway
 *               pincode:
 *                 type: string
 *                 example: "380015"
 *               role:
 *                 type: string
 *                 enum: [admin, seller, delivery, salesman, customer]
 *                 example: customer
 *               mobile:
 *                 type: string
 *                 example: "1234567890"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *       400:
 *         description: Bad request - missing or invalid fields
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login and get JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 */

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

export default router;
