//libs
import {gql, useMutation} from '@apollo/client';

//types
import {NewsLetterSubscriber} from '@prisma/client';

//hooks
import {useToast} from '@chakra-ui/react';

const CREATE_NEWSLETTER_SUBSCRIBER = gql`
  mutation CreateNewsLetterSubscriber($email: String!) {
    createNewsLetterSubscriber(email: $email) {
      email
      createdAt
    }
  }
`;

export const useCreateNewsLetterSubscriber = () => {
  const toast = useToast();

  const [createSubscriber, {loading}] = useMutation<
    {createNewsLetterSubscriber: NewsLetterSubscriber},
    {
      email: string;
    }
  >(CREATE_NEWSLETTER_SUBSCRIBER, {
    onCompleted(data, clientOptions) {
      toast({
        title: 'Subscription Successful.',
        description: "We've successfully subscribed you to the newsletter.",
        status: 'success',
      });
    },

    onError(error) {
      toast({
        title: 'Subscription Failed.',
        description: "We've failed to subscribe you to the newsletter.",
        status: 'error',
      });
    },
  });

  return {createSubscriber, loading};
};
