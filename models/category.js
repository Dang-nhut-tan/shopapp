'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Product, { foreignKey: 'category_id' });
    }
  }

  Category.init({
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    image: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'category',
    // underscored true giúp Sequelize dùng tên cột dạng snake_case.
    // Ví dụ: createdAt -> created_at, updatedAt -> updated_at.
    underscored: true,
  });

  return Category;
};
