//libs
import {gql, useMutation} from '@apollo/client';
import {Food_category, TableBooking} from '@prisma/client';

//hooks
import {useToast} from '@chakra-ui/react';

const CREATE_TABLE_BOOKING = gql`
  mutation CreateTableBooking($createTableBookingInput: CreateTableBookingInput!) {
    createTableBooking(createTableBookingInput: $createTableBookingInput) {
      id
      date
      numberOfPeople
      createdAt
      user {
        id
        name
        email
        image
      }
      tableBookingStatus
    }
  }
`;

export const useReserveTable = () => {
  const toast = useToast();

  const [reserveTable, {loading}] = useMutation<
    {reserveTable: TableBooking},
    {
      createTableBookingInput: {
        numberOfPeople: number;
        date: string;
      };
    }
  >(CREATE_TABLE_BOOKING, {
    onCompleted(data, clientOptions) {
      toast({
        title: 'Successful',
        description: 'Table reservation successful.',
        status: 'success',
      });
    },

    onError(error) {
      toast({
        title: 'Failed',
        description: 'Table reservation failed',
        status: 'error',
      });
    },
  });

  return {reserveTable, loading};
};
