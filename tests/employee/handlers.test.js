const {createEmployee, deleteEmployee, updateEmployee} = require('../../employee/handlers');
const CreateEmployeeUseCase = require('../../employee/use-cases/create-employee.use-case');
const DeleteEmployeeUseCase = require('../../employee/use-cases/delete-employee.use-case');
const UpdateEmployeeUseCase = require('../../employee/use-cases/update-employee.use-case');


jest.mock('../../employee/use-cases/create-employee.use-case', () => ({
    execute: jest.fn(),
}));
jest.mock('../../employee/use-cases/delete-employee.use-case', () => ({
    execute: jest.fn(),
}));
jest.mock('../../employee/use-cases/update-employee.use-case', () => ({
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
        CreateEmployeeUseCase.execute.mockImplementation(mockExecute);

        await createEmployee(event);

        // Assert
        expect(CreateEmployeeUseCase.execute).toHaveBeenCalledTimes(1);
        expect(CreateEmployeeUseCase.execute).toHaveBeenCalledWith(requestBody);
    });

    it('should return an error when creating the employee', async () => {
        const event = {body: JSON.stringify(bodyMock)};
        const requestBody = bodyMock;
        const expectedError = new Error('Error in create employee');

        const mockExecute = jest.fn().mockRejectedValue(expectedError);
        CreateEmployeeUseCase.execute.mockImplementation(mockExecute);

        const result = await createEmployee(event);

        expect(CreateEmployeeUseCase.execute).toHaveBeenCalledTimes(1);
        expect(CreateEmployeeUseCase.execute).toHaveBeenCalledWith(requestBody);
        expect(JSON.parse(result.body)).toEqual(
            expectedError.message,
        );
    });
});


describe('deleteEmployee', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should delete an employee successfully', async () => {
        const event = {pathParameters: JSON.stringify({id: "1"})};
        const mockExecute = jest.fn().mockResolvedValue();
        DeleteEmployeeUseCase.execute.mockImplementation(mockExecute);

        await deleteEmployee(event);

        expect(DeleteEmployeeUseCase.execute).toHaveBeenCalledTimes(1);
    });
});


describe('updateEmployee', () => {

    const bodyMock = {
        "name": "Jaidson Dantas",
        "age": 30,
        "office": "Developer"
    }

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update an employee successfully', async () => {
        const event = {
            body: JSON.stringify(bodyMock),
            pathParameters: {id: "1"}
        };

        const mockExecute = jest.fn().mockResolvedValue();
        UpdateEmployeeUseCase.execute.mockImplementation(mockExecute);

        await updateEmployee(event);

        expect(UpdateEmployeeUseCase.execute).toHaveBeenCalledTimes(1);
        expect(UpdateEmployeeUseCase.execute).toHaveBeenCalledWith("1", {
            "age": 30,
            "name": "Jaidson Dantas",
            "office": "Developer"
        });
    });

    it('should return an error when updating the employee', async () => {
        const event =
            {
                body: JSON.stringify(bodyMock),
                pathParameters: {id: "1"}
            };
        const requestBody = bodyMock;
        const expectedError = new Error('Error in update employee');

        const mockExecute = jest.fn().mockRejectedValue(expectedError);
        UpdateEmployeeUseCase.execute.mockImplementation(mockExecute);

        const result = await updateEmployee(event);

        expect(UpdateEmployeeUseCase.execute).toHaveBeenCalledTimes(1);
        expect(UpdateEmployeeUseCase.execute).toHaveBeenCalledWith("1", {
            "age": 30,
            "name": "Jaidson Dantas",
            "office": "Developer"
        });
        expect(JSON.parse(result.body)).toEqual(expectedError.message);
    });
});
