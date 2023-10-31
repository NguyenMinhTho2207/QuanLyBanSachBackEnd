'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        product_name: {
            type: Sequelize.STRING
        },
        category_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Categories',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE', 
        },
        description: {
            type: Sequelize.TEXT
        },
        price: {
            type: Sequelize.DECIMAL
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        image: {
            type: Sequelize.TEXT
        },
        rating: {
            type: Sequelize.DECIMAL
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
    await queryInterface.dropTable('Products');
  }
};