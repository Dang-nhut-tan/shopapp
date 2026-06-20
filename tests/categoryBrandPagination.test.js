const { db, useTestDatabase } = require('./testBase.js');
const { getProductPagination, getTotalPage } = require('../utils/productPagination.js');

useTestDatabase();

async function seedCategoriesForPagination() {
  const now = new Date();
  const categories = Array.from({ length: 10 }, (_, index) => {
    const id = index + 1;

    return {
      id,
      name: `Danh mục mẫu ${id}`,
      image: '',
      created_at: now,
      updated_at: now,
    };
  });

  await db.Category.bulkCreate(categories);
}

async function seedBrandsForPagination() {
  const now = new Date();
  const brands = Array.from({ length: 10 }, (_, index) => {
    const id = index + 1;

    return {
      id,
      name: `Thương hiệu mẫu ${id}`,
      image: '',
      created_at: now,
      updated_at: now,
    };
  });

  await db.Brand.bulkCreate(brands);
}

describe('phân trang danh mục', () => {
  test('lấy trang 2 từ database test SQLite', async () => {
    await seedCategoriesForPagination();

    const { currentPage, pageSize, offset } = getProductPagination({ page: '2' });
    const [categories, totalCategories] = await Promise.all([
      db.Category.findAll({
        limit: pageSize,
        offset,
        order: [['id', 'ASC']],
      }),
      db.Category.count(),
    ]);

    expect(currentPage).toBe(2);
    expect(categories).toHaveLength(5);
    expect(categories[0].id).toBe(6);
    expect(totalCategories).toBe(10);
    expect(getTotalPage(totalCategories, pageSize)).toBe(2);
  });
});

describe('phân trang thương hiệu', () => {
  test('lấy trang 2 từ database test SQLite', async () => {
    await seedBrandsForPagination();

    const { currentPage, pageSize, offset } = getProductPagination({ page: '2' });
    const [brands, totalBrands] = await Promise.all([
      db.Brand.findAll({
        limit: pageSize,
        offset,
        order: [['id', 'ASC']],
      }),
      db.Brand.count(),
    ]);

    expect(currentPage).toBe(2);
    expect(brands).toHaveLength(5);
    expect(brands[0].id).toBe(6);
    expect(totalBrands).toBe(10);
    expect(getTotalPage(totalBrands, pageSize)).toBe(2);
  });
});
