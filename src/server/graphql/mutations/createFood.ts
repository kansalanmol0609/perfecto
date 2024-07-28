//decorators
import {API_TYPE, withAuthentication} from '@/server/decorators/withAuthentication';

//types
import {GraphQLContext} from '../context';
import {Food, Food_category} from '@prisma/client';

type CreateFoodInput = {
  name: string;
  description: string;
  pictures: string;
  isVeg: boolean;
  inStock: boolean;
  price: {
    amount: string;
    currency: string;
    precision?: string;
  };
  category: Food_category;
};

export const createFood = withAuthentication({
  apiType: API_TYPE.ADMIN,
})(
  async (
    _parent: any,
    args: {createFoodInput: CreateFoodInput},
    ctx: GraphQLContext,
  ): Promise<Food> => {
    const {createFoodInput} = args;
    const session = ctx.session;

    const food = await ctx.prisma.food.create({
      data: {
        name: createFoodInput.name,
        description: createFoodInput.description,
        pictures: createFoodInput.pictures,
        isVeg: createFoodInput.isVeg,
        inStock: createFoodInput.inStock,
        price: createFoodInput.price,
        category: createFoodInput.category,
        userId: session!.user!.id,
        isDeleted: false,
      },
    });

    return food;
  },
);
