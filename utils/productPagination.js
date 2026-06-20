function getProductPagination(query = {}) {
  const page = parseInt(query.page ?? 1, 10);
  const currentPage = Number.isNaN(page) || page < 1 ? 1 : page;
  const pageSize = 5;
  const offset = (currentPage - 1) * pageSize;

  return {
    currentPage,
    pageSize,
    offset,
  };
}

function getTotalPage(totalProducts, pageSize) {
  return Math.ceil(totalProducts / pageSize);
}

module.exports = {
  getProductPagination,
  getTotalPage,
};
