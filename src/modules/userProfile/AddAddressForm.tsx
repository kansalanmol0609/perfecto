//libs
import {useCallback} from 'react';
import * as Yup from 'yup';

//components
import {Box} from '@chakra-ui/react';
import {Formik, FormikConfig} from 'formik';
import {InputControl} from 'formik-chakra-ui';

enum FORM_KEYS {
  LINE_1 = 'line1',
  LINE_2 = 'line2',
  CITY = 'city',
  STATE = 'state',
  COUNTRY = 'country',
  PIN_CODE = 'pinCode',
}

type FormValues = {
  [FORM_KEYS.LINE_1]: string;
  [FORM_KEYS.LINE_2]: string | null;
  [FORM_KEYS.CITY]: string;
  [FORM_KEYS.STATE]: string;
  [FORM_KEYS.COUNTRY]: string;
  [FORM_KEYS.PIN_CODE]: string;
};

const INITIAL_VALUES: FormValues = {
  [FORM_KEYS.LINE_1]: '',
  [FORM_KEYS.LINE_2]: null,
  [FORM_KEYS.CITY]: '',
  [FORM_KEYS.STATE]: '',
  [FORM_KEYS.COUNTRY]: '',
  [FORM_KEYS.PIN_CODE]: '',
};

const VALIDATION_SCHEMA = Yup.object({
  [FORM_KEYS.LINE_1]: Yup.string()
    .required('This field cannot be empty!')
    .max(20, 'Max 20 characters'),
  [FORM_KEYS.CITY]: Yup.string()
    .required('This field cannot be empty!')
    .max(20, 'Max 20 characters'),
  [FORM_KEYS.STATE]: Yup.string()
    .required('This field cannot be empty!')
    .max(10, 'Max 10 characters'),
  [FORM_KEYS.COUNTRY]: Yup.string()
    .required('This field cannot be empty!')
    .max(10, 'Max 10 characters'),
  [FORM_KEYS.PIN_CODE]: Yup.string().required('This field cannot be empty!'),
});

export const AddAddressForm = ({
  onSubmit,
  children,
  initialValues = INITIAL_VALUES,
}: {
  onSubmit: (addressInput: FormValues) => Promise<any>;
  children: (args: {onSubmit: () => void}) => JSX.Element;
  initialValues?: FormValues;
}): JSX.Element => {
  const handleSubmit: FormikConfig<FormValues>['onSubmit'] = useCallback(
    (values: FormValues, {resetForm}) =>
      onSubmit({
        line1: values.line1,
        line2: values.line2,
        city: values.city,
        state: values.state,
        country: values.country,
        pinCode: values.pinCode,
      }).then(() => resetForm()),
    [onSubmit],
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
          <Box
            display="grid"
            gridTemplateColumns={{md: 'repeat(2, 1fr)', sm: '1fr'}}
            gap={4}
            py={4}
          >
            <InputControl name={FORM_KEYS.LINE_1} label="Line 1" isRequired />
            <InputControl name={FORM_KEYS.LINE_2} label="Line 2" />
            <InputControl name={FORM_KEYS.CITY} label="City" isRequired />
            <InputControl name={FORM_KEYS.STATE} label="State" isRequired />
            <InputControl name={FORM_KEYS.COUNTRY} label="Country" isRequired />
            <InputControl name={FORM_KEYS.PIN_CODE} label="Pin Code" isRequired />
          </Box>

          {children({onSubmit: submitForm})}
        </>
      )}
    </Formik>
  );
};
