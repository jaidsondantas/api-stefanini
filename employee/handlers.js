'use strict'
const {extractBody} = require("./helpers/extract.helper");
const CreateEmployeeUseCase = require("./use-cases/create-employee.use-case");
const GetAllEmployeeUseCase = require("./use-cases/get-all-employee.use-case");
const DeleteEmployeeUseCase = require("./use-cases/delete-employee.use-case");
const UpdateEmployeeUseCase = require("./use-cases/update-employee.use-case");
const buildResponse = require("../config/config");

let body;

module.exports.createEmployee = async (event) => {
    let statusCode = 201;

    try {
        const requestBody = extractBody(event);
        body = await CreateEmployeeUseCase.execute(requestBody);
    } catch (error) {
        statusCode = error?.statusCode
        body = error?.message
    }

    return buildResponse(statusCode, body);
}

module.exports.getAllEmployee = async (event) => {
    let statusCode = 200;
    try {
        body = await GetAllEmployeeUseCase.execute();
    } catch (error) {
        statusCode = error?.statusCode
        body = error?.message
    }

    return buildResponse(statusCode, body);
}

module.exports.deleteEmployee = async (event) => {
    let statusCode = 200;
    try {
        body = await DeleteEmployeeUseCase.execute(event.pathParameters.id);
    } catch (error) {
        statusCode = error?.statusCode
        body = error?.message
    }

    return buildResponse(statusCode, body);
}

module.exports.updateEmployee = async (event) => {
    let statusCode = 200;
    try {
        const requestBody = extractBody(event);
        body = await UpdateEmployeeUseCase.execute(event.pathParameters.id, requestBody);
    } catch (error) {
        statusCode = error?.statusCode
        body = error?.message
    }

    return buildResponse(statusCode, body);
}
