//decorators
import {API_TYPE, withAuthentication} from '@/server/decorators/withAuthentication';

//types
import {GraphQLContext} from '../context';

type UpdateUserInput = {
  name: string;
};

export const updateUser = withAuthentication({
  apiType: API_TYPE.PRIVATE,
})(async (_parent: any, _args: {updateUserInput: UpdateUserInput}, ctx: GraphQLContext) => {
  const session = ctx.session;
  const {
    updateUserInput: {name},
  } = _args;

  const user = await ctx.prisma.user.update({
    where: {
      id: session!.user!.id,
    },
    data: {
      name,
    },
  });

  return user;
});
