//libs
import {memo, useCallback} from 'react';
import {gql, useMutation} from '@apollo/client';

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
  useDisclosure,
} from '@chakra-ui/react';

//hooks
import {useToast} from '@chakra-ui/react';

//icons
import {BsCheckLg} from 'react-icons/bs';

//types
import {TableBooking, User} from '@prisma/client';

const CONFIRM_TABLE_BOOKING_MUTATION = gql`
  mutation ConfirmTableBooking($confirmTableBookingId: ID!) {
    confirmTableBooking(id: $confirmTableBookingId) {
      id
      date
      numberOfPeople
      createdAt
      updatedAt
      user {
        id
        name
        email
        emailVerified
        image
        createdAt
        updatedAt
        role
      }
      tableBookingStatus
    }
  }
`;

type Props = {
  tableBooking: Omit<TableBooking, 'userId'> & {user: User};
};

const ConfirmButton = ({tableBooking}: Props) => {
  const toast = useToast();

  const [confirmTableBooking, {loading}] = useMutation<
    {confirmTableBooking: Props['tableBooking']},
    {
      confirmTableBookingId: string;
    }
  >(CONFIRM_TABLE_BOOKING_MUTATION, {
    onCompleted(data, clientOptions) {
      toast({
        title: 'Successful',
        description: 'Booking Confirmed.',
        status: 'success',
      });
    },

    onError(error) {
      toast({
        title: 'Failed',
        description: 'Booking Failed.',
        status: 'error',
      });
    },
  });

  const handleConfirmation = useCallback(
    () =>
      confirmTableBooking({
        variables: {
          confirmTableBookingId: tableBooking.id,
        },
      }),
    [confirmTableBooking, tableBooking.id],
  );

  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <>
      <Button
        leftIcon={<BsCheckLg />}
        colorScheme="brand"
        variant="outline"
        size="sm"
        onClick={onOpen}
      >
        Confirm
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to confirm this booking?</ModalBody>

          <ModalFooter>
            <Button colorScheme="brand" variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="brand" isLoading={loading} onClick={handleConfirmation}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default memo(ConfirmButton);
