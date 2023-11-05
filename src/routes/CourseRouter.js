import express from "express";
import CourseController from "../controllers/CourseController";
import { authMiddleware } from "../middleware/authMiddleware";
const routes = express.Router();

routes.post('/create-course', CourseController.createCourse);
routes.put('/update-course/:id', authMiddleware, CourseController.updateCourse);
routes.get('/get-details-course/:id', CourseController.getDetailsCourse);
routes.get('/get-all-course', CourseController.getAllCourse);
routes.delete('/delete-course/:id', CourseController.deleteCourse);

module.exports = routes;