import express from 'express';
import { createYoga } from 'graphql-yoga';
import helmet from 'helmet';
import schema from '../schema/index.js';

export const yoga = createYoga({
  schema,
});
export const yogaRouter = express.Router();
// GraphiQL specefic CSP configuration
yogaRouter.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'style-src': ["'self'", 'unpkg.com'],
        'script-src': ["'self'", 'unpkg.com', "'unsafe-inline'"],
        'img-src': ["'self'", 'raw.githubusercontent.com'],
      },
    },
  })
);

yogaRouter.use(yoga);