'use strict';

const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

async function createDatabase() {
  const sequelize = new Sequelize(null, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false,
  });

  await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\`;`);
  await sequelize.close();

  console.log(`Database "${config.database}" is ready.`);
}

createDatabase().catch((error) => {
  console.error('Failed to create database:', error.message);
  process.exit(1);
});
