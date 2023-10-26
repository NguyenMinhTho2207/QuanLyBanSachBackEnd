'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
        category_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        category_name: {
            type: Sequelize.STRING
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
    await queryInterface.dropTable('Categories');
  }
};