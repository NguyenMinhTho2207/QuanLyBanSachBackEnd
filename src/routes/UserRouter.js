import express from "express";
import UserController from "../controllers/UserController";
import {authMiddleware, authUserMiddleware} from "../middleware/authMiddleware";
const routes = express.Router();

routes.post('/sign-up', UserController.createUser);
routes.post('/sign-in', UserController.loginUser);
routes.put('/update-user/:id', UserController.updateUser);
routes.delete('/delete-user/:id', authMiddleware, UserController.deleteUser);
routes.get('/get-all-user', authMiddleware, UserController.getAllUser);
routes.get('/get-details-user/:id', authUserMiddleware, UserController.getDetailUser);
routes.post('/refresh-token', UserController.refreshToken);

module.exports = routes;