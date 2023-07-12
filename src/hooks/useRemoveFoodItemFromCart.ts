//libs
import {gql, useMutation} from '@apollo/client';

//types
import {Cart, CartItem, Food} from '@prisma/client';

const REMOVE_ITEM_FROM_CART_MUTATION = gql`
  mutation RemoveItemFromCart($foodId: String!) {
    removeItemFromCart(foodId: $foodId) {
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

export const useRemoveFoodItemFromCart = () => {
  const [removeItemFromCart, {loading}] = useMutation<
    {removeItemFromCart: Cart & {items: Array<Omit<CartItem, 'foodId'> & {food: Food}>}},
    {
      foodId: string;
    }
  >(REMOVE_ITEM_FROM_CART_MUTATION);

  return {removeItemFromCart, loading};
};
