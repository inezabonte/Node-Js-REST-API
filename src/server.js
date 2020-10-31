import winston from 'winston';
import express from 'express';
import logging from './helpers/logging';
import routes from './routes/index';
import './config/cloudninary';
import db from './models';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './config/swaggerDoc';

const app = express();

logging();

const router = express.Router();

// Pass router to routes
routes(router);

// Pass router to swagger middleware
swaggerDoc(router);

app.use(express.json());

// // Handle base route
// app.get('/', (req, res) => response(res, 200, 'success', {
//   message: messages.welcome,
// }));

app.use('/api/v1', router, swaggerUi.serve);

// db connection check
db.authenticate()
  .then(() => winston.info('Database connected...'))
  .catch(err => winston.error(`Error: ${err}`));

const port = process.env.PORT || 3000;
console.log('here');
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

export default server;
