import OrderService from '../services/OrderService';

let createOrder = async (req, res) => {
    try {
        let { user_id, name, phone_number, note, shipping_address, payment_method, total_price } = req.body;
        if (!user_id || !name || !phone_number || !note || !shipping_address || !payment_method || !total_price) {
            return res.status(200).json({
                status: "ERROR",
                message: "The input is required"
            });
        }
        
        let response = await OrderService.createOrder(req.body);

        return res.status(200).json(response);

    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let createOrderDetails = async (req, res) => {
    try {
        let { order_id, product_detail } = req.body;
        if (!order_id || product_detail.length === 0) {
            return res.status(200).json({
                status: "ERROR",
                message: "The input is required"
            });
        }
        
        let response = await OrderService.createOrderDetails(req.body);

        return res.status(200).json(response);

    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

module.exports = {
    createOrder,
    createOrderDetails
}