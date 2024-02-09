// swaggerConfig.js
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Baxter Control API',
      version: '1.0.0',
      description: 'Send commands the Baxter robot to control its movement',
      contact: {
        name: "Joshua Frank"
      }
    }
  };
  
  const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js', './routes/*.yml', './swagger/*yml']
  };
  
  module.exports = options;
  