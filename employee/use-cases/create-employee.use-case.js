const EmployeeRepository = require('../repositories/employee.repository');

class CreateEmployeeUseCase {
    async execute(body) {
        try {
            return await new EmployeeRepository().create(body)
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CreateEmployeeUseCase()

