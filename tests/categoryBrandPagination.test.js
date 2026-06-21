const { db, useTestDatabase } = require('./testBase.js');
const { getProductPagination, getTotalPage } = require('../utils/productPagination.js');

useTestDatabase();

function buildRows(total, getName) {
  const now = new Date();
  const rows = [];

  for (let id = 1; id <= total; id += 1) {
    rows.push({
      id,
      name: getName(id),
      image: '',
      created_at: now,
      updated_at: now,
    });
  }

  return rows;
}

async function seedCategories(total = 10) {
  await db.Category.bulkCreate(buildRows(total, (id) => `Danh mục mẫu ${id}`));
}

async function seedBrands(total = 10) {
  await db.Brand.bulkCreate(buildRows(total, (id) => `Thương hiệu mẫu ${id}`));
}

async function expectPageTwo(model) {
  const pagination = getProductPagination({ page: '2' });
  const items = await model.findAll({
    limit: pagination.pageSize,
    offset: pagination.offset,
    order: [['id', 'ASC']],
  });
  const total = await model.count();

  expect(pagination.currentPage).toBe(2);
  expect(items).toHaveLength(5);
  expect(items[0].id).toBe(6);
  expect(total).toBe(10);
  expect(getTotalPage(total, pagination.pageSize)).toBe(2);
}

describe('phân trang danh mục', () => {
  test('lấy trang 2 từ database test SQLite', async () => {
    await seedCategories();

    await expectPageTwo(db.Category);
  });
});

describe('phân trang thương hiệu', () => {
  test('lấy trang 2 từ database test SQLite', async () => {
    await seedBrands();

    await expectPageTwo(db.Brand);
  });
});
