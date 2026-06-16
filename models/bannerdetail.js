'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BannerDetail extends Model {
    static associate(models) {
      BannerDetail.belongsTo(models.Product, { foreignKey: 'product_id' });
      BannerDetail.belongsTo(models.Banner, { foreignKey: 'banner_id' });
    }
  }

  BannerDetail.init({
    product_id: DataTypes.INTEGER,
    banner_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'BannerDetail',
    tableName: 'banner_details',
    underscored: true,
  });

  return BannerDetail;
};
