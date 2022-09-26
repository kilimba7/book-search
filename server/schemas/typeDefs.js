// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs (returning an array with this query) Thought (defines this model)
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID
        authors: [String]
        description: String
        title: String
        image: String
        url: String
    }

    type Auth {
        token: ID!
        user: User
      }

    type Query {
        me: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(authors: [String!], description: String!, title: String!, bookId: ID!, image: String!, link: String!): User
        removeBook(bookId: ID!): User
      }
`;

// export it
module.exports = typeDefs;