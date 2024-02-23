const EmployeeRepository = require('../repositories/employee.repository');
const GetByIdUseCase = require('./get-by-id-employee.use-case');
const Exception = require('../exceptions/exception');

class UpdateEmployeeUseCase {
    async execute(id, body) {
        try {
            const employee = GetByIdUseCase.execute(id);
            if (!employee) {
                throw new Exception("Employee Nod Found", 404);
            }
            return await new EmployeeRepository().update(id, body)
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UpdateEmployeeUseCase()

