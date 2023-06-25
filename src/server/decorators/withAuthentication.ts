//types
import {Role} from '@prisma/client';
import {GraphQLContext} from '../graphql/context';

export enum API_TYPE {
  ADMIN = 'ADMIN',
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}

export const withAuthentication =
  ({apiType}: {apiType: API_TYPE}) =>
  <TParent, TArgs, TReturn>(
    requestHandler: (parent: TParent, args: TArgs, ctx: GraphQLContext) => TReturn,
  ) =>
  (parent: TParent, args: TArgs, ctx: GraphQLContext): TReturn | void => {
    const session = ctx.session;

    if (apiType === API_TYPE.PUBLIC) {
      return requestHandler(parent, args, ctx);
    }

    if (!session?.user || (apiType == API_TYPE.ADMIN && session.user.role !== Role.ADMIN)) {
      throw new Error('Unauthorized!');
    }

    return requestHandler(parent, args, ctx);
  };
