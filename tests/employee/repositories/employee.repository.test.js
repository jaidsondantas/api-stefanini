const EmployeeRepository = require('../../../employee/repositories/employee.repository');

describe('EmployeeRepository', () => {
    let employeeRepository;

    it('should insert an employee into the database with a generated ID', async () => {
        const mockDynamoDBClient = {
            put: jest.fn().mockReturnThis(),
            promise: jest.fn().mockResolvedValue({})
        };
        employeeRepository = new EmployeeRepository(mockDynamoDBClient);
        const employeeData = {
            name: 'John Doe',
            position: 'Developer'
        };

        await employeeRepository.create(employeeData);

        expect(mockDynamoDBClient.put).toHaveBeenCalledTimes(1);
        const putParams = mockDynamoDBClient.put.mock.calls[0][0];
        expect(putParams.TableName).toBe('employees');
        expect(putParams.Item).toBeDefined();
        expect(putParams.Item.name).toBe(employeeData.name);
        expect(putParams.Item.position).toBe(employeeData.position);
        expect(putParams.Item.id).toBeDefined();
    });


    it('should get all employee into the database', async () => {
        const returnMock = [{
            "name": "Jaidson Dantas",
            "age": 30,
            "office": "Developer"
        }]
        const mockDynamoDBClient = {
            scan: jest.fn().mockReturnThis(),
            promise: jest.fn().mockResolvedValue(
                returnMock
            )
        };
        employeeRepository = new EmployeeRepository(mockDynamoDBClient);
        const result = await employeeRepository.getAll();

        expect(mockDynamoDBClient.scan).toHaveBeenCalledTimes(1);
        expect(result).toEqual(returnMock);
    });
});
