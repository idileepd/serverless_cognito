const dynamodb = require("../utils/database");

module.exports.handler = async () => {
  const params = {
    TableName: process.env.TASKS_TABLE,
  };

  try {
    const { Items } = await dynamodb.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(Items),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to retrieve tasks" }),
    };
  }
};
