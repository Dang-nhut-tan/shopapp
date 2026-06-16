'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
      Feedback.belongsTo(models.Product, { foreignKey: 'product_id' });
      Feedback.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  Feedback.init({
    product_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    star: DataTypes.INTEGER,
    content: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Feedback',
    tableName: 'feedback',
    underscored: true,
  });

  return Feedback;
};
