//libs
import {memo} from 'react';

//hooks
import {useGlobalModalContext} from '@/contexts/globalModalContext';

//types
import {Props} from './types';

//fonts
import {Great_Vibes} from 'next/font/google';

//components
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
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
          <MakeReservationForm />
        </ModalBody>

        <ModalFooter display="flex" justifyContent="flex-end">
          <Button colorScheme="brand" variant="outline" mr={3} onClick={hideModal}>
            Cancel
          </Button>
          <Button colorScheme="brand">Book</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(MakeReservationModal);
