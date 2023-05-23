//constants
import {MODAL_TYPES} from './constants';

//types
import type {Props as MakeReservationModalProps} from './modals/makeReservationModal';

export type State =
  | undefined
  | {
      type: MODAL_TYPES;
      props: MakeReservationModalProps;
    };

export type Action = {
  type: typeof MODAL_TYPES.MAKE_RESERVATION_MODAL;
  payload: {props: MakeReservationModalProps};
};

export type GlobalModalContextType = {
  openModal: (action: Action) => void;
  hideModal: () => void;
  state: State;
};
