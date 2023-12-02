import express from "express";
import OrderController from "../controllers/OrderController";
import { authUserMiddleWare } from "../middleware/authMiddleWare";
const routes = express.Router();

routes.post('/create-order', authUserMiddleWare, OrderController.createOrder);
routes.post('/create-order-details', authUserMiddleWare, OrderController.createOrderDetails);

module.exports = routes;