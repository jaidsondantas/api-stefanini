const EmployeeRepository = require('../repositories/employee.repository');

class DeleteEmployeeUseCase {
    async execute(id) {
        try {
            return await new EmployeeRepository().delete(id)
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new DeleteEmployeeUseCase()

