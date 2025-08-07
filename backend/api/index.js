console.log("Loading API handler...");

const app = require('../server');
const serverless = require('serverless-http');

console.log("App loaded. Exporting handler...");

module.exports = serverless(app);
