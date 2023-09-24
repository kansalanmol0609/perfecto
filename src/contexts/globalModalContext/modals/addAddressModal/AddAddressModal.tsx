//libs
import {memo, useCallback} from 'react';

//hooks
import {useGlobalModalContext} from '@/contexts/globalModalContext';
import {useAddAddress} from '@/hooks/useAddAddress';

//types
import {Props} from './types';
import {Address} from '@prisma/client';

//components
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import {AddAddressForm} from '@/modules/userProfile/AddAddressForm';

const AddAddressModal = ({onSuccess}: Props): JSX.Element => {
  const {hideModal} = useGlobalModalContext();

  const {addAddress, loading} = useAddAddress();

  const handleReserveTable = useCallback(
    (addressInput: Pick<Address, 'line1' | 'line2' | 'city' | 'state' | 'country' | 'pinCode'>) =>
      addAddress({
        variables: {
          addressInput,
        },
      }).then(() => {
        hideModal();
        onSuccess();
      }),
    [hideModal, onSuccess, addAddress],
  );

  return (
    <Modal isOpen onClose={hideModal} size="xl">
      <ModalOverlay />
      <ModalContent px={4}>
        <ModalHeader>Add Address</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <AddAddressForm onSubmit={handleReserveTable}>
            {({onSubmit}: {onSubmit: () => void}) => (
              <HStack justifyContent="flex-end" my={2}>
                <Button colorScheme="brand" variant="outline" mr={3} onClick={hideModal}>
                  Cancel
                </Button>
                <Button colorScheme="brand" onClick={onSubmit} isLoading={loading}>
                  Add
                </Button>
              </HStack>
            )}
          </AddAddressForm>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default memo(AddAddressModal);
