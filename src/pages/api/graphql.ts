import {NextApiRequest, NextApiResponse} from 'next';
import {startServerAndCreateNextHandler} from '@as-integrations/next';
import {ApolloServer} from '@apollo/server';

import {prisma} from '@/server/prisma';
import {GraphQLContext} from '@/server/graphql/context';
import {resolvers} from '@/server/graphql/resolvers';
import {typeDefs} from '@/server/graphql/schema';

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server, {
  context: async (_req: NextApiRequest, _res: NextApiResponse): Promise<GraphQLContext> => ({
    prisma,
  }),
});
