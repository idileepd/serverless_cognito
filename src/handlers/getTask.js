const dynamodb = require("../utils/database");

module.exports.handler = async (event) => {
  const { id } = event.pathParameters;

  console.log(id);
  console.log(process.env.TASKS_TABLE);

  const params = {
    TableName: process.env.TASKS_TABLE,
    Key: { id: parseInt(id) },
  };

  try {
    const { Item } = await dynamodb.get(params).promise();
    if (Item) {
      return {
        statusCode: 200,
        body: JSON.stringify(Item),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Task not found" }),
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to get task" }),
    };
  }
};
