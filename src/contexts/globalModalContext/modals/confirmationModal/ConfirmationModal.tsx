//libs
import {memo, useCallback} from 'react';

//hooks
import {useGlobalModalContext} from '@/contexts/globalModalContext';

//types
import {Props} from './types';

//components
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

const ConfirmationModal = ({
  primaryButtonLabel,
  handleConfirmation,
  confirmationLabel,
  isConfirmationInProgress,
}: Props): JSX.Element => {
  const {hideModal} = useGlobalModalContext();

  const onConfirmation = useCallback(() => {
    handleConfirmation();

    hideModal();
  }, [handleConfirmation, hideModal]);

  return (
    <Modal isOpen onClose={hideModal} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm</ModalHeader>
        <ModalCloseButton />

        <ModalBody>{confirmationLabel}</ModalBody>

        <ModalFooter display="flex" justifyContent="flex-end">
          <Button colorScheme="brand" variant="outline" mr={3} onClick={hideModal}>
            Cancel
          </Button>

          <Button colorScheme="brand" onClick={onConfirmation} isLoading={isConfirmationInProgress}>
            {primaryButtonLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(ConfirmationModal);
