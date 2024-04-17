import express from 'express';
import helmet from 'helmet';
import { yoga, yogaRouter } from './config/yogaConfig.js';
import cors from 'cors';
import passport from 'passport';
// import cookieSession from 'cookie-session';
// import googleAuthRoutes from './routes/googleAuth.js';
import localAuthRoutes from './routes/localAuth.js';
import morgan from 'morgan';

const app = express();

// DB Connection
import './config/db.js';

// Body Parser
app.use(express.json());

//Logger Middleware
app.use(morgan('tiny'));

//===================Work in Progress================================
//make cookie session
// app.use(
//   cookieSession({
//     name: 'session',
//     keys: ['bookanook'],
//     maxAge: 24 * 60 * 60 * 100,
//   })
// );
//===================================================

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

//===================Work in Progress================================
// Google Strategy
// import './services/googlePassport.js';
//===================================================

// JWT Strategy
import './services/jwtPassport.js';
// app.use(passport.session());

// JWT Auth Routes
app.use('/auth', localAuthRoutes);

//===================Work in Progress================================
//Google Auth Routes
// app.use('/auth', googleAuthRoutes);
//===================================================

// GraphQL endpoint
app.use(
  yoga.graphqlEndpoint,
  passport.authenticate('jwt', { session: false }),
  yogaRouter
);

// Add the global CSP configuration for the rest of your server.
app.use(helmet());

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
