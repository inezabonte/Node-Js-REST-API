import winston from 'winston';
import express from 'express';
import trimmer from 'trim-request-body';
import cors from 'cors';
import logging from './helpers/logging';
import routes from './routes/index';
import './config/cloudninary';
import db from './models';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './config/swaggerDoc';
import methodOverride from 'method-override';
import messages from './utils/messages';
import response from './utils/responses';
import './config/env';

const app = express();

logging();

const router = express.Router();

// Pass router to routes
routes(router);

// Pass router to swagger middleware
swaggerDoc(router);

// Allow cross origin access
app.use(cors());

// Parse application/json
app.use(express.json());

// Parse application/xwww-
app.use(express.urlencoded({ extended: false }));

// Trim the parsed request body
app.use(trimmer);

app.use(methodOverride());

// Handle base route
app.get('/', (req, res) =>
  response(res, 200, 'success', {
    message: 'Welcome to Simple node js API',
  })
);

app.use('/api/v1', router, swaggerUi.serve);
// Handle routes not found
app.use('*', (req, res) =>
  response(res, 404, 'error', {
    message: messages.notFound,
  })
);

// Finally, check db connection then start the server...
const { sequelize } = db;
sequelize
  .authenticate()
  .then(() => {
    winston.info('Database connected...');
    const server = app.listen(process.env.PORT || 3000, () =>
      winston.info(`Listening on port ${server.address().port}`)
    );
  })
  .catch(e => {
    console.log(e);
    winston.error(`Error: ${err}`);
    throw e.message;
  });

export default app;
