//libs
import {memo} from 'react';
import * as Yup from 'yup';

//components
import {Box, Button, HStack} from '@chakra-ui/react';
import {Formik, FormikConfig} from 'formik';
import {
  InputControl,
  NumberInputControl,
  SelectControl,
  SwitchControl,
  TextareaControl,
} from 'formik-chakra-ui';

//types
import {Food_category} from '@prisma/client';

export enum FORM_KEYS {
  NAME = 'name',
  DESCRIPTION = 'description',
  PICTURES = 'pictures',
  IS_VEG = 'isVeg',
  IN_STOCK = 'inStock',
  PRICE_AMOUNT = 'priceAmount',
  PRICE_CURRENCY = 'priceCurrency',
  CATEGORY = 'category',
}

export type FormValues = {
  [FORM_KEYS.NAME]: string;
  [FORM_KEYS.DESCRIPTION]: string;
  [FORM_KEYS.PICTURES]: string;
  [FORM_KEYS.IS_VEG]: boolean;
  [FORM_KEYS.IN_STOCK]: boolean;
  [FORM_KEYS.PRICE_AMOUNT]: string;
  [FORM_KEYS.PRICE_CURRENCY]: string;
  [FORM_KEYS.CATEGORY]: Food_category;
};

const INITIAL_VALUES: FormValues = {
  [FORM_KEYS.NAME]: '',
  [FORM_KEYS.DESCRIPTION]: '',
  [FORM_KEYS.PICTURES]: '',
  [FORM_KEYS.IS_VEG]: false,
  [FORM_KEYS.IN_STOCK]: false,
  [FORM_KEYS.PRICE_AMOUNT]: '',
  [FORM_KEYS.PRICE_CURRENCY]: '',
  [FORM_KEYS.CATEGORY]: Food_category.BREAKFAST,
};

const VALIDATION_SCHEMA = Yup.object({
  [FORM_KEYS.NAME]: Yup.string().required('Name is mandatory!'),
  [FORM_KEYS.DESCRIPTION]: Yup.string().required('Description is mandatory!'),
  [FORM_KEYS.PICTURES]: Yup.string().required('Picture is mandatory!'),
  [FORM_KEYS.IS_VEG]: Yup.boolean(),
  [FORM_KEYS.IN_STOCK]: Yup.boolean(),
  [FORM_KEYS.PRICE_AMOUNT]: Yup.string().required('Price Per Unit is mandatory!'),
  [FORM_KEYS.PRICE_CURRENCY]: Yup.string().required('Price Unit is mandatory!'),
  [FORM_KEYS.CATEGORY]: Yup.string().required('Category is mandatory!'),
});

const CreateFoodForm = ({
  initialValue = INITIAL_VALUES,
  onSubmit,
  isSubmitting,
}: {
  initialValue?: FormValues;
  isSubmitting: boolean;
  onSubmit: FormikConfig<FormValues>['onSubmit'];
}) => {
  return (
    <Formik<FormValues>
      initialValues={initialValue}
      onSubmit={onSubmit}
      validationSchema={VALIDATION_SCHEMA}
      validateOnBlur={false}
    >
      {({submitForm}): JSX.Element => (
        <>
          <Box fontWeight="bold" fontSize="2xl">
            Enter Food Details
          </Box>

          <InputControl
            name={FORM_KEYS.NAME}
            label="Name"
            inputProps={{placeholder: 'Enter Name'}}
            isRequired
            my={4}
          />
          <TextareaControl
            name={FORM_KEYS.DESCRIPTION}
            label="Description"
            textareaProps={{placeholder: 'Enter Description'}}
            isRequired
            my={4}
          />
          <InputControl
            name={FORM_KEYS.PICTURES}
            inputProps={{placeholder: 'Add Picture'}}
            label="Picture"
            isRequired
            my={4}
          />

          <HStack alignItems="flex-start" my={4}>
            <NumberInputControl
              name={FORM_KEYS.PRICE_AMOUNT}
              numberInputProps={{placeholder: 'Enter Price'}}
              label="Price"
              isRequired
            />
            <SelectControl
              name={FORM_KEYS.PRICE_CURRENCY}
              label="Currency"
              selectProps={{placeholder: 'Select Currency'}}
              width="80"
              isRequired
            >
              <option value="AED">AED</option>
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </SelectControl>
          </HStack>

          <HStack my={4}>
            <SwitchControl
              name={FORM_KEYS.IS_VEG}
              label="Vegetarian"
              isRequired
              switchProps={{colorScheme: 'brand'}}
            />
            <SwitchControl
              name={FORM_KEYS.IN_STOCK}
              label="In Stock"
              isRequired
              switchProps={{colorScheme: 'brand'}}
            />
          </HStack>

          <SelectControl
            name={FORM_KEYS.CATEGORY}
            label="Category"
            selectProps={{placeholder: 'Select Category'}}
            my={4}
            isRequired
          >
            <option value="BREAKFAST">Breakfast</option>
            <option value="LUNCH">Lunch</option>
            <option value="DINNER">Dinner</option>
            <option value="DESSERT">Dessert</option>
            <option value="DRINK">Drink</option>
          </SelectControl>

          <Button
            my={4}
            size="lg"
            colorScheme="brand"
            type="submit"
            onClick={submitForm}
            isLoading={isSubmitting}
          >
            Submit
          </Button>
        </>
      )}
    </Formik>
  );
};

export default memo(CreateFoodForm);
