'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      // order_details là bảng trung gian: mỗi dòng thuộc một order và một product.
      OrderDetail.belongsTo(models.Order, { foreignKey: 'order_id' });
      OrderDetail.belongsTo(models.Product, { foreignKey: 'product_id' });
    }
  }

  // Mỗi dòng order_details lưu sản phẩm nào được mua, giá tại thời điểm mua và số lượng.
  OrderDetail.init({
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'OrderDetail',
    tableName: 'order_detail',
    underscored: true,
  });

  return OrderDetail;
};
