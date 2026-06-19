'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categoryTable = await queryInterface.describeTable('category');
    const brandTable = await queryInterface.describeTable('brand');

    if (!categoryTable.created_at) {
      await queryInterface.addColumn('category', 'created_at', {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      });
    }

    if (!categoryTable.updated_at) {
      await queryInterface.addColumn('category', 'updated_at', {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      });
    }

    if (!brandTable.created_at) {
      await queryInterface.addColumn('brand', 'created_at', {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      });
    }

    if (!brandTable.updated_at) {
      await queryInterface.addColumn('brand', 'updated_at', {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      });
    }
  },

  async down(queryInterface) {
    const categoryTable = await queryInterface.describeTable('category');
    const brandTable = await queryInterface.describeTable('brand');

    if (categoryTable.updated_at) {
      await queryInterface.removeColumn('category', 'updated_at');
    }

    if (categoryTable.created_at) {
      await queryInterface.removeColumn('category', 'created_at');
    }

    if (brandTable.updated_at) {
      await queryInterface.removeColumn('brand', 'updated_at');
    }

    if (brandTable.created_at) {
      await queryInterface.removeColumn('brand', 'created_at');
    }
  },
};
