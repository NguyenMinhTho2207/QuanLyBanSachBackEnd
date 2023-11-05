import express from "express";
import CategoryController from "../controllers/CategoryController";
import { authMiddleware } from "../middleware/authMiddleware";
const routes = express.Router();

routes.post('/create-category', CategoryController.createCategory);
routes.put('/update-category/:id', authMiddleware, CategoryController.updateCategory);
routes.get('/get-details-category/:id', CategoryController.getDetailsCategory);
routes.get('/get-all-category', CategoryController.getAllCategory);
routes.delete('/delete-category/:id', CategoryController.deleteCategory);

module.exports = routes;