// Nạp biến môi trường từ file .env vào process.env.
// Nhờ vậy mỗi máy có thể dùng tài khoản/mật khẩu MySQL riêng mà không cần sửa code.
require('dotenv').config();

// Cấu hình kết nối database dùng chung cho môi trường development.
// Nếu trong .env không có giá trị nào đó thì sẽ lấy giá trị mặc định bên phải dấu ||.
const baseConfig = {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME || 'shopapp',
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  dialect: process.env.DB_DIALECT || 'mysql',
};

// Sequelize CLI sẽ đọc file này để biết phải kết nối tới database nào.
// NODE_ENV mặc định là development, nên khi chạy yarn db:setup sẽ dùng phần development.
module.exports = {
  development: baseConfig,
  test: {
    ...baseConfig,
    database: process.env.DB_TEST_NAME || 'shopapp_test',
  },
  production: {
    ...baseConfig,
    database: process.env.DB_PROD_NAME || 'shopapp_production',
  },
};
