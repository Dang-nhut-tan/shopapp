const { createMockResponse, useTestDatabase } = require('./testBase.js');

useTestDatabase();

describe('testBase', () => {
  test('có thể giả lập response json', () => {
    const res = createMockResponse();

    res.status(200).json({
      message: 'Unit test hoạt động',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      message: 'Unit test hoạt động',
    });
  });
});
