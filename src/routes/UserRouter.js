import express from "express";
import UserController from "../controllers/UserController";
import { authMiddleWare, authUserMiddleWare } from "../middleware/authMiddleWare";
const routes = express.Router();

routes.post('/sign-up', UserController.createUser);
routes.post('/sign-in', UserController.loginUser);
routes.post('/log-out', UserController.logoutUser);
routes.put('/update-user/:id', authUserMiddleWare, UserController.updateUser);
routes.delete('/delete-user/:id', authMiddleWare, UserController.deleteUser);
routes.get('/get-all-user', authMiddleWare, UserController.getAllUser);
routes.get('/get-details-user/:id', authUserMiddleWare, UserController.getDetailUser);
routes.post('/refresh-token', UserController.refreshToken);
routes.delete('/delete-multiple-users', authMiddleWare, UserController.deleteMultipleUsers);

module.exports = routes;