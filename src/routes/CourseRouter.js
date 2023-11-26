import express from "express";
import CourseController from "../controllers/CourseController";
import { authMiddleWare } from "../middleware/authMiddleWare";
const routes = express.Router();

routes.post('/create-course', CourseController.createCourse);
routes.put('/update-course/:id', authMiddleWare, CourseController.updateCourse);
routes.get('/get-details-course/:id', CourseController.getDetailsCourse);
routes.get('/get-all-course', CourseController.getAllCourse);
routes.delete('/delete-course/:id', CourseController.deleteCourse);
routes.delete('/delete-multiple-courses', authMiddleWare, CourseController.deleteMultipleCourses);

module.exports = routes;