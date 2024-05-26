const dynamodb = require("../utils/database");
const TASKS_TABLE_NAME = process.env.TASKS_TABLE;

module.exports.handler = async (event) => {
  const { id } = event.pathParameters;

  const params = {
    TableName: TASKS_TABLE_NAME,
    Key: { id },
  };

  try {
    await dynamodb.delete(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Task deleted successfully" }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to delete task" }),
    };
  }
};
