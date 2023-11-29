import express from "express";
import ProductCategoryController from "../controllers/ProductCategoryController";
import { authMiddleWare } from "../middleware/authMiddleWare";
const routes = express.Router();

routes.post('/create-product-category', ProductCategoryController.createProductCategory);
routes.put('/update-product-category/:id', authMiddleWare, ProductCategoryController.updateProductCategory);
routes.get('/get-details-product-category/:id', ProductCategoryController.getDetailsProductCategory);
routes.get('/get-all-product-category', ProductCategoryController.getAllProductCategory);
routes.delete('/delete-product-category/:id', ProductCategoryController.deleteProductCategory);
routes.delete('/delete-multiple-product-categories', authMiddleWare, ProductCategoryController.deleteMultipleProductCategories);

module.exports = routes;