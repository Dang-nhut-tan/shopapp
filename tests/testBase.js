process.env.NODE_ENV = 'test';

const db = require('../models/index.js');

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

async function setupTestDatabase() {
  await db.sequelize.sync({ force: true });
}

async function cleanupTestDatabase() {
  await db.sequelize.truncate({
    cascade: true,
    restartIdentity: true,
  });
}

async function closeTestDatabase() {
  await db.sequelize.close();
}

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
