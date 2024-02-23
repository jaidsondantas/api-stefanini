const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'AKIA6GBMH5WJLTDOXEPJ',
    secretAccessKey: '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'
});

const dynamoDBClient =new AWS.DynamoDB.DocumentClient({region: 'us-east-1'})

module.exports = {dynamoDBClient};
