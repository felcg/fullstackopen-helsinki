/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const { ApolloServer, UserInputError, gql } = require('apollo-server');
const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');

// mongoose.set('useFindAndModify', false);

const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String]
  }
  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }
  type Query {
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    bookCount: Int!
    authorCount: Int!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    allBooks: async (root, args) => {
      const filter = {};
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        filter.author = author.id;
      }
      if (args.genre) {
        filter.genres = { $in: [args.genre] };
      }

      const filteredBooks = await Book.find({
        ...filter,
      })
        .populate('author');
      return filteredBooks;
    },
    allAuthors: () => Author.find({}),
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root._id });
      return books.length;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const {
        title,
        author,
        published,
        genres,
      } = args;

      // check if book author exists,
      // if not add it to the authors
      let authorId = '';
      const authorExists = await Author.findOne({ name: author });
      if (authorExists) {
        authorId = authorExists._id;
      } else {
        const newAuthor = new Author({ name: author });
        await newAuthor.save();
        authorId = newAuthor._id;
      }

      const newBook = new Book({
        title,
        author: authorId,
        published,
        genres,
      });
      await newBook.save();
      return Book.findById(newBook._id).populate('author');
    },
    editAuthor: async (root, args) => {
      const authorExists = await Author.findOne({ name: args.name });
      if (authorExists) {
        authorExists.born = args.setBornTo;
        try {
          return authorExists.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      } else {
        return null;
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
