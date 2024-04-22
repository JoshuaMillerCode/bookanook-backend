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
    friendRequests: [FriendRequest]
  }

  type FriendRequest {
    recipient: String!
    requester: String!
    accepted: Boolean
  }

  type FriendRequestReturn {
    status: String
    friendRequest: FriendRequest
  }

  type MessageReturn {
    message: String
  } 

  input UpdateUserInput {
    username: String
    age: Int
    displayName: String
    bio: String
    image: String
  }

  input FriendRequestChoice {
    requesterId: String!
    choice: Boolean
  }

  type Query {
    getUser(id: String): User
  }

  type Mutation {
    updateUser(id: String!, update: UpdateUserInput!): User

    deleteUser(id: String!): User

    sendFriendRequest(id: String!): FriendRequestReturn

    handleFriendRequest(answer: FriendRequestChoice): MessageReturn

    removeFriend(id: String): User
  }
`,
];

export default userTypeDefs;
