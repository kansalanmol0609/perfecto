//libs
import {memo} from 'react';
import _isEmpty from 'lodash/isEmpty';

//hooks
import {useFetchUserDetails} from './hooks/useFetchUserDetails';

//icons
import {CalendarIcon} from '@chakra-ui/icons';

//components
import {VStack, Icon, Heading, Box} from '@chakra-ui/react';
import {TableBookingCard} from '@/components/tableBookingCard';

const UserTableBookings = (): JSX.Element => {
  const {data, refetch} = useFetchUserDetails();
  const tableBookings = data?.fetchUserDetails?.tableBookings;

  if (_isEmpty(tableBookings) || !tableBookings) {
    return (
      <VStack height="50vh" display="flex" justifyContent="center" gap={4}>
        <Icon as={CalendarIcon} boxSize="24" color="brand.500" />
        <Heading size="md">No Reservation found!</Heading>H
      </VStack>
    );
  }

  return (
    <VStack gap={4}>
      {tableBookings.map((tableBooking) => (
        <TableBookingCard key={tableBooking.id} tableBooking={tableBooking} showActions={false} />
      ))}
    </VStack>
  );
};

export default memo(UserTableBookings);
