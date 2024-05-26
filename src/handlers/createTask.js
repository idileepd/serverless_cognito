const dynamodb = require("../utils/database");
const TASKS_TABLE_NAME = process.env.TASKS_TABLE;

console.log("PROCESS ENV");
console.log(process.env);
console.log(process.env.TASKS_TABLE_NAME);

module.exports.handler = async (event) => {
  const { id, title, desc } = JSON.parse(event.body);

  const params = {
    TableName: TASKS_TABLE_NAME,
    Item: {
      id,
      title,
      desc,
    },
  };

  try {
    await dynamodb.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Task created successfully" }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to create task" }),
    };
  }
};

// const documentClient = require("../utils/database");

// const TASKS_TABLE_NAME = process.env.TASKS_TABLE_NAME;
// console.log("process env", process.env);
// console.log("Table name", TASKS_TABLE_NAME);

// console.log(process.env);

// module.exports.handler = async (event, context, callback) => {
//   // 1st method to return api
//   // return {
//   //     statusCode:201,
//   //     body: JSON.stringify({msg:"TASK Created !"})
//   // }

//   const data = JSON.parse(event.body);

//   try {
//     const params = {
//       TableName: TASKS_TABLE_NAME,
//       Item: {
//         id: data.id,
//         title: data.title,
//         desc: data.desc,
//       },
//     };
//     await documentClient.put(params).promise();
//     callback(null, {
//       statusCode: 201,
//       body: JSON.stringify(data),
//     });
//   } catch (error) {
//     console.log(error);
//     callback(null, {
//       statusCode: 500,
//       body: JSON.stringify({ err: error.message }),
//     });
//   }

//   //   // 2nd method to return
//   //   callback(null, {
//   //     statusCode: 201,
//   //     body: JSON.stringify({ msg: "TASK Created !", data }),
//   //   });
// };
