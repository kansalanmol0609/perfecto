//libs
import {memo} from 'react';

//components
import {Box, Button, FormControl, FormLabel, Input, Select} from '@chakra-ui/react';

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
        <Box display="grid" gridTemplateColumns={{md: 'repeat(2, 1fr)', sm: '1fr'}} gap={4} py={4}>
          <FormControl>
            <FormLabel>Your Name</FormLabel>
            <Input placeholder="Your Name" type="text" />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Email" type="email" />
          </FormControl>

          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input placeholder="Phone" type="number" />
          </FormControl>

          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input placeholder="Date" type="date" />
          </FormControl>

          <FormControl>
            <FormLabel>Time</FormLabel>
            <Input placeholder="Time" type="time" />
          </FormControl>

          <FormControl>
            <FormLabel>Number of Persons</FormLabel>
            <Select placeholder="Number of Persons">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4+</option>
            </Select>
          </FormControl>
        </Box>

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
