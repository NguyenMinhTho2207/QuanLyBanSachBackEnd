import express from "express";
import UserController from "../controllers/UserController"
const routes = express.Router();

routes.post('/sign-up', UserController.createUser);
routes.post('/sign-in', UserController.loginUser);

module.exports = routes;