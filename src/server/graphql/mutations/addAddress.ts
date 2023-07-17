//decorators
import {API_TYPE, withAuthentication} from '@/server/decorators/withAuthentication';

//types
import {GraphQLContext} from '../context';

type AddressInput = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

export const addAddress = withAuthentication({
  apiType: API_TYPE.PRIVATE,
})(async (_parent: any, _args: {addressInput: AddressInput}, ctx: GraphQLContext) => {
  const session = ctx.session;
  const {addressInput} = _args;

  const address = await ctx.prisma.address.create({
    data: {
      ...addressInput,
      user: {
        connect: {
          id: session!.user!.id,
        },
      },
    },
  });

  return address;
});
