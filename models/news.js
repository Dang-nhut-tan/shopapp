'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      News.hasMany(models.NewsDetail, { foreignKey: 'news_id' });
    }
  }

  News.init({
    title: DataTypes.STRING,
    image: DataTypes.TEXT,
    content: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'News',
    tableName: 'news',
    underscored: true,
  });

  return News;
};
