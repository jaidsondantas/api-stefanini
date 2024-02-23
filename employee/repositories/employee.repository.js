const {dynamoDBClient} = require("../../infra/database/config");
const uuid = require("uuid");

class EmployeeRepository {
    tableName = 'employees';
    dynamo = dynamoDBClient;

    constructor(
        dynamoDBClientConstructor = dynamoDBClient
    ) {
        this.dynamo = dynamoDBClientConstructor;
    }

    async create(employee) {
        try {
            employee = {
                ...employee,
                id: uuid.v4()
            }
            const params = {
                TableName: this.tableName,
                Item: employee
            };

            return await this.dynamo.put(params).promise();
        } catch (error) {
            throw error;
        }
    }

    async getAll(){
        try {
            const params = {
                TableName: this.tableName,
            };

            return await this.dynamo.scan(params).promise();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = EmployeeRepository
