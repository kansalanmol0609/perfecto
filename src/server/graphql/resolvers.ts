//queries
import {readFeedbacks} from './queries/readFeedbacks';
import {readNewsLetterSubscribers} from './queries/readNewsLetterSubscribers';
import {readFoodItems} from './queries/readFoodItems';
import {readOrders} from './queries/readOrders';
import {fetchFoodItem} from './queries/fetchFoodItem';
import {fetchTableBookings} from './queries/fetchTableBookings';
import {readCartItems} from './queries/readCartItems';
import {fetchUserDetails} from './queries/fetchUserDetails';
import {readAddresses} from './queries/readAddresses';
import {fetchOrderDetails} from './queries/fetchOrderDetails';

//mutations
import {createNewsLetterSubscriber} from './mutations/createNewsLetterSubscriber';
import {deleteNewsLetterSubscriber} from './mutations/deleteNewsLetterSubscriber';
import {createFeedback} from './mutations/createFeedback';
import {createFood} from './mutations/createFood';
import {deleteFoodItem} from './mutations/deleteFoodItem';
import {updateFoodItem} from './mutations/updateFoodItem';
import {sendEmailToNewsLetterSubscribers} from './mutations/sendEmailToNewsLetterSubscribers';
import {createTableBooking} from './mutations/createTableBooking';
import {cancelTableBooking} from './mutations/cancelTableBooking';
import {confirmTableBooking} from './mutations/confirmTableBooking';
import {addItemInCart} from './mutations/addItemInCart';
import {removeItemFromCart} from './mutations/removeItemFromCart';
import {addAddress} from './mutations/addAddress';
import {removeAddress} from './mutations/removeAddress';
import {updateAddress} from './mutations/updateAddress';
import {placeOrder} from './mutations/placeOrder';

export const resolvers = {
  Query: {
    readFeedbacks,
    readNewsLetterSubscribers,
    readFoodItems,
    readOrders,
    fetchFoodItem,
    fetchTableBookings,
    readCartItems,
    fetchUserDetails,
    readAddresses,
    fetchOrderDetails,
  },

  Mutation: {
    createFeedback,
    createNewsLetterSubscriber,
    deleteNewsLetterSubscriber,
    sendEmailToNewsLetterSubscribers,
    createFood,
    deleteFoodItem,
    updateFoodItem,
    createTableBooking,
    cancelTableBooking,
    confirmTableBooking,
    addItemInCart,
    removeItemFromCart,
    addAddress,
    removeAddress,
    updateAddress,
    placeOrder,
  },
};
