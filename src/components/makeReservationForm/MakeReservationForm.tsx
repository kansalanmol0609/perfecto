//libs
import {memo} from 'react';

//components
import {Box, Button} from '@chakra-ui/react';
import {Body} from './components/Body';

//fonts
import {Great_Vibes} from 'next/font/google';

const greatVibesFont = Great_Vibes({
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
});

const MakeReservationForm = (): JSX.Element => {
  return (
    <Box backgroundColor="white" width={{md: 'fit-content'}} textAlign="center" px={12}>
      <Box position="relative" top={-8}>
        <Box fontSize="6xl" color="brand.500" className={greatVibesFont.className}>
          Book a table
        </Box>

        <Box color="black" fontSize="4xl" fontWeight="extrabold" lineHeight="shorter" mt={-12}>
          Make Reservation
        </Box>
      </Box>

      <form>
        <Body />

        <Button
          my={8}
          size="lg"
          colorScheme="brand"
          aria-label="Make a Reservation"
          fontSize="sm"
          type="submit"
        >
          Make a Reservation
        </Button>
      </form>
    </Box>
  );
};

const MemoizedMakeReservationForm = memo(MakeReservationForm);
export {MemoizedMakeReservationForm as MakeReservationForm};
