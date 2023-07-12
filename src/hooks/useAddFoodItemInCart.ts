//libs
import {gql, useMutation} from '@apollo/client';

//types
import {Cart, CartItem, Food} from '@prisma/client';

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
    {addItemInCart: Cart & {items: Array<Omit<CartItem, 'foodId'> & {food: Food}>}},
    {
      foodId: string;
    }
  >(ADD_ITEM_IN_CART_MUTATION);

  return {addItemInCart, loading};
};
