//libs
import {gql, useQuery} from '@apollo/client';
import Head from 'next/head';
import {motion} from 'framer-motion';
import Dinero from 'dinero.js';
import {useState, useCallback} from 'react';
import _isEmpty from 'lodash/isEmpty';

//hooks
import {usePlaceOrder} from '@/hooks/usePlaceOrder';

//components
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Stack,
  VStack,
  Button,
  HStack,
  Radio,
  RadioGroup,
  Tooltip,
} from '@chakra-ui/react';
import {FullPageLoader} from '@/components/FullPageLoader';
import {FullPageErrorScreen} from '@/components/FullPageErrorScreen';
import FoodItemCard from '@/components/itemCard/variants/Customer';

//decorators
import {withAuthentication, ROUTE_TYPE} from '@/decorators/withAuthentication';

//types
import {Cart} from '@/types/Cart';
import {Address} from '@prisma/client';

const READ_CART_ITEMS = gql`
  query ReadCartItems {
    readCartItems {
      id
      items {
        food {
          id
          name
          description
          pictures
          isVeg
          inStock
          price {
            amount
            currency
            precision
          }
          category
          createdAt
          updatedAt
          userId
        }
        count
      }
      userId
    }
  }
`;

const READ_ADDRESSES = gql`
  query ReadAddresses {
    readAddresses {
      id
      line1
      line2
      city
      state
      country
      pinCode
      createdAt
      updatedAt
      userId
    }
  }
`;

const ANIMATION_VARIANTS = {
  initial: {opacity: 0, y: 20},
  animate: {opacity: 1, y: 0},
  exit: {opacity: 0, y: 0},
};

const CartPageBody = withAuthentication({
  routeType: ROUTE_TYPE.PRIVATE,
})(() => {
  const {loading, error, data, refetch} = useQuery<{
    readCartItems: Cart;
  }>(READ_CART_ITEMS, {
    fetchPolicy: 'cache-first',
  });

  const {
    loading: addressLoading,
    error: addressError,
    data: addressData,
    refetch: refetchAddress,
  } = useQuery<{
    readAddresses: Address[];
  }>(READ_ADDRESSES, {
    fetchPolicy: 'cache-first',
  });

  const {placeOrder, loading: isPlacingOrder} = usePlaceOrder();

  const [selectedAddress, setSelectedAddress] = useState<string | undefined>(undefined);

  const items = data?.readCartItems.items;
  const addresses = addressData?.readAddresses;

  const handlePlaceOrder = useCallback(() => {
    if (!selectedAddress || _isEmpty(items)) return;

    placeOrder({
      variables: {
        addressId: selectedAddress,
        items: items!.map((item) => ({
          foodId: item.food.id,
          count: item.count,
        })),
      },
    });
  }, [placeOrder, selectedAddress, items]);

  if (addressLoading || loading || !items || !addresses) {
    return <FullPageLoader />;
  }

  if (error || addressError) {
    return <FullPageErrorScreen refetch={error ? refetch : refetchAddress} />;
  }

  const totalPrice = +items.reduce((acc, item) => {
    //@ts-ignore
    return acc + +item.food.price.amount * item.count;
  }, 0);

  const tax = Math.round(totalPrice * 0.18 * 100) / 100;
  const totalPriceWithTax = Math.round((totalPrice + tax) * 100) / 100;

  return (
    <Box py={16} px={4} minHeight="50vh" maxWidth={1100} mx="auto">
      <motion.div
        initial="initial"
        animate="animate"
        variants={ANIMATION_VARIANTS}
        transition={{duration: 0.2}}
      >
        <Box display="flex" gap={8} flexDirection={{md: 'row', sm: 'column'}}>
          <VStack
            flex={1}
            gap={4}
            pr={8}
            borderRightWidth={{base: 0, md: 1}}
            borderRightStyle="solid"
            borderColor={{sm: 'blackAlpha.300'}}
          >
            {items.map((item) => (
              <FoodItemCard key={item.food.id} item={item.food} />
            ))}
          </VStack>

          <VStack flex={1} gap={4} alignItems="flex-start">
            <Heading size="xl">Select Addresses</Heading>
            <RadioGroup name="select-address">
              {addresses.map((address) => (
                <Radio
                  size="md"
                  name="1"
                  colorScheme="brand"
                  key={address.id}
                  isChecked={selectedAddress === address.id}
                  onChange={() => setSelectedAddress(address.id)}
                  p={3}
                >
                  {address.line1}, {address.line2}, {address.city}, {address.state},{' '}
                  {address.country}, {address.pinCode}
                </Radio>
              ))}

              {addresses.length === 0 && (
                <span>Please add an address by going to profile page!</span>
              )}
            </RadioGroup>

            <Heading size="xl">Cart totals</Heading>
            <VStack pl={4} alignItems="flex-start" width="full">
              <HStack justifyContent="space-between" width="full">
                <span>Subtotal (Excl. Tax)</span>
                <span>
                  {' '}
                  {Dinero({
                    //@ts-ignore
                    amount: Math.floor(totalPrice * 100),
                    //@ts-ignore
                    currency: 'USD',
                  }).toFormat()}
                </span>
              </HStack>

              <HStack justifyContent="space-between" width="full">
                <span>Tax (18% GST)</span>
                <span>$ {tax}</span>
              </HStack>

              <HStack justifyContent="space-between" fontWeight="bold" width="full">
                <span>Total (Incl. Tax)</span>
                <span>$ {totalPriceWithTax}</span>
              </HStack>
            </VStack>

            <Tooltip label={!selectedAddress ? 'Please select an address' : ''}>
              <Button
                colorScheme="brand"
                alignSelf="flex-end"
                isDisabled={!selectedAddress}
                isLoading={isPlacingOrder}
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </Tooltip>
          </VStack>
        </Box>
      </motion.div>
    </Box>
  );
});

export default function CartPage() {
  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main">
        <Box
          height={'400px'}
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
              Cart
            </Box>

            <Breadcrumb fontSize="xs" color="white" textTransform="uppercase">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink href="/cart">Cart</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Stack>
        </Box>

        <CartPageBody />
      </Box>
    </>
  );
}
