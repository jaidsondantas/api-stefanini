const GetByIdEmployeeUseCase = require('../../../employee/use-cases/get-by-id-employee.use-case');
const EmployeeRepository = require('../../../employee/repositories/employee.repository');
jest.mock('../../../employee/repositories/employee.repository');

describe('GetByIdEmployeeUseCase', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should getById an employee with successfully', async () => {
        const mockId = '7bf6f4f5-d933-4d51-8505-c01615804ab1';
        let mockResult = {
            "office": "Desenvolvedor",
            "id": "7bf6f4f5-d933-4d51-8505-c01615804ab1",
            "name": "Jaidson Dantas",
            "age": 30
        };
        const mockGetById = jest.fn().mockResolvedValue(mockResult);

        EmployeeRepository.prototype.getById.mockImplementation(mockGetById);

        const result = await GetByIdEmployeeUseCase.execute(mockId);

        expect(mockGetById).toHaveBeenCalledTimes(1);
        expect(mockGetById).toHaveBeenCalledWith(mockId);
        expect(result).toEqual(mockResult);
    });

    it('should throw an error when try getById employee', async () => {
        const mockGetById = jest.fn().mockRejectedValue(new Error('Error deleting employee'));
        EmployeeRepository.prototype.getById.mockImplementation(mockGetById);

        await expect(GetByIdEmployeeUseCase.execute(undefined)).rejects.toThrowError('Error deleting employee');
        expect(mockGetById).toHaveBeenCalledTimes(1);
    });
});
