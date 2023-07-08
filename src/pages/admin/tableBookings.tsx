//libs
import {useCallback, useMemo, useState} from 'react';
import Head from 'next/head';
import _range from 'lodash/range';
import _isEmpty from 'lodash/isEmpty';
import {gql, useQuery} from '@apollo/client';
import dayjs from 'dayjs';

//components
import {
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
  Heading,
  Icon,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import {FullPageLoader} from '@/components/FullPageLoader';
import {FullPageErrorScreen} from '@/components/FullPageErrorScreen';
import {motion, AnimatePresence} from 'framer-motion';

//icons
import {CalendarIcon} from '@chakra-ui/icons';
import {BsPeopleFill} from 'react-icons/bs';
import {BiSolidTimeFive} from 'react-icons/bi';

//hocs
import {withAuthentication} from '@/decorators/withAuthentication';

//constants
import {ROUTE_TYPE} from '@/decorators/withAuthentication/withAuthentication';

//types
import {TableBooking, User} from '@prisma/client';
import {TableBookingCard} from '@/components/tableBookingCard';

const ANIMATION_VARIANTS = {
  initial: {opacity: 0, y: 20},
  animate: {opacity: 1, y: 0},
  exit: {opacity: 0, y: 0},
};

const FETCH_TABLE_BOOKINGS_QUERY = gql`
  query FetchTableBookings($bookingType: BookingType!) {
    fetchTableBookings(bookingType: $bookingType) {
      id
      date
      numberOfPeople
      createdAt
      user {
        id
        name
        email
        image
      }
      tableBookingStatus
    }
  }
`;

enum BOOKING_TYPE {
  UPCOMING,
  PENDING,
  PAST,
  CANCELLED,
}

type TableBookingValue = Omit<TableBooking, 'userId'> & {user: User};

const ManageTableBookingsPageBody = withAuthentication({
  routeType: ROUTE_TYPE.ADMIN,
})(() => {
  const [activeTabId, setActiveTabId] = useState<BOOKING_TYPE>(BOOKING_TYPE.UPCOMING);

  const handleActiveTabIdChange = useCallback(
    (nextActiveTabId: BOOKING_TYPE) => setActiveTabId(nextActiveTabId),
    [],
  );

  const {loading, error, data, refetch} = useQuery<
    {
      fetchTableBookings: Array<TableBookingValue>;
    },
    {
      bookingType: keyof typeof BOOKING_TYPE;
    }
  >(FETCH_TABLE_BOOKINGS_QUERY, {
    variables: {
      bookingType: BOOKING_TYPE[activeTabId] as keyof typeof BOOKING_TYPE,
    },
  });

  const adaptedData = useMemo(
    () =>
      data?.fetchTableBookings.reduce(
        (result: Record<string, Array<TableBookingValue>>, tableBooking: TableBookingValue) => {
          const parsedDate = dayjs(+tableBooking.date);

          const monthName = parsedDate.format('MMMM'); // Get the full month name
          const year = parsedDate.format('YYYY'); // Get the year

          const monthAndYearKey = monthName + ', ' + year;

          if (_isEmpty(result[monthAndYearKey])) {
            result[monthAndYearKey] = [tableBooking];
          } else {
            result[monthAndYearKey].push(tableBooking);
          }

          return result;
        },
        {},
      ),
    [data?.fetchTableBookings],
  );

  const renderBody = useCallback(() => {
    if (loading || !data) {
      return <FullPageLoader />;
    }

    if (error) {
      return <FullPageErrorScreen refetch={refetch} />;
    }

    if (_isEmpty(adaptedData)) {
      return (
        <VStack height="50vh" display="flex" justifyContent="center" gap={4}>
          <Icon as={CalendarIcon} boxSize="24" color="brand.500" />
          <Heading size="md">No Reservation found!</Heading>
        </VStack>
      );
    }

    return (
      <>
        {Object.keys(adaptedData).map((monthAndYear: string) => (
          <Box key={monthAndYear}>
            <Heading size="md" my={8}>
              {monthAndYear}
            </Heading>

            <VStack gap={4}>
              {adaptedData[monthAndYear].map((tableBooking) => (
                <TableBookingCard key={tableBooking.id} tableBooking={tableBooking} />
              ))}
            </VStack>
          </Box>
        ))}
      </>
    );
  }, [adaptedData, data, error, loading, refetch]);

  return (
    <Box py={16} px={4} maxWidth={1100} mx="auto">
      <Tabs
        isLazy
        variant="soft-rounded"
        colorScheme="brand"
        size={{sm: 'sm', md: 'md'}}
        index={activeTabId}
        onChange={handleActiveTabIdChange}
      >
        <TabList>
          <Tab tabIndex={BOOKING_TYPE.UPCOMING}>Upcoming</Tab>
          <Tab tabIndex={BOOKING_TYPE.PENDING}>Pending</Tab>
          <Tab tabIndex={BOOKING_TYPE.PAST}>Past</Tab>
          <Tab tabIndex={BOOKING_TYPE.CANCELLED}>Cancelled</Tab>
        </TabList>

        <AnimatePresence>
          <TabPanels py={8}>
            <TabPanel>
              <motion.div
                initial="initial"
                animate="animate"
                variants={ANIMATION_VARIANTS}
                transition={{duration: 0.2}}
              >
                <Box maxWidth={{md: '5xl', sm: 'full'}} mx="auto">
                  {renderBody()}
                </Box>
              </motion.div>
            </TabPanel>
            <TabPanel>
              <motion.div
                initial="initial"
                animate="animate"
                variants={ANIMATION_VARIANTS}
                transition={{duration: 0.2}}
              >
                <Box maxWidth={{md: '5xl', sm: 'full'}} mx="auto">
                  {renderBody()}
                </Box>
              </motion.div>
            </TabPanel>
            <TabPanel>
              <motion.div
                initial="initial"
                animate="animate"
                variants={ANIMATION_VARIANTS}
                transition={{duration: 0.2}}
              >
                <Box maxWidth={{md: '5xl', sm: 'full'}} mx="auto">
                  {renderBody()}
                </Box>
              </motion.div>
            </TabPanel>
            <TabPanel>
              <motion.div
                initial="initial"
                animate="animate"
                variants={ANIMATION_VARIANTS}
                transition={{duration: 0.2}}
              >
                <Box maxWidth={{md: '5xl', sm: 'full'}} mx="auto">
                  {renderBody()}
                </Box>
              </motion.div>
            </TabPanel>
          </TabPanels>
        </AnimatePresence>
      </Tabs>
    </Box>
  );
});

function ManageTableBookingsPage() {
  return (
    <>
      <Head>
        <title>Manage Table Bookings</title>
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
              Table Bookings
            </Box>

            <Breadcrumb fontSize="xs" color="white" textTransform="uppercase">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/tableBookings">Table Bookings</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Stack>
        </Box>

        <ManageTableBookingsPageBody />
      </Box>
    </>
  );
}

export default ManageTableBookingsPage;
