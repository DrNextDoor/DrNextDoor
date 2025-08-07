const app = require('../server'); // Adjust if file is named differently
const serverless = require('serverless-http');

module.exports.handler = serverless(app);
