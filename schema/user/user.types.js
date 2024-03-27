const userTypeDefs = [
  `
  type User {
    id: Int!
    username: String
    password: String
    age: Int
    displayName: String
    bio: String
    image: String
    books: [Book]
    friends: [User]
  }

  type Query {
    user(id: Int): User
    hello: String
  }
`,
];

export default userTypeDefs;
