import swaggerUi from 'swagger-ui-express';
//import swaggerDocument from './swagger-output.json' assert { type: 'json' };
const swaggerDocument = require('./swagger-output.json');

import { Express } from 'express';

export function setupSwagger(app: Express) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
