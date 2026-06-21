process.env.NODE_ENV = 'test';

const db = require('../models/index.js');

// Tạo response giả để test controller mà không cần chạy Express thật.
function createMockResponse() {
  return {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.body = data;
      return this;
    },
  };
}

// Tạo lại toàn bộ bảng trong database test trước khi chạy test suite.
async function setupTestDatabase() {
  await db.sequelize.sync({ force: true });
}

// Xóa dữ liệu sau mỗi test để test sau không bị ảnh hưởng bởi test trước.
async function cleanupTestDatabase() {
  await db.sequelize.truncate({
    cascade: true,
    restartIdentity: true,
  });
}

// Đóng kết nối database khi Jest chạy xong.
async function closeTestDatabase() {
  await db.sequelize.close();
}

// Gom các hook hay dùng để mỗi file test chỉ cần gọi useTestDatabase().
function useTestDatabase() {
  beforeAll(async () => {
    await setupTestDatabase();
  });

  afterEach(async () => {
    await cleanupTestDatabase();
  });

  afterAll(async () => {
    await closeTestDatabase();
  });
}

module.exports = {
  db,
  createMockResponse,
  setupTestDatabase,
  cleanupTestDatabase,
  closeTestDatabase,
  useTestDatabase,
};
