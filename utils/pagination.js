const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 5;

function toPositivePage(page) {
  const pageNumber = Number.parseInt(page ?? DEFAULT_PAGE, 10);

  if (Number.isNaN(pageNumber) || pageNumber < DEFAULT_PAGE) {
    return DEFAULT_PAGE;
  }

  return pageNumber;
}

function getOffset(currentPage, pageSize) {
  return (currentPage - 1) * pageSize;
}

function createPagination(query = {}, pageSize = DEFAULT_PAGE_SIZE) {
  const currentPage = toPositivePage(query.page);

  return {
    currentPage,
    pageSize,
    offset: getOffset(currentPage, pageSize),
  };
}

function getTotalPage(totalItems, pageSize = DEFAULT_PAGE_SIZE) {
  return Math.ceil(totalItems / pageSize);
}

module.exports = {
  createPagination,
  getTotalPage,
};
