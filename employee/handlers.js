'use strict'

const {extractBody} = require("./helpers/extract.helper");
const {headers} = require("../config/config");
const CreateEmployeeUseCase = require("./use-cases/create-employee.use-case");
const GetAllEmployeeUseCase = require("./use-cases/get-all-employee.use-case");

let body;

module.exports.createEmployee = async (event) => {
    let statusCode = 201;

    try {
        const requestBody = extractBody(event);
        const res = await CreateEmployeeUseCase.execute(requestBody);
        body = JSON.stringify(res);
    } catch (error) {
        statusCode = error?.statusCode
        body = error?.message
    }

    return {
        statusCode,
        body,
        headers,
    };
}

module.exports.getAllEmployee = async (event) => {
    let statusCode = 200;
    try {
        const res = await GetAllEmployeeUseCase.execute();
        body = JSON.stringify(res)
    } catch (error) {
        statusCode = error?.statusCode
        body = error?.message
    }

    return {
        statusCode,
        body,
        headers,
    };
}
