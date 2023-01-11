'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdated: 'CASCADE',
        field: 'user_id',
        allowNull: false,
      },
      seller_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdated: 'CASCADE',
        field: 'seller_id',
        allowNull: false,
      },
      total_price: {
        type: Sequelize.DECIMAL(9, 2),
        allowNull: false,
        field: 'total_price',
      },
      delivery_address: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: 'delivery_address',
      },
      delivery_number: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'delivery_number',
      },
      sale_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
        field: 'sale_date',
      },
      status: {
        type: Sequelize.STRING(50),
      }
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales');
  }
};