//libs
import {useCallback, memo} from 'react';
import * as Yup from 'yup';

//components
import {Box, Button} from '@chakra-ui/react';
import {Formik, FormikConfig} from 'formik';
import {InputControl, TextareaControl} from 'formik-chakra-ui';

//hooks
import {useSendEmailToSubscribers} from './hooks/useSendEmailToSubscribers';

//types
import {NewsLetterSubscriber} from '@prisma/client';

enum FORM_KEYS {
  SUBJECT = 'subject',
  BODY = 'body',
}

type FormValues = {
  [FORM_KEYS.SUBJECT]: string;
  [FORM_KEYS.BODY]: string;
};

const INITIAL_VALUES: FormValues = {
  [FORM_KEYS.SUBJECT]: '',
  [FORM_KEYS.BODY]: '',
};

const VALIDATION_SCHEMA = Yup.object({
  [FORM_KEYS.SUBJECT]: Yup.string().required('Please enter Subject!'),
  [FORM_KEYS.BODY]: Yup.string().required('Please enter Message!'),
});

const SendEmailToSubscribersForm = ({
  emailAddressesToExclude,
  subscribers,
}: {
  subscribers: NewsLetterSubscriber[];
  emailAddressesToExclude: string[];
}) => {
  const {sendEmailToSubscribers, loading} = useSendEmailToSubscribers();

  const handleSubmit: FormikConfig<FormValues>['onSubmit'] = useCallback(
    (values: FormValues, {resetForm}) =>
      sendEmailToSubscribers({
        variables: {
          sendEmailToNewsLetterSubscribersInput: {
            ...values,
            receiverEmailAddresses: subscribers
              .map((sub) => sub.email)
              .filter((email) => !emailAddressesToExclude.includes(email)),
          },
        },
      }).then(() => resetForm()),
    [emailAddressesToExclude, sendEmailToSubscribers, subscribers],
  );

  return (
    <Formik<FormValues>
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={VALIDATION_SCHEMA}
      validateOnBlur={false}
    >
      {({submitForm}): JSX.Element => (
        <>
          <Box fontWeight="bold" fontSize="xl">
            Send Email to Subscribers
          </Box>

          <InputControl name={FORM_KEYS.SUBJECT} label="Subject" my={4} />

          <TextareaControl
            textareaProps={{rows: 10}}
            name={FORM_KEYS.BODY}
            label="Message"
            my={4}
          />

          <Button
            size="lg"
            colorScheme="brand"
            aria-label="Send"
            fontSize="sm"
            type="submit"
            onClick={submitForm}
            isLoading={loading}
          >
            Send
          </Button>
        </>
      )}
    </Formik>
  );
};

export default memo(SendEmailToSubscribersForm);
