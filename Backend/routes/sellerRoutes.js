/**
 * @swagger
 * tags:
 *   name: Seller
 *   description: Seller operations
 */


/**
 * @swagger
 * /api/seller/products:
 *   post:
 *     summary: Create a new product
 *     description: Allows a seller to create a new product. Only users with the "seller" role can access this API.
 *     tags: [Seller]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - sku
 *               - price
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 example: Organic Honey
 *               sku:
 *                 type: string
 *                 example: HNY-12345
 *               description:
 *                 type: string
 *                 example: Pure and natural organic honey from local farms.
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 299.99
 *               stock:
 *                 type: integer
 *                 example: 50
 *               unit:
 *                 type: string
 *                 example: pcs
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product created successfully
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Organic Honey
 *                     sku:
 *                       type: string
 *                       example: HNY-12345
 *                     price:
 *                       type: number
 *                       example: 299.99
 *                     stock:
 *                       type: integer
 *                       example: 50
 *                     unit:
 *                       type: string
 *                       example: pcs
 *                     sellerId:
 *                       type: integer
 *                       example: 3
 *       400:
 *         description: Bad request - invalid or missing fields
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/seller/products:
 *   get:
 *     summary: Get all products of the logged-in seller
 *     description: Returns a list of all products created by the authenticated seller.
 *     tags: [Seller]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of seller's products fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Products fetched successfully
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Organic Honey
 *                       sku:
 *                         type: string
 *                         example: HNY-12345
 *                       description:
 *                         type: string
 *                         example: Pure and natural organic honey from local farms.
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 299.99
 *                       stock:
 *                         type: integer
 *                         example: 50
 *                       unit:
 *                         type: string
 *                         example: pcs
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *                       sellerId:
 *                         type: integer
 *                         example: 3
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/seller/products/{id}:
 *   put:
 *     summary: Update an existing product
 *     description: Allows a seller to update their own product details by product ID.
 *     tags: [Seller]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Organic Wild Honey
 *               sku:
 *                 type: string
 *                 example: HNY-12345
 *               description:
 *                 type: string
 *                 example: Updated description for the organic honey product.
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 349.99
 *               stock:
 *                 type: integer
 *                 example: 75
 *               unit:
 *                 type: string
 *                 example: pcs
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product updated successfully
 *                 updatedProduct:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Organic Wild Honey
 *                     sku:
 *                       type: string
 *                       example: HNY-12345
 *                     price:
 *                       type: number
 *                       example: 349.99
 *                     stock:
 *                       type: integer
 *                       example: 75
 *                     unit:
 *                       type: string
 *                       example: pcs
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Bad request - invalid or missing data
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - seller does not own this product
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/seller/products/{id}:
 *   get:
 *     summary: Get product details by ID
 *     description: Fetch a specific product belonging to the logged-in seller using its ID.
 *     tags: [Seller]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Product ID to fetch
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product fetched successfully
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Organic Honey
 *                     sku:
 *                       type: string
 *                       example: HNY-12345
 *                     description:
 *                       type: string
 *                       example: Pure and natural honey sourced from local farms.
 *                     price:
 *                       type: number
 *                       example: 299.99
 *                     stock:
 *                       type: integer
 *                       example: 50
 *                     unit:
 *                       type: string
 *                       example: pcs
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *                     sellerId:
 *                       type: integer
 *                       example: 3
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - seller does not own this product
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/seller/dashboard:
 *   get:
 *     summary: Get seller dashboard statistics
 *     description: Returns key performance data for the logged-in seller such as total products, total orders, revenue, etc.
 *     tags: [Seller]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Seller dashboard data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Dashboard data fetched successfully
 *                 dashboard:
 *                   type: object
 *                   properties:
 *                     totalProducts:
 *                       type: integer
 *                       example: 12
 *                     totalOrders:
 *                       type: integer
 *                       example: 45
 *                     totalRevenue:
 *                       type: number
 *                       example: 15890.75
 *                     pendingOrders:
 *                       type: integer
 *                       example: 5
 *                     deliveredOrders:
 *                       type: integer
 *                       example: 38
 *                     cancelledOrders:
 *                       type: integer
 *                       example: 2
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       500:
 *         description: Internal server error
 */


import express from "express";
import {
  createProduct,
  getProducts,
  updateSellerProduct,
  removeProduct,
  getProductById,
  getSellerDashboard,
} from "../controllers/sellerController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

//  Seller can add new product
router.post("/products", verifyToken(["seller"]), createProduct);

//  Seller can view all their products
router.get("/products", verifyToken(["seller"]), getProducts);

// Seller can update a product
router.put("/products/:id", verifyToken(["seller"]), updateSellerProduct);

// Seller can delete a product
router.delete("/products/:id", verifyToken(["seller"]), removeProduct);

router.get("/products/:id", verifyToken(["seller"]), getProductById);

router.get("/dashboard", verifyToken(["seller"]), getSellerDashboard);
export default router;
