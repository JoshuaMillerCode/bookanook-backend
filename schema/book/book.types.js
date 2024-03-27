const bookTypeDefs = [
  `
  type Book {
    title: String
    author: String
    numOfPages: Int
    publisher: String
    owner: User!
    image: String
    synopsis: String
  }

  type Query {
    books: [Book]
  }
`,
];

export default bookTypeDefs;
