'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
        course_id: {
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
                key: 'user_id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE', 
        },
        created_at: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updated_at: {
            allowNull: false,
            type: Sequelize.DATE
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: 1
        }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  }
};