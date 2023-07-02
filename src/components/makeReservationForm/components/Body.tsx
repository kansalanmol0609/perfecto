//libs
import {useCallback, useMemo} from 'react';
import * as Yup from 'yup';

//components
import {Box} from '@chakra-ui/react';
import {Formik, FormikConfig} from 'formik';
import {InputControl, SelectControl} from 'formik-chakra-ui';

const getCurrentDateTime = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

enum FORM_KEYS {
  DATE_AND_TIME = 'dateAndTime',
  NUMBER_OF_PERSONS = 'numberOfPersons',
}

type FormValues = {
  [FORM_KEYS.DATE_AND_TIME]: string;
  [FORM_KEYS.NUMBER_OF_PERSONS]: number;
};

const INITIAL_VALUES: FormValues = {
  [FORM_KEYS.DATE_AND_TIME]: getCurrentDateTime(),
  [FORM_KEYS.NUMBER_OF_PERSONS]: 1,
};

const VALIDATION_SCHEMA = Yup.object({
  [FORM_KEYS.DATE_AND_TIME]: Yup.string().required('Please enter date & time!'),
  [FORM_KEYS.NUMBER_OF_PERSONS]: Yup.number().required('Please select number of persons!'),
});

export const Body = ({
  onSubmit,
  children,
}: {
  onSubmit: (args: {date: string; numberOfPeople: number}) => Promise<any>;
  children: (args: {onSubmit: () => void}) => JSX.Element;
}): JSX.Element => {
  const handleSubmit: FormikConfig<FormValues>['onSubmit'] = useCallback(
    (values: FormValues, {resetForm}) =>
      onSubmit({
        date: values.dateAndTime,
        numberOfPeople: +values.numberOfPersons as number,
      }).then(() => resetForm()),
    [onSubmit],
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
          <Box
            display="grid"
            gridTemplateColumns={{md: 'repeat(2, 1fr)', sm: '1fr'}}
            gap={4}
            py={4}
          >
            <InputControl
              name={FORM_KEYS.DATE_AND_TIME}
              label="Date & Time"
              placeholder="Date"
              inputProps={{type: 'datetime-local', min: getCurrentDateTime()}}
              isRequired
            />

            <SelectControl
              name={FORM_KEYS.NUMBER_OF_PERSONS}
              label="Number of Persons"
              selectProps={{placeholder: 'Number of Persons'}}
              isRequired
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </SelectControl>
          </Box>

          {children({onSubmit: submitForm})}
        </>
      )}
    </Formik>
  );
};
