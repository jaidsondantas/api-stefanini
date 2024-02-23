const DeleteEmployeeUseCase = require('../../../employee/use-cases/delete-employee.use-case');
const EmployeeRepository = require('../../../employee/repositories/employee.repository');
jest.mock('../../../employee/repositories/employee.repository');

describe('DeleteEmployeeUseCase', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should delete an employee with successfully', async () => {
        const mockId = {id:'1'};
        const mockDelete = jest.fn().mockResolvedValue({});
        EmployeeRepository.prototype.delete.mockImplementation(mockDelete);

       await DeleteEmployeeUseCase.execute(mockId);

        expect(mockDelete).toHaveBeenCalledTimes(1);
        expect(mockDelete).toHaveBeenCalledWith(mockId);
    });

    it('should throw an error when try delete employee', async () => {
        const mockDelete = jest.fn().mockRejectedValue(new Error('Error deleting employee'));
        EmployeeRepository.prototype.delete.mockImplementation(mockDelete);

        await expect(DeleteEmployeeUseCase.execute(undefined)).rejects.toThrowError('Error deleting employee');
        expect(mockDelete).toHaveBeenCalledTimes(1);
    });
});
