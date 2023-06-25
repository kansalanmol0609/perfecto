//libs
import {NextApiRequest, NextApiResponse} from 'next';
import {getServerSession} from 'next-auth';

//prisma
import {prisma} from '../prisma';

//constants
import {authOptions} from '@/pages/api/auth/[...nextauth]';

//types
import {PrismaClient} from '@prisma/client';
import {Session} from 'next-auth';

export type GraphQLContext = {
  prisma: PrismaClient;
  session: Session | null;
};

export async function createContext(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<GraphQLContext> {
  return {
    prisma,
    session: await getServerSession(req, res, authOptions),
  };
}
