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

module.exports = {
    createOrder,
    createOrderDetails
}