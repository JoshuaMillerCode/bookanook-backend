const bookTypeDefs = [
  `
  type GoogleBook {
    id: String!
    volumeInfo: VolumeInfo!
  }
  
  type VolumeInfo {
    title: String
    authors: [String]
    publisher: String
    publishedDate: String
    description: String
    imageLinks: ImageLinks
    language: String
    previewLink: String
    infoLink: String
  }
  
  type ImageLinks {
    smallThumbnail: String!
    thumbnail: String
  }
  
  type SearchBooks {
    kind: String!
    totalItems: Int!
    items: [GoogleBook!]
  }
  
  extend type Query {
    searchGoogleBooks(
      query: String!
    ): SearchBooks!
  }
`,
];

export default bookTypeDefs;
