//libs
import Head from 'next/head';
import _range from 'lodash/range';
import {useCallback} from 'react';
import {FormikConfig} from 'formik';
import Dinero, {Currency} from 'dinero.js';

//components
import {Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Stack} from '@chakra-ui/react';
import {CreateFoodForm} from '@/components/createFoodForm';

//hooks
import {useCreateFood} from '@/hooks/useCreateFood';

//hocs
import {withAuthentication} from '@/decorators/withAuthentication';

//constants
import {ROUTE_TYPE} from '@/decorators/withAuthentication/withAuthentication';

//types
import {FormValues} from '@/components/createFoodForm/CreateFoodForm';

const CreateFoodPageBody = withAuthentication({
  routeType: ROUTE_TYPE.ADMIN,
})(() => {
  const {createFood, loading: isSubmitting} = useCreateFood();

  const handleSubmit: FormikConfig<FormValues>['onSubmit'] = useCallback(
    (values: FormValues, {resetForm}) =>
      createFood({
        variables: {
          createFoodInput: {
            name: values.name,
            description: values.description,
            pictures: values.pictures,
            isVeg: values.isVeg,
            inStock: values.inStock,
            price: Dinero({
              amount: +values.priceAmount,
              currency: values.priceCurrency as Currency,
            }).toObject(),
            category: values.category,
          },
        },
      }).then(() => resetForm()),
    [createFood],
  );

  return (
    <Box py={16} px={4} maxWidth={1100} mx="auto">
      <CreateFoodForm isSubmitting={isSubmitting} onSubmit={handleSubmit} />
    </Box>
  );
});

function CreateFoodPage() {
  return (
    <>
      <Head>
        <title>Create Food</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main">
        <Box
          height="400px"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundImage="https://preview.colorlib.com/theme/feliciano/images/bg_3.jpg.webp"
          backgroundAttachment="fixed"
          width="full"
          display="flex"
          alignItems="center"
        >
          <Stack
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="flex-end"
            height="full"
            width="full"
            backgroundColor="blackAlpha.700"
            pb={8}
          >
            <Box fontSize="4xl" fontWeight="extrabold" color="white">
              Create Food
            </Box>

            <Breadcrumb fontSize="xs" color="white" textTransform="uppercase">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/createFood">Create Food</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Stack>
        </Box>

        <CreateFoodPageBody />
      </Box>
    </>
  );
}

export default CreateFoodPage;
