const {createEmployee} = require('../../employee/handlers');
const EmployeeUseCase = require('../../employee/use-cases/create-employee.use-case');


jest.mock('../../employee/use-cases/create-employee.use-case', () => ({
    execute: jest.fn(),
}));

describe('createEmployee', () => {

    const bodyMock = {
        "name": "Jaidson Dantas",
        "age": 30,
        "office": "Developer"
    }

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create an employee successfully', async () => {
        const event = {body: JSON.stringify(bodyMock)};
        const requestBody = bodyMock;
        const expectedResult = {};
        const mockExecute = jest.fn().mockResolvedValue(expectedResult);
        EmployeeUseCase.execute.mockImplementation(mockExecute);

        await createEmployee(event);

        // Assert
        expect(EmployeeUseCase.execute).toHaveBeenCalledTimes(1);
        expect(EmployeeUseCase.execute).toHaveBeenCalledWith(requestBody);
    });

    it('should return an error when creating the employee', async () => {
        const event = { body: JSON.stringify(bodyMock)};
        const requestBody = bodyMock;
        const expectedError = new Error('Error in create employee');

        const mockExecute = jest.fn().mockRejectedValue(expectedError);
        EmployeeUseCase.execute.mockImplementation(mockExecute);

        const result = await createEmployee(event);

        expect(EmployeeUseCase.execute).toHaveBeenCalledTimes(1);
        expect(EmployeeUseCase.execute).toHaveBeenCalledWith(requestBody);
        expect(result).toEqual({
            statusCode: expectedError.statusCode,
            body: expectedError.message,
            undefined,
        });
    });
});
