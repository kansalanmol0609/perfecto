//decorators
import {API_TYPE, withAuthentication} from '@/server/decorators/withAuthentication';

//types
import {GraphQLContext} from '../context';
import {Food} from '@prisma/client';

type UpdateFoodItemInput = Pick<
  Food,
  'id' | 'name' | 'description' | 'isVeg' | 'pictures' | 'inStock' | 'category'
> & {
  price: {
    amount: string;
    currency: string;
    precision?: string;
  };
};

export const updateFoodItem = withAuthentication({
  apiType: API_TYPE.ADMIN,
})(async (_parent: any, args: {updateFoodItemInput: UpdateFoodItemInput}, ctx: GraphQLContext) => {
  const {updateFoodItemInput} = args;

  const food = await ctx.prisma.food.update({
    where: {
      id: updateFoodItemInput.id,
    },
    data: {
      name: updateFoodItemInput.name,
      description: updateFoodItemInput.description,
      pictures: updateFoodItemInput.pictures,
      isVeg: updateFoodItemInput.isVeg,
      inStock: updateFoodItemInput.inStock,
      price: updateFoodItemInput.price,
      category: updateFoodItemInput.category,
    },
  });

  return food;
});
