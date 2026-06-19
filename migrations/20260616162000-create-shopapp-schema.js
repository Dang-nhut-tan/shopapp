'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Hàm up chạy khi gọi: yarn db:migrate hoặc yarn db:setup.
  // Nó tạo toàn bộ bảng theo thiết kế trong db.txt.
  async up(queryInterface, Sequelize) {
    // Tạo các bảng chính trước, vì các bảng phía sau sẽ tham chiếu khóa ngoại tới chúng.
    await queryInterface.createTable('user', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      email: { allowNull: false, type: Sequelize.STRING, unique: true },
      password: { type: Sequelize.STRING },
      name: { type: Sequelize.STRING },
      role: { type: Sequelize.INTEGER },
      avatar: { type: Sequelize.STRING },
      phone: { type: Sequelize.STRING },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable('category', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { allowNull: false, type: Sequelize.STRING, unique: true },
      image: { type: Sequelize.TEXT },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable('brand', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { allowNull: false, type: Sequelize.STRING, unique: true },
      image: { type: Sequelize.TEXT },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });

    // products tham chiếu tới brands và categories qua brand_id, category_id.
    await queryInterface.createTable('product', {
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
        references: { model: 'brand', key: 'id' },
        onUpdate: 'CASCADE',
        // CASCADE nghĩa là tự động lan theo quan hệ khóa ngoại.
        onDelete: 'SET NULL',
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: { model: 'category', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });

    // feedback lưu đánh giá sản phẩm của user.
    // Nếu user hoặc product bị xóa thì feedback liên quan cũng bị xóa theo.
    await queryInterface.createTable('feedback', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      product_id: {
        type: Sequelize.INTEGER,
        references: { model: 'product', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'user', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      star: { type: Sequelize.INTEGER },
      content: { type: Sequelize.TEXT },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });

    // orders lưu đơn hàng của user.
    await queryInterface.createTable('order', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'user', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      status: { type: Sequelize.INTEGER },
      note: { type: Sequelize.TEXT },
      total: { type: Sequelize.INTEGER },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });

    // order_details là bảng chi tiết đơn hàng, nối orders với products.
    await queryInterface.createTable('order_detail', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      order_id: {
        type: Sequelize.INTEGER,
        references: { model: 'order', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: { model: 'product', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      price: { type: Sequelize.INTEGER },
      quantity: { type: Sequelize.INTEGER },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });

    // news và news_details dùng để gắn bài viết/tin tức với sản phẩm.
    await queryInterface.createTable('news', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      title: { type: Sequelize.STRING },
      image: { type: Sequelize.TEXT },
      content: { type: Sequelize.TEXT },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable('news_detail', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      product_id: {
        type: Sequelize.INTEGER,
        references: { model: 'product', key: 'id' },
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

    // banner và banner_details dùng để gắn banner với sản phẩm.
    await queryInterface.createTable('banner', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING },
      image: { type: Sequelize.TEXT },
      status: { type: Sequelize.INTEGER },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable('banner_detail', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      product_id: {
        type: Sequelize.INTEGER,
        references: { model: 'product', key: 'id' },
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

  // Hàm down chạy khi rollback migration.
  // Phải xóa bảng con trước bảng cha để không bị lỗi khóa ngoại.
  async down(queryInterface) {
    await queryInterface.dropTable('banner_detail');
    await queryInterface.dropTable('banner');
    await queryInterface.dropTable('news_detail');
    await queryInterface.dropTable('news');
    await queryInterface.dropTable('order_detail');
    await queryInterface.dropTable('order');
    await queryInterface.dropTable('feedback');
    await queryInterface.dropTable('product');
    await queryInterface.dropTable('brand');
    await queryInterface.dropTable('category');
    await queryInterface.dropTable('user');
  },
};
