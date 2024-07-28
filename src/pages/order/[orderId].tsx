//libs
import {gql, useQuery} from '@apollo/client';
import Head from 'next/head';
import {motion} from 'framer-motion';
import Dinero from 'dinero.js';
import _isEmpty from 'lodash/isEmpty';
import {useRouter} from 'next/router';

//components
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
  Icon,
  Stack,
  VStack,
} from '@chakra-ui/react';
import {FullPageLoader} from '@/components/FullPageLoader';
import {FullPageErrorScreen} from '@/components/FullPageErrorScreen';

//icons
import {WarningTwoIcon} from '@chakra-ui/icons';
import {FiBookmark, FiCalendar, FiHome, FiTag} from 'react-icons/fi';
import {FaRegMoneyBillAlt} from 'react-icons/fa';
import {BiFoodMenu} from 'react-icons/bi';

//decorators
import {withAuthentication, ROUTE_TYPE} from '@/decorators/withAuthentication';

//types
import {Address, Food, Order as PrismaOrder, Rating} from '@prisma/client';

type Order = Omit<PrismaOrder, 'userId' | 'addressId' | 'ratingId'> & {
  address: Address;
  rating: Rating;
  items: Array<{
    food: Food;
    count: number;
  }>;
};

const FETCH_ORDER_DETAILS = gql`
  query FetchOrderDetails($orderId: String!) {
    fetchOrderDetails(orderId: $orderId) {
      id
      status
      createdAt
      updatedAt
      address {
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
      rating {
        id
        rating
        comment
        createdAt
        updatedAt
      }
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
    }
  }
`;

const ANIMATION_VARIANTS = {
  initial: {opacity: 0, y: 20},
  animate: {opacity: 1, y: 0},
  exit: {opacity: 0, y: 0},
};

const OrderDetailsPageBody = withAuthentication({
  routeType: ROUTE_TYPE.PRIVATE,
})(() => {
  const {
    query: {orderId},
  } = useRouter();

  const {loading, error, data, refetch} = useQuery<{
    fetchOrderDetails: Order;
  }>(FETCH_ORDER_DETAILS, {
    fetchPolicy: 'cache-first',
    variables: {
      orderId,
    },
  });

  const order = data?.fetchOrderDetails;

  if (loading) {
    return <FullPageLoader />;
  }

  if (error) {
    return <FullPageErrorScreen refetch={refetch} />;
  }

  if (!order) {
    return (
      <Box
        width="full"
        height="50vh"
        display="flex"
        flexDirection="column"
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        <WarningTwoIcon boxSize="20" color="brand.500" />
        <Box fontWeight="semibold" fontSize="2xl">
          Could not find any order! please check url
        </Box>
      </Box>
    );
  }

  const address = order.address;
  const items = order.items;

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
          <VStack flex={1} gap={4} alignItems="flex-start">
            <HStack alignItems="center">
              <Icon as={FiBookmark} boxSize={6} />

              <Box fontWeight="semibold" fontSize="2xl">
                Status
              </Box>
            </HStack>

            <Box>{order.status}</Box>

            <HStack alignItems="center">
              <Icon as={FiTag} boxSize={6} />

              <Box fontWeight="semibold" fontSize="2xl">
                Order Id
              </Box>
            </HStack>

            <Box>{order.id}</Box>

            <HStack alignItems="center">
              <Icon as={FiCalendar} boxSize={6} />

              <Box fontWeight="semibold" fontSize="2xl">
                Placed On
              </Box>
            </HStack>

            <Box>{new Date(+order.createdAt).toDateString()}</Box>

            <HStack alignItems="center">
              <Icon as={BiFoodMenu} boxSize={6} />

              <Box fontWeight="semibold" fontSize="2xl">
                Items
              </Box>
            </HStack>

            {items.map((item) => (
              <HStack key={item.food.id} justifyContent="space-between" width="full">
                <Box>{item.food.name}</Box>
                <Box>
                  {item.count} x (${+(item.food.price as {amount: string}).amount}/unit)
                </Box>
              </HStack>
            ))}

            <HStack alignItems="center">
              <Icon as={FiHome} boxSize={6} />

              <Box fontWeight="semibold" fontSize="2xl">
                Address
              </Box>
            </HStack>

            <Box>
              {address.line1}, {address.line2}, {address.city}, {address.state}, {address.country},{' '}
              {address.pinCode}
            </Box>

            <HStack alignItems="center">
              <Icon as={FaRegMoneyBillAlt} boxSize={6} />
              <Box fontWeight="semibold" fontSize="2xl">
                Order totals
              </Box>
            </HStack>

            <VStack alignItems="flex-start" width="full">
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

              <HStack justifyContent="space-between" width="full">
                <span>Total (Incl. Tax)</span>
                <span>$ {totalPriceWithTax}</span>
              </HStack>
            </VStack>
          </VStack>
        </Box>
      </motion.div>
    </Box>
  );
});

export default function OrderDetailsPage() {
  return (
    <>
      <Head>
        <title>Order Details</title>
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
              Order Details
            </Box>

            <Breadcrumb fontSize="xs" color="white" textTransform="uppercase">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink href="/order">View Order</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Stack>
        </Box>

        <OrderDetailsPageBody />
      </Box>
    </>
  );
}
