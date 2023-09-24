//libs
import {gql, useMutation} from '@apollo/client';

//types
import {Address} from '@prisma/client';

//hooks
import {useToast} from '@chakra-ui/react';

const REMOVE_ADDRESS_MUTATION = gql`
  mutation RemoveAddress($addressId: String!) {
    removeAddress(addressId: $addressId) {
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

export const useRemoveAddress = () => {
  const toast = useToast();

  const [removeAddress, {loading}] = useMutation<
    {removeAddress: Address},
    {
      addressId: string;
    }
  >(REMOVE_ADDRESS_MUTATION, {
    onCompleted(data, clientOptions) {
      toast({
        title: 'Successful.',
        description: 'Address Removed Successfully.',
        status: 'success',
      });
    },

    onError(error) {
      toast({
        title: 'Error.',
        description: 'Failed to Remove Address.',
        status: 'error',
      });
    },

    update(cache, {data}) {
      const address = data?.removeAddress;

      if (address) {
        const addressId = cache.identify(address);

        cache.evict({id: addressId, broadcast: true});
        cache.gc();
      }
    },
  });

  return {removeAddress, loading};
};
