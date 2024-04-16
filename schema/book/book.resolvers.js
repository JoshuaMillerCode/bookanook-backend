import { searchBooks } from '../../utils/fetchAPI.js';

const bookResolvers = {
  Query: {
    searchGoogleBooks: async (_, { query }) => {
      return await searchBooks(query);
    },
  },
};

export default bookResolvers;
