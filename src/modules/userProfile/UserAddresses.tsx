//libs
import {memo, useCallback} from 'react';
import _isEmpty from 'lodash/isEmpty';

//hooks
import {useFetchUserDetails} from './hooks/useFetchUserDetails';
import {MODAL_TYPES, useGlobalModalContext} from '@/contexts/globalModalContext';
import {useRemoveAddress} from '@/hooks/useRemoveAddress';

//icons
import {FiMapPin, FiHome} from 'react-icons/fi';

//components
import {Box, SimpleGrid, Button, HStack, Icon, VStack} from '@chakra-ui/react';
import {Address} from '@prisma/client';

const UserAddresses = (): JSX.Element => {
  const {data, refetch} = useFetchUserDetails();
  const addresses = data?.fetchUserDetails?.addresses;

  const {openModal} = useGlobalModalContext();
  const {removeAddress, loading: isDeleting} = useRemoveAddress();

  const handleAddAddress = useCallback(
    () =>
      openModal({
        type: MODAL_TYPES.ADD_ADDRESS_MODAL,
        payload: {
          props: {
            onSuccess: refetch,
          },
        },
      }),
    [openModal, refetch],
  );

  const handleEditAddress = useCallback(
    (address: Address) =>
      openModal({
        type: MODAL_TYPES.EDIT_ADDRESS_MODAL,
        payload: {
          props: {
            onSuccess: refetch,
            address,
          },
        },
      }),
    [openModal, refetch],
  );

  const handleDeleteAddress = useCallback(
    (addressId: string) =>
      openModal({
        type: MODAL_TYPES.CONFIRMATION_MODAL,
        payload: {
          props: {
            primaryButtonLabel: 'Delete',
            handleConfirmation: () =>
              removeAddress({
                variables: {
                  addressId,
                },
              }),
            confirmationLabel:
              'Are you sure you want to delete this address? This is an irreversible action.',
            isConfirmationInProgress: isDeleting,
          },
        },
      }),
    [isDeleting, openModal, removeAddress],
  );

  return (
    <SimpleGrid columns={2} spacing={10}>
      {addresses?.map((address) => (
        <HStack key={address.id} borderWidth={1} p={2} borderStyle="solid" borderColor="gray.300">
          <Icon boxSize="4" mt={1} as={FiMapPin} alignSelf="flex-start" />

          <VStack>
            <Box ml={1}>
              {address.line1}, {address.line2}, {address.city}, {address.state}, {address.pinCode}
            </Box>

            <HStack alignSelf="flex-start" justifyContent="flex-start">
              <Button
                colorScheme="brand"
                variant="link"
                onClick={handleEditAddress.bind(null, address)}
              >
                Edit
              </Button>
              <Button
                colorScheme="brand"
                variant="link"
                onClick={handleDeleteAddress.bind(null, address.id)}
              >
                Delete
              </Button>
            </HStack>
          </VStack>
        </HStack>
      ))}

      <Button
        colorScheme="brand"
        onClick={handleAddAddress}
        height="full"
        fontSize="lg"
        leftIcon={<FiHome />}
        minHeight="20"
      >
        Add a new address
      </Button>
    </SimpleGrid>
  );
};

export default memo(UserAddresses);
