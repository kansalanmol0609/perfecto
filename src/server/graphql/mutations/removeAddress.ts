//decorators
import {API_TYPE, withAuthentication} from '@/server/decorators/withAuthentication';

//types
import {GraphQLContext} from '../context';

export const removeAddress = withAuthentication({
  apiType: API_TYPE.PRIVATE,
})(async (_parent: any, _args: {addressId: string}, ctx: GraphQLContext) => {
  const {addressId} = _args;

  const address = await ctx.prisma.address.delete({
    where: {
      id: addressId,
    },
  });

  return address;
});
