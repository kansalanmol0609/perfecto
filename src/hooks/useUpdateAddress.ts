//libs
import {gql, useMutation} from '@apollo/client';

//types
import {Address} from '@prisma/client';

//hooks
import {useToast} from '@chakra-ui/react';

const UPDATE_ADDRESS_MUTATION = gql`
  mutation UpdateAddress($addressId: String!, $addressInput: AddressInput!) {
    updateAddress(addressId: $addressId, addressInput: $addressInput) {
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

export const useUpdateAddress = () => {
  const toast = useToast();

  const [updateAddress, {loading}] = useMutation<
    {
      updateAddress: Address;
    },
    {
      addressInput: Pick<Address, 'line1' | 'line2' | 'city' | 'state' | 'country' | 'pinCode'>;
      addressId: string;
    }
  >(UPDATE_ADDRESS_MUTATION, {
    onCompleted(data, clientOptions) {
      toast({
        title: 'Successful',
        description: 'Address Updated Successfully.',
        status: 'success',
      });
    },

    onError(error) {
      toast({
        title: 'Failed',
        description: 'Failed to update address',
        status: 'error',
      });
    },
  });

  return {updateAddress, loading};
};
