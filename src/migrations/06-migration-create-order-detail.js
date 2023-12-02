'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderDetails', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        order_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Orders',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE', 
        },
        product_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Products',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE', 
        },
        product_name: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.TEXT
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        unit_price: {
            type: Sequelize.DECIMAL(10,2)
        },
        subtotal: {
            type: Sequelize.DECIMAL(10,2)
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
    await queryInterface.dropTable('OrderDetails');
  }
};