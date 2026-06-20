const { db, useTestDatabase } = require('./testBase.js');
const { getProductPagination, getTotalPage } = require('../utils/productPagination.js');

useTestDatabase();

async function seedProductsForPagination() {
  const now = new Date();

  await db.Category.bulkCreate([
    { id: 1, name: 'Điện thoại', image: '', created_at: now, updated_at: now },
  ]);

  await db.Brand.bulkCreate([
    { id: 1, name: 'Samsung', image: '', created_at: now, updated_at: now },
  ]);

  const products = Array.from({ length: 10 }, (_, index) => {
    const id = index + 1;

    return {
      id,
      name: `Sản phẩm mẫu ${id}`,
      price: 1000000 + id,
      oldprice: 1200000 + id,
      image: '',
      description: `Mô tả sản phẩm mẫu ${id}`,
      specification: `Thông số kỹ thuật sản phẩm mẫu ${id}`,
      buyturn: id,
      quantity: 10 + id,
      brand_id: 1,
      category_id: 1,
      created_at: now,
      updated_at: now,
    };
  });

  await db.Product.bulkCreate(products);
}

describe('phân trang sản phẩm', () => {
  test('page=2 thì pageSize=5 và offset=5', () => {
    const result = getProductPagination({ page: '2' });

    expect(result).toEqual({
      currentPage: 2,
      pageSize: 5,
      offset: 5,
    });
  });

  test('10 sản phẩm với pageSize=5 thì có 2 trang', () => {
    expect(getTotalPage(10, 5)).toBe(2);
  });

  test('page không hợp lệ thì mặc định về trang 1', () => {
    const result = getProductPagination({ page: '-1' });

    expect(result.currentPage).toBe(1);
    expect(result.offset).toBe(0);
  });

  test('lấy trang 2 từ database test SQLite', async () => {
    await seedProductsForPagination();

    const { currentPage, pageSize, offset } = getProductPagination({ page: '2' });
    const [products, totalProducts] = await Promise.all([
      db.Product.findAll({
        limit: pageSize,
        offset,
        order: [['id', 'ASC']],
      }),
      db.Product.count(),
    ]);

    expect(currentPage).toBe(2);
    expect(products).toHaveLength(5);
    expect(products[0].id).toBe(6);
    expect(totalProducts).toBe(10);
    expect(getTotalPage(totalProducts, pageSize)).toBe(2);
  });
});
