'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CourseRegistration extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here
        }
    }
    CourseRegistration.init({
        user_id: DataTypes.INTEGER,
        user_name: DataTypes.STRING,
        address: DataTypes.STRING,
        avatar: DataTypes.TEXT,
        phone_number: DataTypes.STRING,
        course_id: DataTypes.INTEGER,
        course_name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'CourseRegistration',
    });
    return CourseRegistration;
};