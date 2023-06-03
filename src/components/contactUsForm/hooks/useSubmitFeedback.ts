//libs
import {gql, useMutation} from '@apollo/client';
import {Feedback} from '@prisma/client';

//hooks
import {useToast} from '@chakra-ui/react';

const CREATE_FEEDBACK_MUTATION = gql`
  mutation CreateFeedback($feedbackInput: CreateFeedbackInput!) {
    createFeedback(feedbackInput: $feedbackInput) {
      id
      name
      email
      subject
      message
    }
  }
`;

export const useSubmitFeedback = () => {
  const toast = useToast();

  const [submitFeedback, {loading}] = useMutation<
    {createFeedback: Feedback},
    {
      feedbackInput: {
        email: string;
        message: string;
        name: string;
        subject: string;
      };
    }
  >(CREATE_FEEDBACK_MUTATION, {
    onCompleted(data, clientOptions) {
      toast({
        title: 'Feedback Sent.',
        description: "We've received your feedback.",
        status: 'success',
      });
    },

    onError(error) {
      toast({
        title: 'Failed to send Feedback.',
        description: "We've failed to send your feedback.",
        status: 'error',
      });
    },
  });

  return {submitFeedback, loading};
};
