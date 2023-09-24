//libs
import React, {
  useState,
  createContext,
  useContext,
  ReactElement,
  useCallback,
  useMemo,
} from 'react';

//components
import {MakeReservationModal} from './modals/makeReservationModal';
import {ConfirmationModal} from './modals/confirmationModal';
import {AddAddressModal} from './modals/addAddressModal';
import {EditAddressModal} from './modals/editAddressModal';

//types
import {Action, GlobalModalContextType, State} from './types';
import {MODAL_TYPES} from './constants';

const INITIAL_STATE: GlobalModalContextType = {
  openModal: () => {},
  hideModal: () => {},
  state: undefined,
};

const GlobalModalContext = createContext<GlobalModalContextType>(INITIAL_STATE);

export const useGlobalModalContext = () => useContext<GlobalModalContextType>(GlobalModalContext);

export const GlobalModalContextProvider = ({children}: {children: ReactElement}): JSX.Element => {
  const [state, setState] = useState<State>(undefined);

  const openModal = useCallback((action: Action) => {
    switch (action.type) {
      case MODAL_TYPES.MAKE_RESERVATION_MODAL: {
        setState({
          type: action.type,
          props: action.payload.props,
        });

        break;
      }

      case MODAL_TYPES.CONFIRMATION_MODAL: {
        setState({
          type: action.type,
          props: action.payload.props,
        });

        break;
      }

      case MODAL_TYPES.ADD_ADDRESS_MODAL: {
        setState({
          type: action.type,
          props: action.payload.props,
        });

        break;
      }

      case MODAL_TYPES.EDIT_ADDRESS_MODAL: {
        setState({
          type: action.type,
          props: action.payload.props,
        });

        break;
      }

      default:
        setState(undefined);
    }
  }, []);

  const hideModal = useCallback(() => {
    setState(undefined);
  }, []);

  const renderModalComponent = useCallback(() => {
    switch (state?.type) {
      case MODAL_TYPES.MAKE_RESERVATION_MODAL:
        return <MakeReservationModal {...state.props} />;

      case MODAL_TYPES.CONFIRMATION_MODAL:
        return <ConfirmationModal {...state.props} />;

      case MODAL_TYPES.ADD_ADDRESS_MODAL:
        return <AddAddressModal {...state.props} />;

      case MODAL_TYPES.EDIT_ADDRESS_MODAL:
        return <EditAddressModal {...state.props} />;

      default:
        return null;
    }
  }, [state?.props, state?.type]);

  const contextValue = useMemo(
    () => ({
      state,
      openModal,
      hideModal,
    }),
    [openModal, hideModal, state],
  );

  return (
    <GlobalModalContext.Provider value={contextValue}>
      {renderModalComponent()}
      {children}
    </GlobalModalContext.Provider>
  );
};
