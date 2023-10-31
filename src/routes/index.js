import UserRouter from "../routes/UserRouter"
import ProductRouter from "../routes/ProductRouter"

const routes = (app) => {
    app.use('/api/user', UserRouter);
    app.use('/api/product', ProductRouter);
}

module.exports = routes;