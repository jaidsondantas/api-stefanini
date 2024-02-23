const EmployeeRepository = require('../repositories/employee.repository');

class GetAllEmployeeUseCase {
    async execute() {
        try {
            return await new EmployeeRepository().getAll();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new GetAllEmployeeUseCase()

