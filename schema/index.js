import { makeExecutableSchema } from '@graphql-tools/schema';
import userSchema from './user/index.js';
import bookSchema from './book/index.js';

// Multiple files to keep your project modularised
const schema = makeExecutableSchema({
  typeDefs: [
    userSchema.typeDefs, // First defines the type Query
    bookSchema.typeDefs,
  ],
  resolvers: [userSchema.resolvers, bookSchema.resolvers],
});

export default schema;
