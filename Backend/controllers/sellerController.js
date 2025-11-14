import {
  addProduct,
  getSellerProducts,
  updateProduct,
  deleteProduct,
  getProductByIdService,
  getSellerDashboardSummary,
} from "../services/sellerServices.js";

//  Add Product
export const createProduct = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const product = await addProduct(sellerId, req.body);
    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

//  Get All Products of Seller
export const getProducts = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const products = await getSellerProducts(sellerId);
    res.json({ count: products.length, products });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//  Update Product
export const updateSellerProduct = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const { id } = req.params;
    const updated = await updateProduct(sellerId, id, req.body);
    res.json({ message: "Product updated", product: updated });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//  Delete Product
export const removeProduct = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const { id } = req.params;
    await deleteProduct(sellerId, id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const { id } = req.params;

    const product = await getProductByIdService(sellerId, id); // ⬅️ call service

    res.json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getSellerDashboard = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const summary = await getSellerDashboardSummary(sellerId);
    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};