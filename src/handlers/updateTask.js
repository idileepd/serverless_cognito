const dynamodb = require("../utils/database");
const TASKS_TABLE_NAME = process.env.TASKS_TABLE;

module.exports.handler = async (event) => {
  const { id } = event.pathParameters;
  const { title, desc } = JSON.parse(event.body);

  const params = {
    TableName: TASKS_TABLE_NAME,
    Key: { id },
    UpdateExpression: "set #title = :title, #desc = :desc",
    ExpressionAttributeNames: {
      "#title": "title",
      "#desc": "desc",
    },
    ExpressionAttributeValues: {
      ":title": title,
      ":desc": desc,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    const { Attributes } = await dynamodb.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(Attributes),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to update task" }),
    };
  }
};
