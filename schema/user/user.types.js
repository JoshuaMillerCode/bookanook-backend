const userTypeDefs = [
  `
  type User {
    id: String
    username: String
    age: Int
    displayName: String
    bio: String
    image: String
    books: [GoogleBook]
    friends: [User]
  }

  type Query {
    getUser(id: String): User
  }

  input UpdateUserInput {
    username: String
    age: Int
    displayName: String
    bio: String
    image: String
  }



  type Mutation {
    updateUser(id: String!, update: UpdateUserInput): User

    deleteUser(id: String): User

    sendFriendRequest(id: String): User
  }
`,
];

export default userTypeDefs;
