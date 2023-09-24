//libs
import {memo, useCallback, useMemo} from 'react';

//hooks
import {useGlobalModalContext} from '@/contexts/globalModalContext';
import {useUpdateAddress} from '@/hooks/useUpdateAddress';

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

const EditAddressModal = ({onSuccess, address}: Props): JSX.Element => {
  const {hideModal} = useGlobalModalContext();

  const {updateAddress, loading} = useUpdateAddress();

  const handleReserveTable = useCallback(
    (addressInput: Pick<Address, 'line1' | 'line2' | 'city' | 'state' | 'country' | 'pinCode'>) =>
      updateAddress({
        variables: {
          addressInput,
          addressId: address.id,
        },
      }).then(() => {
        hideModal();
        onSuccess();
      }),
    [updateAddress, address.id, hideModal, onSuccess],
  );

  const initialValues = useMemo(
    () => ({
      line1: address.line1,
      line2: address.line2,
      city: address.city,
      state: address.state,
      country: address.country,
      pinCode: address.pinCode,
    }),
    [address],
  );

  return (
    <Modal isOpen onClose={hideModal} size="xl">
      <ModalOverlay />

      <ModalContent px={4}>
        <ModalHeader>Edit Address</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <AddAddressForm onSubmit={handleReserveTable} initialValues={initialValues}>
            {({onSubmit}: {onSubmit: () => void}) => (
              <HStack justifyContent="flex-end" my={2}>
                <Button colorScheme="brand" variant="outline" mr={3} onClick={hideModal}>
                  Cancel
                </Button>
                <Button colorScheme="brand" onClick={onSubmit} isLoading={loading}>
                  Save
                </Button>
              </HStack>
            )}
          </AddAddressForm>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default memo(EditAddressModal);
