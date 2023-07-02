//libs
import {memo, useCallback} from 'react';
import {useSession} from 'next-auth/react';

//components
import {Box, Button, Tooltip} from '@chakra-ui/react';
import {Body} from './components/Body';

//fonts
import {Great_Vibes} from 'next/font/google';

//hooks
import {useReserveTable} from '@/hooks/useReserveTable';

const greatVibesFont = Great_Vibes({
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
});

const MakeReservationForm = (): JSX.Element => {
  const session = useSession();

  const isDisabled = session.status !== 'authenticated';

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
      }),
    [reserveTable],
  );

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

      <Body onSubmit={handleReserveTable}>
        {({onSubmit}: {onSubmit: () => void}) => (
          <Tooltip label={isDisabled ? 'Please log-in to continue.' : ''}>
            <Button
              my={8}
              size="lg"
              colorScheme="brand"
              aria-label="Make a Reservation"
              fontSize="sm"
              type="submit"
              isDisabled={isDisabled}
              onClick={onSubmit}
              isLoading={loading}
            >
              Make a Reservation
            </Button>
          </Tooltip>
        )}
      </Body>
    </Box>
  );
};

const MemoizedMakeReservationForm = memo(MakeReservationForm);
export {MemoizedMakeReservationForm as MakeReservationForm};
