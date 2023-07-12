//libs
import {memo, useCallback} from 'react';
import * as Yup from 'yup';

//hooks
import {useCreateNewsLetterSubscriber} from '@/hooks/useCreateNewsLetterSubscriber';

//components
import {Box, Button} from '@chakra-ui/react';
import {Formik, FormikConfig} from 'formik';
import {InputControl} from 'formik-chakra-ui';

//icons
import {IoMdMail} from 'react-icons/io';

enum FORM_KEYS {
  EMAIL = 'email',
}

type FormValues = {
  [FORM_KEYS.EMAIL]: string;
};

const INITIAL_VALUES: FormValues = {
  [FORM_KEYS.EMAIL]: '',
};

const VALIDATION_SCHEMA = Yup.object({
  [FORM_KEYS.EMAIL]: Yup.string()
    .email('Please enter a valid Email!')
    .required('Please enter a valid Email!'),
});

const Newsletter = (): JSX.Element => {
  const {createSubscriber, loading} = useCreateNewsLetterSubscriber();

  const handleSubmit: FormikConfig<FormValues>['onSubmit'] = useCallback(
    (values: FormValues, {resetForm}) => {
      console.log(values);
      createSubscriber({
        variables: {
          email: values[FORM_KEYS.EMAIL],
        },
      }).then(() => resetForm());
    },
    [createSubscriber],
  );

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Box fontSize="md" fontWeight="bold">
        Newsletter
      </Box>
      <Box color="whiteAlpha.600" fontSize="sm" fontWeight="semibold" mb={4}>
        Far far away, behind the word mountains, far from the countries.
      </Box>

      <Formik<FormValues>
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
        validationSchema={VALIDATION_SCHEMA}
        validateOnBlur={false}
      >
        {({submitForm}): JSX.Element => (
          <>
            <InputControl
              name={FORM_KEYS.EMAIL}
              inputProps={{
                placeholder: 'Enter email address',
                variant: 'filled',
              }}
            />
            <Button
              variant="solid"
              colorScheme="brand"
              mt={2}
              onClick={submitForm}
              isLoading={loading}
              leftIcon={<IoMdMail />}
            >
              Subscribe
            </Button>
          </>
        )}
      </Formik>
    </Box>
  );
};

const MemoizedNewsletter = memo(Newsletter);

export {MemoizedNewsletter as Newsletter};
