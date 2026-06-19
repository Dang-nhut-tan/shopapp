'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'user_id' });
      Order.hasMany(models.OrderDetail, { foreignKey: 'order_id' });
    }
  }

  Order.init({
    user_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    note: DataTypes.TEXT,
    total: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'order',
    underscored: true,
  });

  return Order;
};
