import express from "express";
import CategoryController from "../controllers/CategoryController";
import { authMiddleWare } from "../middleware/authMiddleWare";
const routes = express.Router();

routes.post('/create-category', CategoryController.createCategory);
routes.put('/update-category/:id', authMiddleWare, CategoryController.updateCategory);
routes.get('/get-details-category/:id', CategoryController.getDetailsCategory);
routes.get('/get-all-category', CategoryController.getAllCategory);
routes.delete('/delete-category/:id', CategoryController.deleteCategory);
routes.delete('/delete-multiple-categories', authMiddleWare, CategoryController.deleteMultipleCategories);

module.exports = routes;