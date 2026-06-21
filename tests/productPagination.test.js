const { db, useTestDatabase } = require('./testBase.js');
const { getProductPagination, getTotalPage } = require('../utils/productPagination.js');

useTestDatabase();

async function seedProductData(total = 10) {
  const now = new Date();

  await db.Category.create({
    id: 1,
    name: 'Điện thoại',
    image: '',
    created_at: now,
    updated_at: now,
  });

  await db.Brand.create({
    id: 1,
    name: 'Samsung',
    image: '',
    created_at: now,
    updated_at: now,
  });

  const products = [];

  for (let id = 1; id <= total; id += 1) {
    products.push({
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
    });
  }

  await db.Product.bulkCreate(products);
}

async function getProductPage(page) {
  const pagination = getProductPagination({ page });
  const products = await db.Product.findAll({
    limit: pagination.pageSize,
    offset: pagination.offset,
    order: [['id', 'ASC']],
  });

  return { products, pagination };
}

describe('phân trang sản phẩm', () => {
  test('page=2 thì pageSize=5 và offset=5', () => {
    expect(getProductPagination({ page: '2' })).toEqual({
      currentPage: 2,
      pageSize: 5,
      offset: 5,
    });
  });

  test('10 sản phẩm với pageSize=5 thì có 2 trang', () => {
    expect(getTotalPage(10, 5)).toBe(2);
  });

  test('page không hợp lệ thì mặc định về trang 1', () => {
    expect(getProductPagination({ page: '-1' })).toMatchObject({
      currentPage: 1,
      offset: 0,
    });
  });

  test('lấy trang 2 từ database test SQLite', async () => {
    await seedProductData(10);

    const totalProducts = await db.Product.count();
    const { products, pagination } = await getProductPage('2');

    expect(pagination.currentPage).toBe(2);
    expect(products).toHaveLength(5);
    expect(products[0].id).toBe(6);
    expect(totalProducts).toBe(10);
    expect(getTotalPage(totalProducts, pagination.pageSize)).toBe(2);
  });
});
