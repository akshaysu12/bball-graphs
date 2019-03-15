const { GraphQLServer } = require('graphql-yoga')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const { Prisma } = require('prisma-binding')


const resolvers = {
    Query,
    Mutation
}

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: req => ({
      req,
      prisma: new Prisma({
          typeDefs: 'src/generated/prisma.graphql',
          endpoint: 'https://us1.prisma.sh/akshaysub12-298f18/server/dev',
          debug: true
      }),
  }),
})

const opts = {
    port: 4000,
    cors: {
      credentials: true,
      origin: ["http://localhost:3000"] // your frontend url.
    }
  };

server.start(opts => console.log(`Server is running on http://localhost:4000`))
