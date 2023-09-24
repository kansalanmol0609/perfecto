//libs
import {gql, useMutation} from '@apollo/client';

//types
import {Address} from '@prisma/client';

//hooks
import {useToast} from '@chakra-ui/react';

const ADD_ADDRESS_MUTATION = gql`
  mutation AddAddress($addressInput: AddressInput!) {
    addAddress(addressInput: $addressInput) {
      id
      line1
      line2
      city
      state
      country
      pinCode
      createdAt
      updatedAt
      userId
    }
  }
`;

export const useAddAddress = () => {
  const toast = useToast();

  const [addAddress, {loading}] = useMutation<
    {
      addAddress: Address;
    },
    {
      addressInput: Pick<Address, 'line1' | 'line2' | 'city' | 'state' | 'country' | 'pinCode'>;
    }
  >(ADD_ADDRESS_MUTATION, {
    onCompleted(data, clientOptions) {
      toast({
        title: 'Successful',
        description: 'Address Added Successfully.',
        status: 'success',
      });
    },

    onError(error) {
      toast({
        title: 'Failed',
        description: 'Failed to save address',
        status: 'error',
      });
    },
  });

  return {addAddress, loading};
};
