//libs
import {gql, useMutation} from '@apollo/client';
import {Food, FoodCategory} from '@prisma/client';

//hooks
import {useToast} from '@chakra-ui/react';

const UPDATE_FOOD_ITEM_MUTATION = gql`
  mutation UpdateFoodItem($updateFoodItemInput: UpdateFoodItemInput!) {
    updateFoodItem(updateFoodItemInput: $updateFoodItemInput) {
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
    }
  }
`;

export const useUpdateFood = () => {
  const toast = useToast();

  const [updateFood, {loading}] = useMutation<
    {updateFoodItem: Food},
    {
      updateFoodItemInput: {
        id: string;
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
  >(UPDATE_FOOD_ITEM_MUTATION, {
    onCompleted(data, clientOptions) {
      toast({
        title: 'Successful',
        description: "We've successfully updated the food item.",
        status: 'success',
      });
    },

    onError(error) {
      toast({
        title: 'Failed',
        description: "We've failed to update the food item.",
        status: 'error',
      });
    },
  });

  return {updateFood, loading};
};
