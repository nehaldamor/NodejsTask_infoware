import express from 'express';
import cors from 'cors';
import { swaggerSpec, swaggerUiSetup } from "./swagerconfige/swager.js";
import swaggerUi from "swagger-ui-express";
import sequelize from './db/db.js';
import authRoutes from "./routes/authRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";
import customersRoutes from "./routes/customerRoutes.js";
import salesmanRoutes from "./routes/salesmanRoutes.js";
const app=express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUiSetup.setup(swaggerSpec));
app.use("/api/salesman", salesmanRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/customers", customersRoutes);
sequelize.sync().then(()=>{
    console.log("DB synced");;
}).catch((err)=>console.log("Error in DB sync"+err));

app.get("/",(req,res)=>{
    res.json("hello node and sql");
})

export default app;

