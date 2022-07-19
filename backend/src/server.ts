import dotenv from "dotenv";
import app, { corsOptions } from "./app";
dotenv.config();
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import config from "config";
import http from "http";
import { resolvers } from "./resolvers";
import connectDB from "./utils/connectDB";
import deserializeUser from "./middleware/deserializeUser";

async function startServer() {
  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers,
    dateScalarMode: "isoDate",
  });

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req, res }) => ({ req, res, deserializeUser }),
  });

  // Start the server
  await server.start();

  // Apply middleware
  server.applyMiddleware({ app, cors: corsOptions });

  // Listen on port
  const port = config.get<number>("PORT") || 3333;
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);

  // CONNECT MONGODB
  connectDB();

  process.on("unhandledRejection", (err: any) => {
    console.log("UNHANDLED REJECTION");
    console.error("Error: ", err.message);
    console.log("🚀 ~ file: server.ts ~ line 48 ~ process.on ~ err", err);

    httpServer.close(async () => {
      process.exit(1);
    });
  });
}

startServer();
