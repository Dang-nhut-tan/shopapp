const {
  db,
  createMockResponse,
  loadResponseUserDto,
  loadUserController,
  useTestDatabase,
} = require('./testBase.js');

useTestDatabase();

let UserController;

beforeAll(() => {
  UserController = loadUserController();
});

function mockReq({ query = {}, params = {}, body = {} } = {}) {
  return { query, params, body };
}

async function seedUser(overrides = {}) {
  return db.User.create({
    email: 'unit-user@shopapp.local',
    password: '123456',
    name: 'Unit Test User',
    role: 0,
    avatar: '',
    phone: '0900000000',
    ...overrides,
  });
}

async function seedManyUsers(total) {
  const users = [];

  for (let id = 1; id <= total; id += 1) {
    users.push(
      seedUser({
        email: `unit-user-${id}@shopapp.local`,
        name: `Unit Test User ${id}`,
      }),
    );
  }

  await Promise.all(users);
}

describe('UserController', () => {
  test('ResponseUser validate rejects password', () => {
    const ResponseUser = loadResponseUserDto();
    const validUser = {
      id: 1,
      email: 'valid-user@example.com',
      name: 'Valid User',
      role: 0,
      avatar: '',
      phone: '0900000000',
    };

    expect(ResponseUser.validate(validUser).error).toBeUndefined();
    expect(ResponseUser.validate({ ...validUser, password: '123456' }).error).toBeDefined();
  });

  test('getUsers trả về danh sách user có phân trang', async () => {
    await seedManyUsers(6);

    const req = mockReq({ query: { page: '2' } });
    const res = createMockResponse();

    await UserController.getUsers(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body.currentPage).toBe(2);
    expect(res.body.totalPage).toBe(2);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0]).not.toHaveProperty('password');
  });

  test('getUsers hỗ trợ tìm kiếm theo email', async () => {
    await seedUser({ email: 'first-user@shopapp.local' });
    await seedUser({ email: 'second-user@shopapp.local' });

    const req = mockReq({ query: { search: 'second' } });
    const res = createMockResponse();

    await UserController.getUsers(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].email).toBe('second-user@shopapp.local');
  });

  test('getUsersBYID trả về user theo id', async () => {
    const user = await seedUser({ email: 'unit-user-by-id@shopapp.local' });

    const req = mockReq({ params: { id: user.id } });
    const res = createMockResponse();

    await UserController.getUsersBYID(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(user.id);
    expect(res.body.data).not.toHaveProperty('password');
  });

  test('getUsersBYID trả về 404 khi không tìm thấy user', async () => {
    const req = mockReq({ params: { id: 999 } });
    const res = createMockResponse();

    await UserController.getUsersBYID(req, res);

    expect(res.statusCode).toBe(404);
  });

  test('insertUsers tạo user mới', async () => {
    const req = mockReq({
      body: {
        email: 'new-user@shopapp.local',
        password: '123456',
        name: 'New User',
        role: 0,
        avatar: '',
        phone: '0900000001',
      },
    });
    const res = createMockResponse();

    await UserController.insertUsers(req, res);

    expect(res.statusCode).toBe(201);
    expect(res.body.data.email).toBe('new-user@shopapp.local');
    expect(res.body.data).not.toHaveProperty('password');
  });

  test('updateUsers cập nhật user', async () => {
    const user = await seedUser({ email: 'update-user@shopapp.local' });

    const req = mockReq({
      params: { id: user.id },
      body: { name: 'Updated User' },
    });
    const res = createMockResponse();

    await UserController.updateUsers(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe('Updated User');
  });

  test('deleteUsers xóa user', async () => {
    const user = await seedUser({ email: 'delete-user@shopapp.local' });

    const req = mockReq({ params: { id: user.id } });
    const res = createMockResponse();

    await UserController.deleteUsers(req, res);

    expect(res.statusCode).toBe(200);
    await expect(db.User.findByPk(user.id)).resolves.toBeNull();
  });
});
