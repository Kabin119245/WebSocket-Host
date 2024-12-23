// awsConfig.js

require("dotenv").config();
const AWS = require("aws-sdk");

// Configure AWS SDK with credentials and region from .env
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

module.exports = AWS;
