'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        course_name: {
            type: Sequelize.STRING
        },
        course_type: {
            type: Sequelize.STRING
        },
        schedule: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.TEXT
        },
        student_count: {
            type: Sequelize.INTEGER
        },
        teacher: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE', 
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  }
};