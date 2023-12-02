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
        name: DataTypes.STRING,
        phone_number: DataTypes.STRING,
        note: DataTypes.TEXT,
        shipping_address: DataTypes.STRING,
        payment_method: DataTypes.STRING,
        shipping_price: DataTypes.DECIMAL,
        total_price: DataTypes.DECIMAL,
        is_paid: DataTypes.BOOLEAN,
        paid_at: DataTypes.DATE,
        is_delivered: DataTypes.BOOLEAN,
        delivered_at: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};