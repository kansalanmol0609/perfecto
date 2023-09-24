//decorators
import {API_TYPE, withAuthentication} from '@/server/decorators/withAuthentication';

//types
import {GraphQLContext} from '../context';
import {Address} from '@prisma/client';

export const readAddresses = withAuthentication({
  apiType: API_TYPE.PRIVATE,
})(async (_parent: any, _args: any, ctx: GraphQLContext): Promise<Address[]> => {
  const session = ctx.session;

  const addresses = await ctx.prisma.address.findMany({
    where: {
      userId: session!.user!.id,
    },
  });

  return addresses;
});
