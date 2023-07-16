import {CartItem} from '@prisma/client';
import {Cart} from '@/types/Cart';

export const getCartItemsCount = (cart: Cart | undefined): number => {
  return (cart?.items as unknown as Array<CartItem>)?.reduce(
    (res, cartItem) => res + cartItem.count,
    0,
  );
};
