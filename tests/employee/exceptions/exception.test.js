const  Exception  = require('../../../employee/exceptions/exception');

describe('Exception', () => {
  test('should create an instance of Exception with default status code', () => {
    const error = new Exception('Test message');
    expect(error.message).toBe('Test message');
    expect(error.statusCode).toBe(500);
  });

  test('should create an instance of Exception with custom status code', () => {
    const error = new Exception('Test message', 404);
    expect(error.message).toBe('Test message');
    expect(error.statusCode).toBe(404);
  });
});
