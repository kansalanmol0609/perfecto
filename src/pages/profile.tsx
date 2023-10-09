//libs
import Head from 'next/head';
import {motion} from 'framer-motion';

//components
import {Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Stack} from '@chakra-ui/react';
import {FullPageLoader} from '@/components/FullPageLoader';
import {FullPageErrorScreen} from '@/components/FullPageErrorScreen';
import {SideBar} from '@/components/sideBar';
import UserTableBookings from '@/modules/userProfile/UserTableBookings';
import UserAddresses from '@/modules/userProfile/UserAddresses';
import UserOrders from '@/modules/userProfile/UserOrders';

//hooks
import {useFetchUserDetails} from '@/modules/userProfile/hooks/useFetchUserDetails';

//icons
import {FiShoppingBag, FiCalendar, FiMapPin} from 'react-icons/fi';

//decorators
import {withAuthentication, ROUTE_TYPE} from '@/decorators/withAuthentication';

const config = {
  orders: {
    title: 'Orders',
    icon: FiShoppingBag,
    component: () => <UserOrders />,
  },
  addresses: {
    title: 'Addresses',
    icon: FiMapPin,
    component: UserAddresses,
  },
  tableBookings: {
    title: 'Table Bookings',
    icon: FiCalendar,
    component: UserTableBookings,
  },
};

const ANIMATION_VARIANTS = {
  initial: {opacity: 0, y: 20},
  animate: {opacity: 1, y: 0},
  exit: {opacity: 0, y: 0},
};

const ProfilePageBody = withAuthentication({
  routeType: ROUTE_TYPE.PRIVATE,
})(() => {
  const {loading, error, data, refetch} = useFetchUserDetails();
  const user = data?.fetchUserDetails;

  if (loading || !user) {
    return <FullPageLoader />;
  }

  if (error) {
    return <FullPageErrorScreen refetch={refetch} />;
  }

  return (
    <Box py={16} px={4} minHeight="50vh" maxWidth={1100} mx="auto">
      <motion.div
        initial="initial"
        animate="animate"
        variants={ANIMATION_VARIANTS}
        transition={{duration: 0.2}}
      >
        <Box display="flex" gap={8} flexDirection={{md: 'row', sm: 'column'}}></Box>
        <SideBar config={config} />
      </motion.div>
    </Box>
  );
});

export default function ProfilePage() {
  return (
    <>
      <Head>
        <title>Profile Page</title>
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
              Profile
            </Box>

            <Breadcrumb fontSize="xs" color="white" textTransform="uppercase">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink href="/profile">Profile</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Stack>
        </Box>

        <ProfilePageBody />
      </Box>
    </>
  );
}
