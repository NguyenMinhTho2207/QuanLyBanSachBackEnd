'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here
        }
    }
    Product.init({
        product_name: DataTypes.STRING,
        category_id: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        price: DataTypes.DECIMAL,
        quantity: DataTypes.INTEGER,
        image: DataTypes.TEXT,
        rating: DataTypes.DECIMAL
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};