import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Infooware Assignment API Docs",
      version: "1.0.0",
      description: "Node.js Backend Developer Assignment — Seller, Customer, Delivery, Salesman Modules",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  // 👇 All folders where route files exist
  apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
export const swaggerUiSetup = swaggerUi;
