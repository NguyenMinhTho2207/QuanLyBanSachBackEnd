import express from "express";
import UserController from "../controllers/UserController"
const routes = express.Router();

routes.post('/', UserController.createUser);

module.exports = routes;