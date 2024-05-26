// const DynamoDB = require("aws-sdk/client/dynamodb");

// const documentClient = new DynamoDB.DocumentClient({
//   region: process.env.REGION,
//   maxRetries: 3,
//   httpOptions: {
//     timeout: 5000,
//   },
// });

// module.exports = documentClient;

const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: process.env.REGION,
  maxRetries: 3,
  httpOptions: {
    timeout: 5000,
  },
});

module.exports = dynamodb;
