import dotenv from 'dotenv'
dotenv.config()
import 'reflect-metadata'

import express from 'express'
import { buildSchema } from 'type-graphql'
import cookieParser from 'cookie-parser'
import { ApolloServer } from 'apollo-server-express'
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core'
import { resolvers } from './resolvers'

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers,
    //authChecker,
  })

  const app = express()
  app.use(cookieParser())

  const server = new ApolloServer({
    schema,
    context: (ctx) => {
      return ctx
    },
    plugins: [
      process.env.NODE_ENV === 'e3'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  })

  await server.start()

  server.applyMiddleware({ app })

  app.listen({ port: 4000 }, () => {
    console.log(`Server sterted on port 4000`)
  })
}

bootstrap()
