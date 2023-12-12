'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here
        }
    }
    Course.init({
        course_name: DataTypes.STRING,
        image: DataTypes.TEXT,
        schedule: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        student_count: DataTypes.INTEGER,
        teacher: DataTypes.STRING,
        price: DataTypes.DECIMAL,
    }, {
        sequelize,
        modelName: 'Course',
    });
    return Course;
};