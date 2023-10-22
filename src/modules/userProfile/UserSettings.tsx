//libs
import {memo, useCallback, useMemo} from 'react';
import _isEmpty from 'lodash/isEmpty';
import * as Yup from 'yup';

//hooks
import {useFetchUserDetails} from './hooks/useFetchUserDetails';
import {useRouter} from 'next/router';
import {useUpdateUser} from './hooks/useUpdateUser';

//components
import {Button, Image} from '@chakra-ui/react';
import {Formik, FormikConfig} from 'formik';
import {InputControl} from 'formik-chakra-ui';

enum FORM_KEYS {
  NAME = 'name',
  EMAIL = 'email',
}

type FormValues = {
  [FORM_KEYS.NAME]: string;
  [FORM_KEYS.EMAIL]: string;
};

const VALIDATION_SCHEMA = Yup.object({
  [FORM_KEYS.NAME]: Yup.string().required('Please enter Name!'),
  [FORM_KEYS.EMAIL]: Yup.string()
    .email('Please enter a valid Email')
    .required('Please enter Email!'),
});

const UserSettings = (): JSX.Element => {
  const {data} = useFetchUserDetails();
  const user = data?.fetchUserDetails?.tableBookings?.[0]?.user!;
  const {push} = useRouter();

  const initialValues = useMemo<FormValues>(
    () => ({
      [FORM_KEYS.NAME]: user.name ?? '',
      [FORM_KEYS.EMAIL]: user.email as string,
    }),
    [user],
  );

  const {updateUser} = useUpdateUser();

  const handleSubmit: FormikConfig<FormValues>['onSubmit'] = useCallback(
    (values: FormValues, {}) =>
      updateUser({
        variables: {
          updateUserInput: {
            name: values.name,
          },
        },
      }),
    [updateUser],
  );

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={VALIDATION_SCHEMA}
      validateOnBlur={false}
    >
      {({submitForm}): JSX.Element => (
        <>
          <Image
            src={
              user?.image ??
              `https://ui-avatars.com/api/?background=AA8F66&color=fff&name=${user.name}`
            }
            alt={`${user?.name}'s profile picture`}
            height={100}
            width={100}
          />

          <InputControl name={FORM_KEYS.NAME} label="Your Name" my={4} />
          <InputControl
            name={FORM_KEYS.EMAIL}
            label="Your Email"
            my={2}
            isDisabled
            inputProps={{isDisabled: true}}
          />

          <Button
            size="md"
            colorScheme="brand"
            aria-label="Send Message"
            type="submit"
            onClick={submitForm}
            my={4}
          >
            Save
          </Button>
        </>
      )}
    </Formik>
  );
};

export default memo(UserSettings);
