//libs
import {gql, useMutation} from '@apollo/client';
import {User} from '@prisma/client';

//hooks
import {useToast} from '@chakra-ui/react';

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      name
      email
      image
      createdAt
      updatedAt
    }
  }
`;

export const useUpdateUser = () => {
  const toast = useToast();

  const [updateUser, {loading}] = useMutation<
    {updateUser: User},
    {
      updateUserInput: {
        name: string;
      };
    }
  >(UPDATE_USER_MUTATION, {
    onCompleted(data, clientOptions) {
      toast({
        title: 'Updated.',
        description: "We've updated your profile.",
        status: 'success',
      });
    },

    onError(error) {
      toast({
        title: 'Failed.',
        description: "We've failed to update your profile.",
        status: 'error',
      });
    },
  });

  return {updateUser, loading};
};
