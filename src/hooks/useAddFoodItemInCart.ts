//libs
import {gql, useMutation} from '@apollo/client';

//types
import {Cart} from '@/types/Cart';

const ADD_ITEM_IN_CART_MUTATION = gql`
  mutation AddItemInCart($foodId: String!) {
    addItemInCart(foodId: $foodId) {
      id
      items {
        food {
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
        count
      }
      userId
    }
  }
`;

export const useAddFoodItemInCart = () => {
  const [addItemInCart, {loading}] = useMutation<
    {addItemInCart: Cart},
    {
      foodId: string;
    }
  >(ADD_ITEM_IN_CART_MUTATION);

  return {addItemInCart, loading};
};
