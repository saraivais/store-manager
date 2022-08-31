const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Store Manager',
    description: 'Store Manager is a RESTful API that simulates a management system for sales in drop shipping format, making it possible to create, read, update and delete (CRUD) both products and sales.',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);