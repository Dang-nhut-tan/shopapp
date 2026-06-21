const { createPagination, getTotalPage } = require('./pagination.js');

function getUserPagination(query = {}) {
  return createPagination(query);
}

module.exports = {
  getUserPagination,
  getTotalPage,
};
