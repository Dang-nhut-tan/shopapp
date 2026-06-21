process.env.NODE_ENV = 'test';

const fs = require('fs');
const path = require('path');
const db = require('../models/index.js');
const userPagination = require('../utils/userPagination.js');

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

function loadUserDto(fileName, className) {
  const dtoPath = path.join(__dirname, '..', 'dtos', 'request', 'user', fileName);
  const source = fs.readFileSync(dtoPath, 'utf8');


  // DTO đang dùng ES module, còn Jest của project đang chạy CommonJS.
  const commonJsSource = source
    .replace('import Joi from "joi";', 'const Joi = require("joi");')
    .replace(`export default ${className};`, `return ${className};`);

  return Function('require', commonJsSource)(require);
}

function loadUserController() {
  const controllerPath = path.join(__dirname, '..', 'controllers', 'UserController.js');
  const InsertUserReq = loadUserDto('insertUserReq.js', 'InsertUserReq');
  const UpdateUserReq = loadUserDto('updateUserReq.js', 'UpdateUserReq');
  const source = fs.readFileSync(controllerPath, 'utf8');

  // Controller cũng dùng ES module, nên đổi import/export tối thiểu để test bằng Jest hiện tại.
  const commonJsSource = source
    .replace('import db from "../models/index.js";', 'const db = arguments[0];')
    .replace('import userPagination from "../utils/userPagination.js";', 'const userPagination = arguments[1];')
    .replace('import InsertUserReq from "../dtos/request/user/insertUserReq.js";', 'const InsertUserReq = arguments[2];')
    .replace('import UpdateUserReq from "../dtos/request/user/updateUserReq.js";', 'const UpdateUserReq = arguments[3];')
    .replace(/export async function (\w+)/g, 'async function $1');

  return Function(`${commonJsSource}\nreturn { getUsers, getUsersBYID, insertUsers, updateUsers, deleteUsers };`)(
    db,
    userPagination,
    InsertUserReq,
    UpdateUserReq,
  );
}

module.exports = {
  db,
  createMockResponse,
  setupTestDatabase,
  cleanupTestDatabase,
  closeTestDatabase,
  useTestDatabase,
  loadUserController,
};
