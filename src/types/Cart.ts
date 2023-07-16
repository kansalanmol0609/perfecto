//types
import {Cart as BaseCartType, CartItem, Food} from '@prisma/client';

export type Cart = BaseCartType & {
  items: Array<Omit<CartItem, 'foodId'> & {food: Food} & {count: number}>;
};
