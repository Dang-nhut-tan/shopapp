'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      email: { type: Sequelize.STRING, unique: true },
      password: { type: Sequelize.STRING },
      name: { type: Sequelize.STRING },
      role: { type: Sequelize.INTEGER },
      avatar: { type: Sequelize.STRING },
      phone: { type: Sequelize.STRING },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable('categories', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING },
      image: { type: Sequelize.TEXT },
    });

    await queryInterface.createTable('brands', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING },
      image: { type: Sequelize.TEXT },
    });

    await queryInterface.createTable('products', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING },
      price: { type: Sequelize.INTEGER },
      oldprice: { type: Sequelize.INTEGER },
      image: { type: Sequelize.TEXT },
      description: { type: Sequelize.TEXT },
      specification: { type: Sequelize.TEXT },
      buyturn: { type: Sequelize.INTEGER },
      quantity: { type: Sequelize.INTEGER },
      brand_id: {
        type: Sequelize.INTEGER,
        references: { model: 'brands', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: { model: 'categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable('feedback', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      product_id: {
        type: Sequelize.INTEGER,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      star: { type: Sequelize.INTEGER },
      content: { type: Sequelize.TEXT },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable('orders', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      status: { type: Sequelize.INTEGER },
      note: { type: Sequelize.TEXT },
      total: { type: Sequelize.INTEGER },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable('order_details', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      order_id: {
        type: Sequelize.INTEGER,
        references: { model: 'orders', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      price: { type: Sequelize.INTEGER },
      quantity: { type: Sequelize.INTEGER },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable('news', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      title: { type: Sequelize.STRING },
      image: { type: Sequelize.TEXT },
      content: { type: Sequelize.TEXT },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable('news_details', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      product_id: {
        type: Sequelize.INTEGER,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      news_id: {
        type: Sequelize.INTEGER,
        references: { model: 'news', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable('banner', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING },
      image: { type: Sequelize.TEXT },
      status: { type: Sequelize.INTEGER },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable('banner_details', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      product_id: {
        type: Sequelize.INTEGER,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      banner_id: {
        type: Sequelize.INTEGER,
        references: { model: 'banner', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('banner_details');
    await queryInterface.dropTable('banner');
    await queryInterface.dropTable('news_details');
    await queryInterface.dropTable('news');
    await queryInterface.dropTable('order_details');
    await queryInterface.dropTable('orders');
    await queryInterface.dropTable('feedback');
    await queryInterface.dropTable('products');
    await queryInterface.dropTable('brands');
    await queryInterface.dropTable('categories');
    await queryInterface.dropTable('users');
  },
};
