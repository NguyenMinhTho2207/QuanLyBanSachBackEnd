import db from "../models/index"

let createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = await db.Order.create(newOrder);

            if (order) {
                resolve({
                    status: "OK",
                    message: "Success",
                    data: order
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}

const createOrderDetails = async (newOrderDetail) => {
    return new Promise(async (resolve, reject) => {
        const transaction = await db.sequelize.transaction(); // Bắt đầu một giao dịch
        const orderDetailsArray = []; // Mảng để lưu các orderDetail thành công

        try {
            // Duyệt qua từng sản phẩm trong product_detail
            for (const product of newOrderDetail.product_detail) {
                // Tạo chi tiết đơn hàng cho từng sản phẩm
                const orderDetail = await db.OrderDetail.create(
                    {
                        order_id: newOrderDetail.order_id,
                        product_id: product.product_id,
                        product_name: product.product_name,
                        image: product.image,
                        quantity: product.quantity,
                        unit_price: product.unit_price,
                        subtotal: product.subtotal,
                    },
                    { transaction }
                );

                // Kiểm tra xem chi tiết đơn hàng đã được tạo thành công hay không
                if (!orderDetail) {
                    await transaction.rollback(); // Quay lại trạng thái trước đó nếu có lỗi
                    resolve({
                        status: "ERROR",
                        message: "Failed to create order details",
                        data: null,
                    });
                    return;
                }

                // Nếu thành công, tạo một đối tượng mới chỉ chứa dataValues
                const simplifiedOrderDetail = {
                    dataValues: orderDetail.dataValues,
                };

                // Thêm vào mảng
                orderDetailsArray.push(simplifiedOrderDetail);

                // Cập nhật bảng Product
                const productId = product.product_id;
                const updatedQuantity = product.quantity;

                await db.Product.update(
                    {
                        quantity: db.sequelize.literal(`quantity - ${updatedQuantity}`),
                        sold_quantity: db.sequelize.literal(`sold_quantity + ${updatedQuantity}`),
                    },
                    {
                        where: {
                            id: productId,
                        },
                        transaction,
                    }
                );
            }

            // Commit giao dịch nếu mọi thứ thành công
            await transaction.commit();

            resolve({
                status: "OK",
                message: "Success",
                data: orderDetailsArray,
            });
        } catch (error) {
            // Nếu có lỗi, rollback giao dịch
            await transaction.rollback();

            reject(error);
        }
    });
};

let getAllOrderByOrderId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Lấy danh sách đơn hàng (orders) của người dùng
            let orders = await db.Order.findAll({
                where: {
                    user_id: userId
                },
                raw: true
            });

            // Kiểm tra xem có đơn hàng nào không
            if (orders.length > 0) {
                // Duyệt qua từng đơn hàng và lấy chi tiết đơn hàng cho mỗi đơn hàng
                for (let i = 0; i < orders.length; i++) {
                    let orderId = orders[i].id;

                    // Lấy danh sách chi tiết đơn hàng (order details) cho đơn hàng cụ thể
                    let orderDetails = await db.OrderDetail.findAll({
                        where: {
                            order_id: orderId
                        },
                        raw: true
                    });

                    // Thêm thông tin chi tiết đơn hàng vào thuộc tính 'orderDetails'
                    orders[i].orderDetails = orderDetails;
                }

                // Trả về kết quả thành công với danh sách đơn hàng và chi tiết đơn hàng
                resolve({
                    status: "OK",
                    message: "Success",
                    data: orders
                });
            } else {
                // Không có đơn hàng nào cho người dùng
                resolve({
                    status: "OK",
                    message: "No orders found for the user",
                    data: []
                });
            }

        } catch (error) {
            reject(error);
        }
    });
}

let getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // Lấy tất cả đơn hàng (orders) không có điều kiện
            let orders = await db.Order.findAll({
                raw: true
            });

            // Kiểm tra xem có đơn hàng nào không
            if (orders.length > 0) {
                // Duyệt qua từng đơn hàng và lấy chi tiết đơn hàng cho mỗi đơn hàng
                for (let i = 0; i < orders.length; i++) {
                    let orderId = orders[i].id;

                    // Lấy danh sách chi tiết đơn hàng (order details) cho đơn hàng cụ thể
                    let orderDetails = await db.OrderDetail.findAll({
                        where: {
                            order_id: orderId
                        },
                        raw: true
                    });

                    // Thêm thông tin chi tiết đơn hàng vào thuộc tính 'orderDetails'
                    orders[i].orderDetails = orderDetails;
                }

                // Trả về kết quả thành công với danh sách đơn hàng và chi tiết đơn hàng
                resolve({
                    status: "OK",
                    message: "Success",
                    data: orders
                });
            } else {
                // Không có đơn hàng nào
                resolve({
                    status: "OK",
                    message: "No orders found",
                    data: []
                });
            }

        } catch (error) {
            reject(error);
        }
    });
}

let getDetailOrder = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Lấy đơn hàng (order) dựa trên orderId
            let order = await db.Order.findOne({
                where: {
                    id: orderId
                },
                raw: true
            });

            // Kiểm tra xem có đơn hàng nào không
            if (order) {
                // Lấy danh sách chi tiết đơn hàng (order details) cho đơn hàng
                let orderDetails = await db.OrderDetail.findAll({
                    where: {
                        order_id: orderId
                    },
                    raw: true
                });

                // Thêm thông tin chi tiết đơn hàng vào thuộc tính 'orderDetails'
                order.orderDetails = orderDetails;

                // Trả về kết quả thành công với đơn hàng và chi tiết đơn hàng
                resolve({
                    status: "OK",
                    message: "Success",
                    data: order
                });
            } else {
                // Không có đơn hàng nào cho orderId
                resolve({
                    status: "OK",
                    message: "No order found for the orderId",
                    data: null
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let cancelOrderDetails = (orderId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Lấy danh sách chi tiết đơn hàng từ data
            const orderItems = data.orderItems;

            // Duyệt qua từng chi tiết đơn hàng để cập nhật số lượng sản phẩm
            for (let i = 0; i < orderItems.length; i++) {
                const orderItem = orderItems[i];

                // Lấy thông tin sản phẩm từ bảng product
                const product = await db.Product.findOne({
                    where: {
                        id: orderItem.product_id
                    }
                });

                // Kiểm tra xem sản phẩm có tồn tại không
                if (product) {
                    // Cập nhật số lượng và sold_quantity sản phẩm trong bảng product
                    const newQuantity = product.quantity + orderItem.quantity;
                    
                    // Đảm bảo newSoldQuantity không trở thành số âm
                    const newSoldQuantity = Math.max(0, product.sold_quantity - orderItem.quantity);

                    await db.Product.update(
                        { quantity: newQuantity, sold_quantity: newSoldQuantity },
                        { where: { id: orderItem.product_id } }
                    );
                } else {
                    // Xử lý trường hợp sản phẩm không tồn tại
                    console.log(`Product with id ${orderItem.product_id} not found.`);
                }
            }

            // Xóa các bản ghi trong bảng OrderDetail với điều kiện order_id = orderId
            await db.OrderDetail.destroy({
                where: {
                    order_id: orderId
                }
            });

            // Xóa bản ghi từ bảng Order với điều kiện id = orderId
            await db.Order.destroy({
                where: {
                    id: orderId
                }
            });

            resolve({
                status: "OK",
                message: "Cancel order details and order successfully"
            });
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = {
    createOrder,
    createOrderDetails,
    getAllOrderByOrderId,
    getDetailOrder,
    cancelOrderDetails,
    getAllOrder
}