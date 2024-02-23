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

    it('should delete employee', async () => {
        const mockParams = {"Key": {"id": "1"}, "TableName": "employees",}
        const mockDynamoDBClient = {
            delete: jest.fn().mockReturnThis(),
            promise: jest.fn().mockResolvedValue({})
        };
        employeeRepository = new EmployeeRepository(mockDynamoDBClient);
        await employeeRepository.delete('1');

        expect(mockDynamoDBClient.delete).toHaveBeenCalledTimes(1);
        expect(mockDynamoDBClient.delete).toHaveBeenCalledWith(mockParams);
    });

    it('should get employee by id', async () => {
        const mockParams = {"Key": {"id": "7bf6f4f5-d933-4d51-8505-c01615804ab1"}, "TableName": "employees"}
        const mockResult = {
            "office": "Developer",
            "id": "7bf6f4f5-d933-4d51-8505-c01615804ab1",
            "name": "Jaidson Dantas",
            "age": 30
        }
        const mockDynamoDBClient = {
            get: jest.fn().mockReturnThis(),
            promise: jest.fn().mockResolvedValue(mockResult)
        };
        employeeRepository = new EmployeeRepository(mockDynamoDBClient);
        const result = await employeeRepository.getById('7bf6f4f5-d933-4d51-8505-c01615804ab1');

        expect(mockDynamoDBClient.get).toHaveBeenCalledTimes(1);
        expect(mockDynamoDBClient.get).toHaveBeenCalledWith(mockParams);
        expect(result).toEqual(mockResult);
    });

    it('should update employee', async () => {
        const body = {
            name: "Jose Santos",
            age: 100,
            office: "retire"
        }
        const {name, age, office} = body;

        const mockParams = {
            "Key": {"id": "1"}, "TableName": "employees",
            UpdateExpression: "set #o = :o, #n = :n, #a = :a",
            ExpressionAttributeNames: {
                "#o": "office",
                "#n": "name",
                "#a": "age"
            },
            ExpressionAttributeValues: {
                ":o": office,
                ":n": name,
                ":a": age
            },
            ReturnValues: "ALL_NEW"
        }
        const mockDynamoDBClient = {
            update: jest.fn().mockReturnThis(),
            promise: jest.fn().mockResolvedValue({"age": 100, "name": "Jose Santos", "office": "retire"})
        };

        employeeRepository = new EmployeeRepository(mockDynamoDBClient);
        const result = await employeeRepository.update('1', body);

        expect(mockDynamoDBClient.update).toHaveBeenCalledTimes(1);
        expect(mockDynamoDBClient.update).toHaveBeenCalledWith(mockParams);
        expect(result).toEqual(body)
    });
});
