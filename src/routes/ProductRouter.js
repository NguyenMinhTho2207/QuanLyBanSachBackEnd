import express from "express";
import ProductController from "../controllers/ProductController";
import { authMiddleWare } from "../middleware/authMiddleWare";
const routes = express.Router();

routes.post('/create-product', ProductController.createProduct);
routes.put('/update-product/:id', authMiddleWare, ProductController.updateProduct);
routes.get('/get-details-product/:id', ProductController.getDetailsProduct);
routes.get('/get-all-product', ProductController.getAllProduct);
routes.delete('/delete-product/:id', ProductController.deleteProduct);

module.exports = routes;