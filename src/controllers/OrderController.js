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

let getAllOrderByOrderId = async (req, res) => {
    try {
        let userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: "ERROR",
                message: "The userId is require"
            });
        }

        let response = await OrderService.getAllOrderByOrderId(userId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let getAllOrder = async (req, res) => {
    try {
        let response = await OrderService.getAllOrder();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let getDetailOrder = async (req, res) => {
    try {
        let orderId = req.params.id;
        if (!orderId) {
            return res.status(200).json({
                status: "ERROR",
                message: "The orderId is require"
            });
        }

        let response = await OrderService.getDetailOrder(orderId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let cancelOrderDetails = async (req, res) => {
    try {
        let orderId = req.params.id;
        let data = req.body;

        if (!orderId) {
            return res.status(200).json({
                status: "ERROR",
                message: "The orderId is require"
            });
        }

        let response = await OrderService.cancelOrderDetails(orderId, data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

module.exports = {
    createOrder,
    createOrderDetails,
    getAllOrderByOrderId,
    getDetailOrder,
    cancelOrderDetails,
    getAllOrder
}