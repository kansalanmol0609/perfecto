//libs
import {useCallback, memo} from 'react';
import * as Yup from 'yup';

//components
import {Box, Button} from '@chakra-ui/react';
import {Formik, FormikConfig} from 'formik';
import {InputControl, TextareaControl} from 'formik-chakra-ui';

//hooks
import {useSubmitFeedback} from './hooks/useSubmitFeedback';

enum FORM_KEYS {
  NAME = 'name',
  EMAIL = 'email',
  SUBJECT = 'subject',
  MESSAGE = 'message',
}

type FormValues = {
  [FORM_KEYS.NAME]: string;
  [FORM_KEYS.EMAIL]: string;
  [FORM_KEYS.SUBJECT]: string;
  [FORM_KEYS.MESSAGE]: string;
};

const INITIAL_VALUES: FormValues = {
  [FORM_KEYS.NAME]: '',
  [FORM_KEYS.EMAIL]: '',
  [FORM_KEYS.SUBJECT]: '',
  [FORM_KEYS.MESSAGE]: '',
};

const VALIDATION_SCHEMA = Yup.object({
  [FORM_KEYS.NAME]: Yup.string().required('Please enter Name!'),
  [FORM_KEYS.SUBJECT]: Yup.string().required('Please enter Subject!'),
  [FORM_KEYS.MESSAGE]: Yup.string().required('Please enter Message!'),
  [FORM_KEYS.EMAIL]: Yup.string()
    .email('Please enter a valid Email')
    .required('Please enter Email!'),
});

const ContactUsForm = () => {
  const {submitFeedback, loading} = useSubmitFeedback();

  const handleSubmit: FormikConfig<FormValues>['onSubmit'] = useCallback(
    (values: FormValues, {resetForm}) =>
      submitFeedback({
        variables: {
          feedbackInput: values,
        },
      }).then(() => resetForm()),
    [submitFeedback],
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
          <Box fontWeight="bold" fontSize="2xl">
            Contact Us
          </Box>
          <InputControl name={FORM_KEYS.NAME} label="Your Name" my={2} />
          <InputControl name={FORM_KEYS.EMAIL} label="Your Email" my={2} />
          <InputControl name={FORM_KEYS.SUBJECT} label="Subject" />
          <TextareaControl name={FORM_KEYS.MESSAGE} label="Message" my={4} />

          <Button
            size="lg"
            colorScheme="brand"
            aria-label="Send Message"
            fontSize="sm"
            type="submit"
            onClick={submitForm}
            isLoading={loading}
          >
            Send Message
          </Button>
        </>
      )}
    </Formik>
  );
};

export default memo(ContactUsForm);
