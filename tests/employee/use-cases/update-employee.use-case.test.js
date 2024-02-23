const UpdateEmployeeUseCase = require('../../../employee/use-cases/update-employee.use-case');
const EmployeeRepository = require('../../../employee/repositories/employee.repository');
jest.mock('../../../employee/repositories/employee.repository');

describe('UpdateEmployeeUseCase', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update an employee with successfully', async () => {
        const mockId = '1';
        const mockBody = {
            name: 'John Doe',
            position: 'Developer',
            office: 'Developer'
        }
        const mockUpdate = jest.fn().mockResolvedValue({...mockBody});
        EmployeeRepository.prototype.update.mockImplementation(mockUpdate);

       await UpdateEmployeeUseCase.execute(mockId, mockBody);

        expect(mockUpdate).toHaveBeenCalledTimes(1);
        expect(mockUpdate).toHaveBeenCalledWith(mockId, mockBody);
    });

    it('should throw an error when try update employee', async () => {
        const mockUpdate = jest.fn().mockRejectedValue(new Error('Error updating employee'));
        EmployeeRepository.prototype.update.mockImplementation(mockUpdate);

        await expect(UpdateEmployeeUseCase.execute(undefined, undefined)).rejects.toThrowError('Error updating employee');
        expect(mockUpdate).toHaveBeenCalledTimes(1);
    });
});
