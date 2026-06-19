'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      Brand.hasMany(models.Product, { foreignKey: 'brand_id' });
    }
  }

  Brand.init({
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    image: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Brand',
    tableName: 'brand',
    // underscored true giúp Sequelize dùng tên cột dạng snake_case.
    // Ví dụ: createdAt -> created_at, updatedAt -> updated_at.
    underscored: true,
  });

  return Brand;
};
