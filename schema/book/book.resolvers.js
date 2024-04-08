const books = [
  {
    title: '1984',
    author: 'George Orwell',
    numOfPages: 234,
    publisher: 'Cool Guys',
  },
];

const bookResolvers = {
  Query: {
    searchGoogleBooks: async (query) => {
      return {
        totalItems: 100,
      };
    },
  },
};

export default bookResolvers;
