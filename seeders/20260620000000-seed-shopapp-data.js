'use strict';

const now = new Date();
const userIds = [101, 102];
const categoryIds = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110];
const brandIds = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110];
const productIds = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110];
const orderIds = [101];
const orderDetailIds = [101];
const feedbackIds = [101];
const newsIds = [101];
const newsDetailIds = [101, 102];
const bannerIds = [101];
const bannerDetailIds = [101, 102];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('user', [
      {
        id: 101,
        email: 'seed-admin@shopapp.local',
        password: '123456',
        name: 'Admin',
        role: 1,
        avatar: '',
        phone: '0900000001',
        created_at: now,
        updated_at: now,
      },
      {
        id: 102,
        email: 'seed-customer@shopapp.local',
        password: '123456',
        name: 'Khách hàng mẫu',
        role: 0,
        avatar: '',
        phone: '0900000002',
        created_at: now,
        updated_at: now,
      },
    ], {
      updateOnDuplicate: ['email', 'password', 'name', 'role', 'avatar', 'phone', 'updated_at'],
    });

    await queryInterface.bulkInsert('category', [
      { id: 101, name: 'Điện thoại mẫu', image: '', created_at: now, updated_at: now },
      { id: 102, name: 'Laptop mẫu', image: '', created_at: now, updated_at: now },
      { id: 103, name: 'Phụ kiện mẫu', image: '', created_at: now, updated_at: now },
      { id: 104, name: 'Máy tính bảng mẫu', image: '', created_at: now, updated_at: now },
      { id: 105, name: 'Đồng hồ thông minh mẫu', image: '', created_at: now, updated_at: now },
      { id: 106, name: 'Tai nghe mẫu', image: '', created_at: now, updated_at: now },
      { id: 107, name: 'Màn hình mẫu', image: '', created_at: now, updated_at: now },
      { id: 108, name: 'Bàn phím mẫu', image: '', created_at: now, updated_at: now },
      { id: 109, name: 'Chuột máy tính mẫu', image: '', created_at: now, updated_at: now },
      { id: 110, name: 'Thiết bị mạng mẫu', image: '', created_at: now, updated_at: now },
    ], {
      updateOnDuplicate: ['name', 'image', 'updated_at'],
    });

    await queryInterface.bulkInsert('brand', [
      { id: 101, name: 'Samsung mẫu', image: '', created_at: now, updated_at: now },
      { id: 102, name: 'Apple mẫu', image: '', created_at: now, updated_at: now },
      { id: 103, name: 'Xiaomi mẫu', image: '', created_at: now, updated_at: now },
      { id: 104, name: 'Oppo mẫu', image: '', created_at: now, updated_at: now },
      { id: 105, name: 'Sony mẫu', image: '', created_at: now, updated_at: now },
      { id: 106, name: 'Dell mẫu', image: '', created_at: now, updated_at: now },
      { id: 107, name: 'HP mẫu', image: '', created_at: now, updated_at: now },
      { id: 108, name: 'Lenovo mẫu', image: '', created_at: now, updated_at: now },
      { id: 109, name: 'Asus mẫu', image: '', created_at: now, updated_at: now },
      { id: 110, name: 'Acer mẫu', image: '', created_at: now, updated_at: now },
    ], {
      updateOnDuplicate: ['name', 'image', 'updated_at'],
    });

    await queryInterface.bulkInsert('product', [
      {
        id: 101,
        name: 'Galaxy S22 Ultra',
        price: 24990000,
        oldprice: 30000000,
        image: '',
        description: 'Galaxy S22 Ultra với bút S Pen tích hợp, hiệu năng mạnh và camera chuyên nghiệp.',
        specification: 'Màn hình Dynamic AMOLED 2X 6.8 inch; RAM 12GB; Bộ nhớ 256GB; Pin 5000 mAh.',
        buyturn: 320,
        quantity: 85,
        brand_id: 101,
        category_id: 101,
        created_at: now,
        updated_at: now,
      },
      {
        id: 102,
        name: 'iPhone 14 Pro Max',
        price: 27990000,
        oldprice: 32990000,
        image: '',
        description: 'iPhone 14 Pro Max với Dynamic Island, chip A16 Bionic và camera 48MP.',
        specification: 'Màn hình OLED 6.7 inch; A16 Bionic; Bộ nhớ 256GB; Camera chính 48MP.',
        buyturn: 410,
        quantity: 60,
        brand_id: 102,
        category_id: 101,
        created_at: now,
        updated_at: now,
      },
      {
        id: 103,
        name: 'Xiaomi 13 Pro',
        price: 19990000,
        oldprice: 24990000,
        image: '',
        description: 'Xiaomi 13 Pro có hiệu năng cao, sạc nhanh và camera Leica.',
        specification: 'Màn hình AMOLED 6.73 inch; Snapdragon 8 Gen 2; RAM 12GB; Pin 4820 mAh.',
        buyturn: 180,
        quantity: 45,
        brand_id: 103,
        category_id: 101,
        created_at: now,
        updated_at: now,
      },
      {
        id: 104,
        name: 'Samsung Galaxy A54',
        price: 8490000,
        oldprice: 9990000,
        image: '',
        description: 'Galaxy A54 có thiết kế trẻ trung, màn hình đẹp và pin dùng lâu.',
        specification: 'Màn hình Super AMOLED 6.4 inch; RAM 8GB; Bộ nhớ 128GB; Pin 5000 mAh.',
        buyturn: 150,
        quantity: 90,
        brand_id: 101,
        category_id: 101,
        created_at: now,
        updated_at: now,
      },
      {
        id: 105,
        name: 'iPhone 13',
        price: 15990000,
        oldprice: 18990000,
        image: '',
        description: 'iPhone 13 có hiệu năng ổn định, camera tốt và thời lượng pin bền.',
        specification: 'Màn hình OLED 6.1 inch; A15 Bionic; Bộ nhớ 128GB; Camera kép 12MP.',
        buyturn: 390,
        quantity: 70,
        brand_id: 102,
        category_id: 101,
        created_at: now,
        updated_at: now,
      },
      {
        id: 106,
        name: 'Xiaomi Redmi Note 12',
        price: 4990000,
        oldprice: 5990000,
        image: '',
        description: 'Redmi Note 12 phù hợp nhu cầu phổ thông, màn hình lớn và pin khỏe.',
        specification: 'Màn hình AMOLED 6.67 inch; RAM 8GB; Bộ nhớ 128GB; Pin 5000 mAh.',
        buyturn: 260,
        quantity: 120,
        brand_id: 103,
        category_id: 101,
        created_at: now,
        updated_at: now,
      },
      {
        id: 107,
        name: 'MacBook Air M2',
        price: 24990000,
        oldprice: 28990000,
        image: '',
        description: 'MacBook Air M2 mỏng nhẹ, hiệu năng tốt và pin dài cho học tập, làm việc.',
        specification: 'Màn hình 13.6 inch; Chip Apple M2; RAM 8GB; SSD 256GB.',
        buyturn: 95,
        quantity: 35,
        brand_id: 102,
        category_id: 102,
        created_at: now,
        updated_at: now,
      },
      {
        id: 108,
        name: 'Samsung Galaxy Buds2 Pro',
        price: 2990000,
        oldprice: 4490000,
        image: '',
        description: 'Tai nghe Galaxy Buds2 Pro chống ồn tốt, âm thanh rõ và đeo thoải mái.',
        specification: 'Chống ồn chủ động; Bluetooth 5.3; Chống nước IPX7; Hộp sạc USB-C.',
        buyturn: 210,
        quantity: 100,
        brand_id: 101,
        category_id: 103,
        created_at: now,
        updated_at: now,
      },
      {
        id: 109,
        name: 'Apple AirPods Pro 2',
        price: 5490000,
        oldprice: 6990000,
        image: '',
        description: 'AirPods Pro 2 có chống ồn chủ động, xuyên âm tự nhiên và âm thanh chi tiết.',
        specification: 'Chip H2; Chống ồn chủ động; Hộp sạc MagSafe; Chống nước IP54.',
        buyturn: 330,
        quantity: 80,
        brand_id: 102,
        category_id: 103,
        created_at: now,
        updated_at: now,
      },
      {
        id: 110,
        name: 'Xiaomi Pad 6',
        price: 8990000,
        oldprice: 10990000,
        image: '',
        description: 'Xiaomi Pad 6 có màn hình lớn, hiệu năng tốt cho giải trí và ghi chú.',
        specification: 'Màn hình 11 inch 144Hz; Snapdragon 870; RAM 8GB; Pin 8840 mAh.',
        buyturn: 140,
        quantity: 55,
        brand_id: 103,
        category_id: 102,
        created_at: now,
        updated_at: now,
      },
    ], {
      updateOnDuplicate: [
        'name',
        'price',
        'oldprice',
        'image',
        'description',
        'specification',
        'buyturn',
        'quantity',
        'brand_id',
        'category_id',
        'updated_at',
      ],
    });

    await queryInterface.bulkInsert('order', [
      {
        id: 101,
        user_id: 102,
        status: 1,
        note: 'Đơn hàng mẫu',
        total: 24990000,
        created_at: now,
        updated_at: now,
      },
    ], {
      updateOnDuplicate: ['user_id', 'status', 'note', 'total', 'updated_at'],
    });

    await queryInterface.bulkInsert('order_detail', [
      {
        id: 101,
        order_id: 101,
        product_id: 101,
        price: 24990000,
        quantity: 1,
        created_at: now,
        updated_at: now,
      },
    ], {
      updateOnDuplicate: ['order_id', 'product_id', 'price', 'quantity', 'updated_at'],
    });

    await queryInterface.bulkInsert('feedback', [
      {
        id: 101,
        product_id: 101,
        user_id: 102,
        star: 5,
        content: 'Sản phẩm tốt, đúng như mô tả.',
        created_at: now,
        updated_at: now,
      },
    ], {
      updateOnDuplicate: ['product_id', 'user_id', 'star', 'content', 'updated_at'],
    });

    await queryInterface.bulkInsert('news', [
      {
        id: 101,
        title: 'Sản phẩm mới đáng chú ý',
        image: '',
        content: 'Các sản phẩm nổi bật đang có trong cửa hàng.',
        created_at: now,
        updated_at: now,
      },
    ], {
      updateOnDuplicate: ['title', 'image', 'content', 'updated_at'],
    });

    await queryInterface.bulkInsert('news_detail', [
      {
        id: 101,
        product_id: 101,
        news_id: 101,
        created_at: now,
        updated_at: now,
      },
      {
        id: 102,
        product_id: 102,
        news_id: 101,
        created_at: now,
        updated_at: now,
      },
    ], {
      updateOnDuplicate: ['product_id', 'news_id', 'updated_at'],
    });

    await queryInterface.bulkInsert('banner', [
      {
        id: 101,
        name: 'Banner trang chủ',
        image: '',
        status: 1,
        created_at: now,
        updated_at: now,
      },
    ], {
      updateOnDuplicate: ['name', 'image', 'status', 'updated_at'],
    });

    await queryInterface.bulkInsert('banner_detail', [
      {
        id: 101,
        product_id: 101,
        banner_id: 101,
        created_at: now,
        updated_at: now,
      },
      {
        id: 102,
        product_id: 102,
        banner_id: 101,
        created_at: now,
        updated_at: now,
      },
    ], {
      updateOnDuplicate: ['product_id', 'banner_id', 'updated_at'],
    });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('banner_detail', { id: bannerDetailIds }, {});
    await queryInterface.bulkDelete('banner', { id: bannerIds }, {});
    await queryInterface.bulkDelete('news_detail', { id: newsDetailIds }, {});
    await queryInterface.bulkDelete('news', { id: newsIds }, {});
    await queryInterface.bulkDelete('feedback', { id: feedbackIds }, {});
    await queryInterface.bulkDelete('order_detail', { id: orderDetailIds }, {});
    await queryInterface.bulkDelete('order', { id: orderIds }, {});
    await queryInterface.bulkDelete('product', { id: productIds }, {});
    await queryInterface.bulkDelete('brand', { id: brandIds }, {});
    await queryInterface.bulkDelete('category', { id: categoryIds }, {});
    await queryInterface.bulkDelete('user', { id: userIds }, {});
  },
};
