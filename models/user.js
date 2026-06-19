'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Một user có thể viết nhiều feedback.
      User.hasMany(models.Feedback, { foreignKey: 'user_id' });
      // Một user có thể có nhiều đơn hàng.
      User.hasMany(models.Order, { foreignKey: 'user_id' });
    }
  }

  // User.init khai báo các cột Sequelize sẽ dùng cho model User.
  // Migration là phần thật sự tạo bảng trong database, còn model dùng khi code truy vấn dữ liệu.
  User.init({
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    role: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    phone: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    // Ép Sequelize dùng đúng tên bảng user thay vì tự đổi thành Users.
    tableName: 'user',
    // Dùng created_at, updated_at thay vì createdAt, updatedAt.
    underscored: true,
  });

  return User;
};
