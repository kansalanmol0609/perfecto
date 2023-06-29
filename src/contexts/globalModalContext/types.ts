//constants
import {MODAL_TYPES} from './constants';

//types
import type {Props as MakeReservationModalProps} from './modals/makeReservationModal';
import type {Props as ConfirmationModalProps} from './modals/confirmationModal';

export type State =
  | undefined
  | {
      type: MODAL_TYPES.MAKE_RESERVATION_MODAL;
      props: MakeReservationModalProps;
    }
  | {
      type: MODAL_TYPES.CONFIRMATION_MODAL;
      props: ConfirmationModalProps;
    };

export type Action =
  | {
      type: MODAL_TYPES.MAKE_RESERVATION_MODAL;
      payload: {props: MakeReservationModalProps};
    }
  | {
      type: MODAL_TYPES.CONFIRMATION_MODAL;
      payload: {props: ConfirmationModalProps};
    };

export type GlobalModalContextType = {
  openModal: (action: Action) => void;
  hideModal: () => void;
  state: State;
};
