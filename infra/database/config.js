const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.ST_AWS_KEY_ID,
    secretAccessKey: process.env.ST_AWS_ACCESS_KEY
});

const dynamoDBClient =new AWS.DynamoDB.DocumentClient({region: 'us-east-1'})

module.exports = {dynamoDBClient};
