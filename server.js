import express from 'express';
import helmet from 'helmet';
import { yoga, yogaRouter } from './config/yogaConfig.js';
import cors from 'cors';
import passport from 'passport';
import localAuthRoutes from './routes/localAuth.js';
import morgan from 'morgan';

const app = express();

// DB Connection
import './config/db.js';

// Body Parser
app.use(express.json());

//Logger Middleware
app.use(morgan('tiny'));

//cors setup
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

// //Passport setup
app.use(passport.initialize());

// JWT Strategy
import './services/jwtPassport.js';

// JWT Auth Routes
app.use('/auth', localAuthRoutes);

// GraphQL endpoint
app.use(
  yoga.graphqlEndpoint,
  process.env.NODE_ENV === "development" ? (_, __, next) => next() : passport.authenticate('jwt', { session: false }),
  yogaRouter
);

// Add the global CSP configuration for the rest of your server.
app.use(helmet());

// console.log(process.env.NODE_ENV)

// test route
app.get(
  '/hello',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send('Hello World!');
  }
);

app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});
