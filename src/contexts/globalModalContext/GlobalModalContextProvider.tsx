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
    setState({
      type: action.type,
      props: action.payload.props,
    });
  }, []);

  const hideModal = useCallback(() => {
    setState(undefined);
  }, []);

  const renderModalComponent = useCallback(() => {
    switch (state?.type) {
      case MODAL_TYPES.MAKE_RESERVATION_MODAL:
        return <MakeReservationModal {...state.props} />;

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
