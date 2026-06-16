'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Feedback, { foreignKey: 'user_id' });
      User.hasMany(models.Order, { foreignKey: 'user_id' });
    }
  }

  User.init({
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    role: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    phone: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
  });

  return User;
};
