'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
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
        name: {
            type: Sequelize.STRING
        },
        phone_number: {
            type: Sequelize.STRING
        },
        note: {
            type: Sequelize.TEXT
        },
        shipping_address: {
            type: Sequelize.STRING
        },
        payment_method: {
            type: Sequelize.STRING
        },
        shipping_price: {
            type: Sequelize.DECIMAL(10,2)
        },
        total_price: {
            type: Sequelize.DECIMAL(10,2)
        },
        is_paid: {
            type: Sequelize.BOOLEAN
        },
        paid_at: {
            type: Sequelize.DATE
        },
        is_delivered: {
            type: Sequelize.BOOLEAN
        },
        delivered_at: {
            type: Sequelize.DATE
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
    await queryInterface.dropTable('Orders');
  }
};