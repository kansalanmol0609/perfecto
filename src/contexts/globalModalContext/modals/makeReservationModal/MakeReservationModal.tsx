//libs
import {memo, useCallback} from 'react';

//hooks
import {useGlobalModalContext} from '@/contexts/globalModalContext';
import {useReserveTable} from '@/hooks/useReserveTable';

//types
import {Props} from './types';

//fonts
import {Great_Vibes} from 'next/font/google';

//components
import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import {Body as MakeReservationForm} from '@/components/makeReservationForm/components/Body';

const greatVibesFont = Great_Vibes({
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
});

const MakeReservationModal = (props: Props): JSX.Element => {
  const {hideModal} = useGlobalModalContext();

  const {reserveTable, loading} = useReserveTable();

  const handleReserveTable = useCallback(
    ({date, numberOfPeople}: {date: string; numberOfPeople: number}) =>
      reserveTable({
        variables: {
          createTableBookingInput: {
            numberOfPeople,
            date,
          },
        },
      }).then(hideModal),
    [hideModal, reserveTable],
  );

  return (
    <Modal isOpen onClose={hideModal} size="xl">
      <ModalOverlay />
      <ModalContent px={4}>
        <ModalHeader>
          <Box position="relative" top={-12} textAlign="center">
            <Box fontSize="6xl" color="brand.500" className={greatVibesFont.className}>
              Book a table
            </Box>

            <Box color="black" fontSize="4xl" fontWeight="extrabold" lineHeight="shorter" mt={-12}>
              Make Reservation
            </Box>
          </Box>
        </ModalHeader>

        <ModalBody mt={-12}>
          <MakeReservationForm onSubmit={handleReserveTable}>
            {({onSubmit}: {onSubmit: () => void}) => (
              <HStack justifyContent="flex-end" my={2}>
                <Button colorScheme="brand" variant="outline" mr={3} onClick={hideModal}>
                  Cancel
                </Button>
                <Button colorScheme="brand" onClick={onSubmit} isLoading={loading}>
                  Book
                </Button>
              </HStack>
            )}
          </MakeReservationForm>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default memo(MakeReservationModal);
