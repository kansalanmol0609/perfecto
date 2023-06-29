//libs
import {gql, useMutation} from '@apollo/client';

//types
import {Food} from '@prisma/client';

//hooks
import {useToast} from '@chakra-ui/react';

const DELETE_FOOD_ITEM_MUTATION = gql`
  mutation DeleteFoodItem($foodItemId: String!) {
    deleteFoodItem(foodItemId: $foodItemId) {
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
    }
  }
`;

export const useDeleteFoodItem = () => {
  const toast = useToast();

  const [deleteFoodItem, {loading}] = useMutation<
    {deleteFoodItem: Food},
    {
      foodItemId: string;
    }
  >(DELETE_FOOD_ITEM_MUTATION, {
    onCompleted(data, clientOptions) {
      toast({
        title: 'Successful.',
        description: "We've successfully deleted the food item.",
        status: 'success',
      });
    },

    onError(error) {
      toast({
        title: 'Error.',
        description: "We've failed to delete the food item.",
        status: 'error',
      });
    },

    update(cache, {data}) {
      const foodItem = data?.deleteFoodItem;

      if (foodItem) {
        const foodItemId = cache.identify(foodItem);

        cache.evict({id: foodItemId, broadcast: true});
        cache.gc();
      }
    },
  });

  return {deleteFoodItem, loading};
};
