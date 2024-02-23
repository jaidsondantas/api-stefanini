const GetAllEmployeeUseCase = require('../../../employee/use-cases/get-all-employee.use-case');
const EmployeeRepository = require('../../../employee/repositories/employee.repository');
jest.mock('../../../employee/repositories/employee.repository');

describe('GetAllEmployeeUseCase', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get all employees successfully', async () => {
        const mockData = [{
            "name": "Jaidson Dantas",
            "age": 30,
            "office": "Developer"
        }]
        const mockGetAll = jest.fn().mockResolvedValue(mockData);
        EmployeeRepository.prototype.getAll.mockImplementation(mockGetAll);

        const result = await GetAllEmployeeUseCase.execute();

        expect(mockGetAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockData);
    });

    it('should throw an error when creating the employee', async () => {
        const mockGetAll = jest.fn().mockRejectedValue(new Error('Error get all employees'));
        EmployeeRepository.prototype.getAll.mockImplementation(mockGetAll);

        await expect(GetAllEmployeeUseCase.execute()).rejects.toThrowError('Error get all employees');
        expect(mockGetAll).toHaveBeenCalledTimes(1);
    });
});
