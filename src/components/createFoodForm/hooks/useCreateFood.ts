//libs
import {gql, useMutation} from '@apollo/client';
import {Food, FoodCategory} from '@prisma/client';

//hooks
import {useToast} from '@chakra-ui/react';

const CREATE_FOOD_MUTATION = gql`
  mutation CreateFood($createFoodInput: CreateFoodInput!) {
    createFood(createFoodInput: $createFoodInput) {
      id
      name
      description
      pictures
      isVeg
      inStock
      price {
        amount
        currency
        precision
      }
      category
      createdAt
      updatedAt
      userId
    }
  }
`;

export const useCreateFood = () => {
  const toast = useToast();

  const [createFood, {loading}] = useMutation<
    {createFood: Food},
    {
      createFoodInput: {
        name: string;
        description: string;
        pictures: string;
        isVeg: boolean;
        inStock: boolean;
        price: {
          amount: number;
          currency: string;
          precision?: number;
        };
        category: FoodCategory;
      };
    }
  >(CREATE_FOOD_MUTATION, {
    onCompleted(data, clientOptions) {
      toast({
        title: 'Successful',
        description: "We've created food successfully.",
        status: 'success',
      });
    },

    onError(error) {
      toast({
        title: 'Failed',
        description: "We've failed to create food.",
        status: 'error',
      });
    },
  });

  return {createFood, loading};
};
