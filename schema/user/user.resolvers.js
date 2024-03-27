const users = [
  { id: 1, username: 'Tom', password: '1234', age: 24 },
  { id: 2, username: 'Sashko', password: '1234', age: 30 },
  { id: 3, username: 'Mikhail', password: '1234', age: 50 },
];

const userResolvers = {
  Query: {
    user: async (_, { id }) => {
      return users.find((u) => u.id === id);
    },
    hello: () => {
      return 'Hello!!!';
    },
  },
};

export default userResolvers;
