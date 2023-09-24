//constants
import {MODAL_TYPES} from './constants';

//types
import type {Props as MakeReservationModalProps} from './modals/makeReservationModal';
import type {Props as ConfirmationModalProps} from './modals/confirmationModal';
import type {Props as AddAddressModalProps} from './modals/addAddressModal';
import type {Props as EditAddressModalProps} from './modals/editAddressModal';

export type State =
  | undefined
  | {
      type: MODAL_TYPES.MAKE_RESERVATION_MODAL;
      props: MakeReservationModalProps;
    }
  | {
      type: MODAL_TYPES.CONFIRMATION_MODAL;
      props: ConfirmationModalProps;
    }
  | {
      type: MODAL_TYPES.ADD_ADDRESS_MODAL;
      props: AddAddressModalProps;
    }
  | {
      type: MODAL_TYPES.EDIT_ADDRESS_MODAL;
      props: EditAddressModalProps;
    };

export type Action =
  | {
      type: MODAL_TYPES.MAKE_RESERVATION_MODAL;
      payload: {props: MakeReservationModalProps};
    }
  | {
      type: MODAL_TYPES.CONFIRMATION_MODAL;
      payload: {props: ConfirmationModalProps};
    }
  | {
      type: MODAL_TYPES.ADD_ADDRESS_MODAL;
      payload: {props: AddAddressModalProps};
    }
  | {
      type: MODAL_TYPES.EDIT_ADDRESS_MODAL;
      payload: {props: EditAddressModalProps};
    };

export type GlobalModalContextType = {
  openModal: (action: Action) => void;
  hideModal: () => void;
  state: State;
};
