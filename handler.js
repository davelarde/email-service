'use strict';
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });

module.exports.sendEmail = async (event) => {
  // select from the query parameters
  const queryParams = event.queryStringParameters || {};
  let { email, message, subject } = queryParams;

  // if no email is provided, return an error
  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Email is required',
      }),
    };
  }
  message = message || 'This is a message generated automatically from a Lambda function.';
  subject = subject || 'Hello from Lambda';

  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Data: message,
        },
      },
      Subject: {
        Data: subject,
      },
    },
    Source: 'danielavelarde4@gmail.com', // The email you want to show as the "sender" when the email is received.  This must be added as an identity via the AWS SES console and verified.
  };
  await ses.sendEmail(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Email sent to ${email} with subject ${subject} and message ${message}`,
        input: event,
      },
      null,
      2
    ),
  };
};
