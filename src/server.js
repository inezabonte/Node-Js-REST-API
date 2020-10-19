import winston from 'winston';
import express from 'express';
import logging from './helpers/logging';
import routes from './routes/index';
import './config/cloudninary';
import db from './models';

const app = express();
app.use(express.json());
logging();
app.use(routes);

// db connection check
db.authenticate()
  .then(() => winston.info('Database connected...'))
  .catch(err => winston.error(`Error: ${err}`));

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

export default server;
