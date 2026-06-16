require('dotenv').config();

const baseConfig = {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME || 'shopapp',
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  dialect: process.env.DB_DIALECT || 'mysql',
};

module.exports = {
  development: baseConfig,
  test: {
    ...baseConfig,
    database: process.env.DB_TEST_NAME || 'shopapp_test',
  },
  production: {
    ...baseConfig,
    database: process.env.DB_PROD_NAME || 'shopapp_production',
  },
};
