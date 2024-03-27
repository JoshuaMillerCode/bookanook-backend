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
    books: async () => {
      return books;
    },
  },
};

export default bookResolvers;
