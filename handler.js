'use strict';
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-west-2' });

module.exports.sendEmail = async (event) => {
  const params = {
    Destination: {
      ToAddresses: ['example@example.com'], // This should be your email address
    },
    Message: {
      Body: {
        Text: {
          Data: 'This is a message generated automatically from a Lambda function.',
        },
      },
      Subject: {
        Data: 'Hello from Lambda',
      },
    },
    Source: 'example@example.com', // This can be any email address, the email you want to show as the "sender" when the email is received
  };
  await ses.sendEmail(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
