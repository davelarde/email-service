# email-service
A Lambda function to send emails. Deployed via GitHub Actions and the Serverless framework

## Deploying
This project deploys to AWS Lambda
In order for this service to deploy correctly, you'll need to create a new AWS IAM user with the correct permissions, and add the access key and id to the repo secrets

## Email Address
You'll need to add a verified email address to your AWS SES account and edit the email address in the `handler.js` file.

