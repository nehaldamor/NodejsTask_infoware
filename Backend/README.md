# Infoware-BackendTask

// ...existing code...
# Backend (Node + Express + Sequelize)

This README provides setup steps, architecture overview and module descriptions for the project.

---

## Quick setup

1. Copy environment variables:
   - See [`.env`](.env)

2. Install dependencies:
   ```sh
   npm install


     node server.js



Entry: server.js
App exported: app
API docs:

Swagger UI served at /api-docs (configured in swager.js as swaggerSpec and swaggerUiSetup)
Notes:

Default PORT is read from .env or falls back to 5000 (see server.js).
DB synchronization is triggered at startup via sequelize used in app.js.
Environment
Required keys in .env:

PORT
DB_NAME
DB_USER
DB_PASS
DB_HOST
JWT_SECRET
Project architecture (high-level)
Layered architecture:

Routes: define HTTP endpoints (files in routes/)
Controllers: handle request/response and input validation (files in controllers/)
Services: business logic, DB operations, transactions (files in services/)
Models: Sequelize model definitions (files in models/)
DB config: Sequelize instance & connection (file: db/db.js)
Middlewares: auth and other cross-cutting concerns (files in middlewares/)
Flow: Request -> Route -> Controller -> Service -> Model/DB -> Service -> Controller -> Response.

Authentication:

JWT-based middleware verifyToken. Example usage in routes: check roles or presence of token before controller invocation — see authMiddleware.js.
Uploads:

Uploaded proof files live in uploads/proofs/. These are binary files and not human-readable.
Swagger:

API docs are generated from routes (see apis config in swagerconfige/swager.js).
Modules / Files (summary)
Core entry points

server.js — starts HTTP server.
app.js — Express app, route mounting and DB sync (imports sequelize).
Routes

routes/authRoutes.js — auth endpoints (login/register).
routes/salesmanRoutes.js
routes/sellerRoutes.js
routes/orderRoutes.js
routes/deliveryRoutes.js
routes/customerRoutes.js
Controllers

controllers/authController.js
controllers/salesmanController.js
controllers/sellerController.js
controllers/orderController.js
controllers/deliveryController.js
controllers/customerController.js
Services (business logic)

services/salesmanServices.js
services/sellerServices.js
services/orderServices.js
services/deliveryService.js
services/customerServices.js
Models (Sequelize)

models/userModel.js — User
models/productModel.js — Product
models/orderModel.js — Order
models/orderitemModel.js — OrderItem
models/deliveryModel.js — Delivery
models/visitModel.js — Visit
models/attendanceModel.js — Attendance
models/beatModel.js — Beat
models/complaintModel.js — Complaint
Middleware

authMiddleware.js — exports verifyToken for route protection.
DB

db/db.js — Sequelize instance and connection configuration.
Utilities / Config

swager.js — swagger setup (swaggerJSDoc options).
Uploads

uploads/ — uploaded content (proofs and complaints). Files under uploads/proofs/ are binary attachments.
Common tasks
Run DB migrations / sync: handled by Sequelize sync invoked in app.js.
Add a new endpoint:
Add route in routes/.
Implement controller in controllers/.
Implement business logic in services/.
Update models in models/ if DB changes are required.
Troubleshooting
If server fails to start: check .env and DB credentials, ensure MySQL is running and accessible at DB_HOST.
If JWT errors occur: verify JWT_SECRET in .env; middleware used is verifyToken.



Below is a concise, inferred list of all APIs (URL + short description) based on the routes folder names and typical conventions in your project. These are best-effort / inferred endpoints — for exact, authoritative paths you can run the small script I included that reads the Express app (app.js) and prints registered routes.

Base URL

Local example: http://localhost:5000
Base API prefix used below: /api (replace/add if your app mounts routes differently in app.js)
PORT is read from .env (default 5000)
Inferred endpoints (grouped by file)

routes/authRoutes.js

POST /api/auth/register — register new user (seller/salesman/customer)
POST /api/auth/login — login (returns JWT)
POST /api/auth/logout — logout / invalidate token (if implemented)
POST /api/auth/refresh — refresh JWT (if implemented)
routes/salesmanRoutes.js

GET /api/salesmen — list all salesmen
GET /api/salesmen/:id — get salesman details
POST /api/salesmen — create new salesman
PUT /api/salesmen/:id — update salesman
DELETE /api/salesmen/:id — delete salesman
POST /api/salesmen/:id/attendance — record attendance (if route exists)
GET /api/salesmen/:id/visits — get visits for salesman (if implemented)
routes/sellerRoutes.js

GET /api/sellers — list sellers
GET /api/sellers/:id — seller details
POST /api/sellers — create seller
PUT /api/sellers/:id — update seller
DELETE /api/sellers/:id — delete seller
routes/orderRoutes.js

GET /api/orders — list orders
GET /api/orders/:id — get order by id
POST /api/orders — create new order
PUT /api/orders/:id — update order
PUT /api/orders/:id/status — update order status (if implemented)
DELETE /api/orders/:id — cancel/delete order (if implemented)
GET /api/orders/:id/items — get order items (if separate)
routes/deliveryRoutes.js

GET /api/deliveries — list deliveries
GET /api/deliveries/:id — delivery details
POST /api/deliveries — create delivery / assign delivery
PUT /api/deliveries/:id — update delivery
PUT /api/deliveries/:id/status — update delivery status
POST /api/deliveries/:id/proof — upload proof file (uploads/proofs/)
routes/customerRoutes.js

GET /api/customers — list customers
GET /api/customers/:id — customer details
POST /api/customers — create customer
PUT /api/customers/:id — update customer
DELETE /api/customers/:id — delete customer
POST /api/customers/:id/complaint — file a complaint (uploads/complaints/)
Notes

Many routes will be protected by auth middleware (verifyToken) — check middlewares/authMiddleware.js to know which require JWT.
Exact paths depend on how routes are mounted in app.js (for example: app.use('/api/auth', authRoutes)). The list above assumes a /api prefix and plural resource names inferred from filenames.
For exact method + path list, run the small script below in your Backend folder. It requires app.js (app should export the Express app, not start the server).
Script to print all registered routes

Save the file and run from Backend folder:
Windows PowerShell / CMD:
node route-list.js
Below are concise descriptions (purpose, common attributes, and typical associations) for each model in your Backend/models folder. These are inferred from the filenames and usual Sequelize patterns — open the files for exact column names and constraints.

userModel.js

Purpose: central user table for sellers, salesmen, customers, admins.
Typical attributes: id (PK), name, email (unique), passwordHash, role (e.g., seller|salesman|customer), phone, address, isActive, createdAt, updatedAt.
Associations:
User.hasMany(Order, { as: 'orders', foreignKey: 'customerId' })
User.hasMany(Visit, { as: 'visits', foreignKey: 'salesmanId' }) (if user is salesman)
User.hasMany(Attendance, { foreignKey: 'userId' })
User.hasMany(Delivery, { foreignKey: 'salesmanId' }) (if delivery assigned to user)


productModel.js

Purpose: product catalog maintained by sellers.
Typical attributes: id, sellerId (FK), name, sku, description, price, stock/quantity, unit, isActive, createdAt, updatedAt.
Associations:
Product.belongsTo(User, { as: 'seller', foreignKey: 'sellerId' })
Product.hasMany(OrderItem, { foreignKey: 'productId' })


orderModel.js

Purpose: customer orders
Typical attributes: id, customerId (FK), sellerId (FK), totalAmount, discount, tax, status (pending/confirmed/shipped/delivered/cancelled), paymentStatus, deliveryId (nullable), createdAt, updatedAt.
Associations:
Order.belongsTo(User, { as: 'customer', foreignKey: 'customerId' })
Order.belongsTo(User, { as: 'seller', foreignKey: 'sellerId' })
Order.hasMany(OrderItem, { foreignKey: 'orderId' })
Order.hasOne(Delivery, { foreignKey: 'orderId' })


orderitemModel.js

Purpose: items within an order (line items)
Typical attributes: id, orderId (FK), productId (FK), quantity, unitPrice, totalPrice, createdAt, updatedAt.
Associations:
OrderItem.belongsTo(Order, { foreignKey: 'orderId' })
OrderItem.belongsTo(Product, { foreignKey: 'productId' })


deliveryModel.js

Purpose: delivery records and delivery status tracking
Typical attributes: id, orderId (FK), assignedTo (salesmanId FK), status (pending/assigned/picked/up-delivered/failed), otp/proofFilePath, proofFilename, deliveredAt, expectedDate, createdAt, updatedAt.
Associations:
Delivery.belongsTo(Order, { foreignKey: 'orderId' })
Delivery.belongsTo(User, { as: 'salesman', foreignKey: 'assignedTo' })
visitModel.js

Purpose: salesmen visits to customers/points-of-sale
Typical attributes: id, salesmanId (FK), customerId (FK), visitDateTime, notes, latitude, longitude, beatId (optional), createdAt, updatedAt.
Associations:
Visit.belongsTo(User, { as: 'salesman', foreignKey: 'salesmanId' })
Visit.belongsTo(User, { as: 'customer', foreignKey: 'customerId' })
Visit.belongsTo(Beat, { foreignKey: 'beatId' }) (if beats used)


attendanceModel.js

Purpose: track salesman/seller attendance and work hours
Typical attributes: id, userId (FK), date, checkInTime, checkOutTime, status (present/absent), location, createdAt, updatedAt.
Associations:
Attendance.belongsTo(User, { foreignKey: 'userId' })


beatModel.js

Purpose: defined sales routes/territories (beats) assigned to salesmen
Typical attributes: id, name, description, routeGeoJson or coordinates, assignedTo (salesmanId) optional, createdAt, updatedAt.
Associations:
Beat.hasMany(Visit, { foreignKey: 'beatId' })
Beat.belongsTo(User, { as: 'salesman', foreignKey: 'assignedTo' }) (optional)


complaintModel.js

Purpose: customer complaints or issue tracking
Typical attributes: id, customerId (FK), orderId (FK, optional), title, description, attachmentPath, status (open/in-progress/resolved), createdAt, updatedAt.
Associations:
Complaint.belongsTo(User, { as: 'customer', foreignKey: 'customerId' })
Complaint.belongsTo(Order, { foreignKey: 'orderId' }) (if related)

