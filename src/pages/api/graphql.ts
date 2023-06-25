//libs
import {startServerAndCreateNextHandler} from '@as-integrations/next';
import {ApolloServer} from '@apollo/server';

//utils
import {createContext} from '@/server/graphql/context';
import {resolvers} from '@/server/graphql/resolvers';
import {typeDefs} from '@/server/graphql/schema';

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server, {
  context: createContext,
});
