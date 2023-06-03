//libs
import {NextApiRequest, NextApiResponse} from 'next';

//prisma
import {prisma} from '../prisma';

//types
import {PrismaClient} from '@prisma/client';

export type GraphQLContext = {
  prisma: PrismaClient;
};

export function createContext(_req: NextApiRequest, _res: NextApiResponse): GraphQLContext {
  return {
    prisma,
  };
}
