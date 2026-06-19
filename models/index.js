'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// Lấy cấu hình database từ config/config.js.
// File config.js tự đọc .env, nên không cần hard-code mật khẩu trong source code.
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Tạo kết nối Sequelize tới database đã được khai báo trong .env.
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Tự động đọc tất cả file model trong thư mục models.
// Ví dụ user.js, product.js, order.js... sẽ được nạp vào object db.
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Sau khi nạp hết model, gọi hàm associate để khai báo quan hệ giữa các bảng.
// Ví dụ Product thuộc Brand, Order thuộc User...
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export sequelize và Sequelize để các file khác có thể dùng kết nối hoặc transaction.
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
