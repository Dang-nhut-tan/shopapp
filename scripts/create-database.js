'use strict';

const { Sequelize } = require('sequelize');

// NODE_ENV cho biết đang chạy môi trường nào: development, test hoặc production.
// Nếu không truyền NODE_ENV thì mặc định dùng development.
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

async function createDatabase() {
  // Kết nối vào MySQL server nhưng chưa chọn database cụ thể.
  // Bước này cần làm trước migration, vì nếu database chưa tồn tại thì migration sẽ lỗi.
  const sequelize = new Sequelize(null, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false,
  });

  // Tạo database nếu chưa có. Nếu database đã tồn tại thì lệnh này không làm hỏng dữ liệu cũ.
  await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\`;`);
  await sequelize.close();

  console.log(`Database "${config.database}" is ready.`);
}

// Nếu tạo database thất bại, in lỗi rõ ràng và dừng tiến trình.
// Lỗi thường gặp nhất là sai DB_PASSWORD trong file .env.
createDatabase().catch((error) => {
  console.error('Failed to create database:', error.message);
  process.exit(1);
});
