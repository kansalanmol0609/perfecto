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
import {RxCross1} from 'react-icons/rx';

//types
import {TableBooking, User} from '@prisma/client';

const CANCEL_TABLE_BOOKING_MUTATION = gql`
  mutation CancelTableBooking($cancelTableBookingId: ID!) {
    cancelTableBooking(id: $cancelTableBookingId) {
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

const CancelButton = ({tableBooking}: Props) => {
  const toast = useToast();

  const [cancelTableBooking, {loading}] = useMutation<
    {cancelTableBooking: Props['tableBooking']},
    {
      cancelTableBookingId: string;
    }
  >(CANCEL_TABLE_BOOKING_MUTATION, {
    onCompleted(data, clientOptions) {
      toast({
        title: 'Successful',
        description: 'Booking Cancellation Success.',
        status: 'success',
      });
    },

    onError(error) {
      toast({
        title: 'Failed',
        description: 'Booking Cancellation Failed.',
        status: 'error',
      });
    },
  });

  const handleCancel = useCallback(
    () =>
      cancelTableBooking({
        variables: {
          cancelTableBookingId: tableBooking.id,
        },
      }),
    [cancelTableBooking, tableBooking.id],
  );

  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <>
      <Button
        leftIcon={<RxCross1 />}
        colorScheme="brand"
        variant="outline"
        size={{sm: 'xs', md: 'sm'}}
        onClick={onOpen}
      >
        Cancel
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cancel Booking</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to cancel this booking?</ModalBody>

          <ModalFooter>
            <Button colorScheme="brand" variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="brand" isLoading={loading} onClick={handleCancel}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default memo(CancelButton);
