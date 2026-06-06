import { Router } from "express";
import { requireAuth } from "@clerk/express";
import * as productController from "../controllers/productController";

const productRouter = Router();

// GET /api/products => GET all products
productRouter.get("/", productController.getAllProducts);

// GET /api/products/my => GET current's user products (protected)
productRouter.get("/my", requireAuth(), productController.getMyProducts);

// GET /api/products/:productId => GET a single product by Id (public)
productRouter.get("/:productId", productController.getProductById);

// POST /api/products => Create New Product (protected)
productRouter.post("/", requireAuth(), productController.createProduct);

// PUT /api/products/:productId => Update product (protected - owner only)
productRouter.put(
  "/:productId",
  requireAuth(),
  productController.updateProduct,
);

// DELETE /api/products/:productId => Delete a product (protected - owner only)
productRouter.delete(
  "/:productId",
  requireAuth(),
  productController.deleteProduct,
);
export default productRouter;
