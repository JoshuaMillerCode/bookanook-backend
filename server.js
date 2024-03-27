import express from 'express';
import helmet from 'helmet';
import { yoga, yogaRouter } from './config/yogaConfig.js';

const app = express();

// DB Connection
import './config/db.js';

// By adding the GraphQL Yoga router before the global helmet middleware,
// you can be sure that the global CSP configuration will not be applied to the GraphQL Yoga endpoint
app.use(yoga.graphqlEndpoint, yogaRouter);

// Add the global CSP configuration for the rest of your server.
app.use(helmet());

// You can know register your other endpoints that will not be affected by the GraphiQL CSP configuration
app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});
