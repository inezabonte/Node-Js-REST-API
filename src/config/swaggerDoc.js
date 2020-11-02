import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import './env';

const swaggerDefinition = {
  openapi: '3.0.1',
  info: {
    title: 'Node js simple REST API documentation',
    version: '1.0.0',
    description: 'Node js simple REST API auto generated swagger documentation',
    contact: {
      email: 'salviosage@gmail.com',
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['src/routes/api/*.js', 'src/routes/*.js'],
};

const specs = swaggerJsDoc(options);

export default exp => router => {
  router.get('/documentation', swaggerUi.setup(specs));
};
