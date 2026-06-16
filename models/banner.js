'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    static associate(models) {
      Banner.hasMany(models.BannerDetail, { foreignKey: 'banner_id' });
    }
  }

  Banner.init({
    name: DataTypes.STRING,
    image: DataTypes.TEXT,
    status: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Banner',
    tableName: 'banner',
    underscored: true,
  });

  return Banner;
};
