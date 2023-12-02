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

let createOrderDetails = async (newOrderDetail) => {
    return new Promise(async (resolve, reject) => {
        const transaction = await db.sequelize.transaction(); // Bắt đầu một giao dịch
        const orderDetailsArray = []; // Mảng để lưu các orderDetail thành công

        try {
            // Duyệt qua từng sản phẩm trong product_detail
            for (const product of newOrderDetail.product_detail) {
                // Tạo chi tiết đơn hàng cho từng sản phẩm
                const orderDetail = await db.OrderDetail.create({
                    order_id: newOrderDetail.order_id,
                    product_id: product.product_id,
                    product_name: product.product_name,
                    image: product.image,
                    quantity: product.quantity,
                    unit_price: product.unit_price,
                    subtotal: product.subtotal
                }, { transaction });

                // Kiểm tra xem chi tiết đơn hàng đã được tạo thành công hay không
                if (!orderDetail) {
                    await transaction.rollback(); // Quay lại trạng thái trước đó nếu có lỗi
                    resolve({
                        status: "Failed",
                        message: "Failed to create order details",
                        data: null
                    });
                    return;
                }

                // Nếu thành công, thêm vào mảng
                orderDetailsArray.push(orderDetail);
            }

            // Commit giao dịch nếu mọi thứ thành công
            await transaction.commit();

            resolve({
                status: "OK",
                message: "Success",
                data: orderDetailsArray
            });
        } catch (error) {
            // Nếu có lỗi, rollback giao dịch
            await transaction.rollback();

            reject(error);
        }
    });
}

module.exports = {
    createOrder,
    createOrderDetails
}