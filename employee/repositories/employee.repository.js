const {dynamoDBClient} = require("../../infra/database/config");
const uuid = require("uuid");

class EmployeeRepository {
    tableName = {
        TableName: 'employees'
    };
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
                ...this.tableName,
                Item: employee
            };

            return await this.dynamo.put(params).promise();
        } catch (error) {
            throw error;
        }
    }

    async getAll(){
        try {
            return await this.dynamo.scan(this.tableName).promise();
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const params = {
                ...this.tableName,
                Key: {
                    id
                }
            }

            return await this.dynamo.delete(params).promise();
        } catch (error) {
            throw error;
        }
    }

    async put(id, body) {
        try {
            const {office, name, age} = body;
            const params = {
                ...this.tableName,
                Key: {
                    id
                },
                UpdateExpression: "set #o = :o, #n = :n, #a = :a",
                ExpressionAttributeNames: {
                    "#o": "office",
                    "#n": "name",
                    "#a": "age"
                },
                ExpressionAttributeValues: {
                    ":o": office,
                    ":n": name,
                    ":a": age
                },
                ReturnValues: "ALL_NEW"
            }

            return await this.dynamo.update(params).promise();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = EmployeeRepository
