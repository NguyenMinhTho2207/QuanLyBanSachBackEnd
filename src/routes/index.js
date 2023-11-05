import UserRouter from "../routes/UserRouter";
import ProductRouter from "../routes/ProductRouter";
import CategoryRouter from "../routes/CategoryRouter";
import CourseRouter from "../routes/CourseRouter";

const routes = (app) => {
    app.use('/api/user', UserRouter);
    app.use('/api/product', ProductRouter);
    app.use('/api/category', CategoryRouter);
    app.use('/api/course', CourseRouter);
}

module.exports = routes;