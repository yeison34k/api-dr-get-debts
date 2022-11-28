import { DynamoDB } from 'aws-sdk'

const dynamoDb = new DynamoDB.DocumentClient()


module.exports.get = (event, context) => {
  const params: any  = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  // fetch todo from the database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      return  {
        statusCode: error.statusCode || 501,
        body: 'Couldn\'t fetch the todo item.',
      };
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };

    return response;
  });
};