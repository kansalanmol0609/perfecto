//libs
import {memo} from 'react';
import dayjs from 'dayjs';

//components
import {Avatar, Box, HStack, Icon, VStack} from '@chakra-ui/react';
import ConfirmButton from './components/ConfirmButton';
import CancelButton from './components/CancelButton';

//icons
import {BsPeopleFill} from 'react-icons/bs';
import {BiSolidTimeFive} from 'react-icons/bi';

//types
import {TableBooking, TableBookingStatus, User} from '@prisma/client';

type Props = {
  tableBooking: Omit<TableBooking, 'userId'> & {user: User};
};

const TableBookingCard = ({tableBooking}: Props): JSX.Element => {
  const parsedDate = dayjs(+tableBooking.date);

  const showActions =
    tableBooking.tableBookingStatus === TableBookingStatus.WAITING_FOR_CONFIRMATION;

  return (
    <HStack
      key={tableBooking.id}
      gap={4}
      p={4}
      borderWidth={1}
      borderStyle="solid"
      borderColor="outline.500"
      width="full"
      _hover={{boxShadow: '0 0 0 1px  #AA8F66'}}
    >
      <VStack
        gap={2}
        width="16%"
        justifyContent="center"
        borderRightWidth={1}
        borderStyle="solid"
        borderColor="outline.500"
      >
        <Box fontWeight="semibold" fontSize={{sm: 'xs', md: 'lg'}}>
          {parsedDate.format('ddd')}
        </Box>
        <Box fontWeight="bold" fontSize={{sm: 'md', md: '2xl'}}>
          {parsedDate.format('DD')}
        </Box>
      </VStack>

      <HStack gap={2} flex={1} justifyContent="flex-start">
        <Avatar
          src={tableBooking.user?.image || ''}
          name={tableBooking.user?.name ?? 'User'}
          size={{sm: 'md', md: 'lg'}}
          borderRadius={0}
        />

        <VStack gap={1} flex={1} alignItems="flex-start">
          <HStack gap={1}>
            <Box fontSize={{sm: 'sm', md: 'md'}} fontWeight="bold">
              {tableBooking.user?.name}
            </Box>
          </HStack>

          <HStack gap={4}>
            <HStack>
              <Icon as={BiSolidTimeFive} boxSize="4" />
              <Box fontSize={{sm: 'sm', md: 'md'}}>{parsedDate.format('hh:mm A')}</Box>
            </HStack>

            <HStack>
              <Icon as={BsPeopleFill} boxSize="4" />
              <Box fontSize={{sm: 'sm', md: 'md'}}>{tableBooking.numberOfPeople}</Box>
            </HStack>
          </HStack>
        </VStack>
      </HStack>

      {showActions ? (
        <Box display="flex" flexDirection={{md: 'row', sm: 'column'}} gap={2}>
          <ConfirmButton tableBooking={tableBooking} />
          <CancelButton tableBooking={tableBooking} />
        </Box>
      ) : null}
    </HStack>
  );
};

export default memo(TableBookingCard);
