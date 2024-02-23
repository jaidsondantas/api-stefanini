const CreateEmployeeUseCase = require('../../../employee/use-cases/create-employee.use-case');
const EmployeeRepository = require('../../../employee/repositories/employee.repository');
jest.mock('../../../employee/repositories/employee.repository');

describe('CreateEmployeeUseCase', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create an employee successfully', async () => {
        const employeeData = {
            name: 'John Doe',
            position: 'Developer'
        };
        const mockCreate = jest.fn().mockResolvedValue({});
        EmployeeRepository.prototype.create.mockImplementation(mockCreate);

        const result = await CreateEmployeeUseCase.execute(employeeData);

        expect(mockCreate).toHaveBeenCalledTimes(1);
        expect(mockCreate).toHaveBeenCalledWith(employeeData);
        expect(result).toEqual({});
    });

    it('should throw an error when creating the employee', async () => {
        const employeeData = {
            name: 'John Doe',
            position: 'Developer'
        };

        const mockCreate = jest.fn().mockRejectedValue(new Error('Error creating employee'));
        EmployeeRepository.prototype.create.mockImplementation(mockCreate);

        await expect(CreateEmployeeUseCase.execute(employeeData)).rejects.toThrowError('Error creating employee');
        expect(mockCreate).toHaveBeenCalledTimes(1);
        expect(mockCreate).toHaveBeenCalledWith(employeeData);
    });
});
