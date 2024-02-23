const EmployeeRepository = require('../repositories/employee.repository');

class GetByIdEmployeeUseCase {
    async execute(id) {
        try {
            return await new EmployeeRepository().getById(id)
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new GetByIdEmployeeUseCase()

