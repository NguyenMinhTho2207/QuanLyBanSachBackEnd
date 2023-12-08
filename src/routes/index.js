import UserRouter from "../routes/UserRouter";
import ProductRouter from "../routes/ProductRouter";
import ProductCategoryRouter from "../routes/ProductCategoryRouter";
import CourseRouter from "../routes/CourseRouter";
import OrderRouter from "../routes/OrderRouter";
import PaymentRouter from "../routes/PaymentRouter";

const routes = (app) => {
    app.use('/api/user', UserRouter);
    app.use('/api/product', ProductRouter);
    app.use('/api/product-category', ProductCategoryRouter);
    app.use('/api/course', CourseRouter);
    app.use('/api/order', OrderRouter);
    app.use('/api/payment', PaymentRouter)
}

module.exports = routes;