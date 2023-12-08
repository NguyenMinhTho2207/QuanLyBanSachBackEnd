import express from "express";
import OrderController from "../controllers/OrderController";
import { authUserMiddleWare, authMiddleWare } from "../middleware/authMiddleWare";
const routes = express.Router();

routes.post('/create-order', authUserMiddleWare, OrderController.createOrder);
routes.post('/create-order-details', authUserMiddleWare, OrderController.createOrderDetails);
routes.get('/get-all-order/:id', authUserMiddleWare, OrderController.getAllOrderByOrderId);
routes.get('/get-details-order/:id', authUserMiddleWare, OrderController.getDetailOrder);
routes.delete('/cancel-order/:id', OrderController.cancelOrderDetails);
routes.get('/get-all-orders', authMiddleWare, OrderController.getAllOrder);

module.exports = routes;