'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here
        }
    }
    Order.init({
        user_id: DataTypes.INTEGER,
        product_id: DataTypes.INTEGER,
        items_price: DataTypes.DECIMAL,
        quantity: DataTypes.INTEGER,
        image: DataTypes.STRING,
        note: DataTypes.TEXT,
        shipping_address: DataTypes.STRING,
        payment_method: DataTypes.STRING,
        shipping_price: DataTypes.DECIMAL,
        tax_price: DataTypes.DECIMAL,
        total_price: DataTypes.DECIMAL,
        is_paid: DataTypes.BOOLEAN,
        paid_at: DataTypes.DATE,
        is_delivered: DataTypes.BOOLEAN,
        deleted: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};