//libs
import {gql, useMutation} from '@apollo/client';

//hooks
import {useToast} from '@chakra-ui/react';

const SEND_EMAIL_TO_SUBSCRIBERS_MUTATION = gql`
  mutation SendEmailToNewsLetterSubscribers(
    $sendEmailToNewsLetterSubscribersInput: SendEmailToNewsLetterSubscribersInput!
  ) {
    sendEmailToNewsLetterSubscribers(
      sendEmailToNewsLetterSubscribersInput: $sendEmailToNewsLetterSubscribersInput
    )
  }
`;

export const useSendEmailToSubscribers = () => {
  const toast = useToast();

  const [sendEmailToSubscribers, {loading}] = useMutation<
    {sendEmailToNewsLetterSubscribers: Boolean},
    {
      sendEmailToNewsLetterSubscribersInput: {
        body: string;
        subject: string;
        receiverEmailAddresses: string[];
      };
    }
  >(SEND_EMAIL_TO_SUBSCRIBERS_MUTATION, {
    onCompleted(data, clientOptions) {
      toast({
        title: 'Success.',
        description: "We've successfully sent email to the subscribers.",
        status: 'success',
      });
    },

    onError(error) {
      toast({
        title: 'Failed.',
        description: "We've failed to send email to the subscribers.",
        status: 'error',
      });
    },
  });

  return {sendEmailToSubscribers, loading};
};
