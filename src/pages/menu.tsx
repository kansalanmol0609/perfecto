//libs
import Head from 'next/head';
import {gql, useQuery} from '@apollo/client';

//components
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import {motion, AnimatePresence} from 'framer-motion';
import {FullPageLoader} from '@/components/FullPageLoader';
import {FullPageErrorScreen} from '@/components/FullPageErrorScreen';
import FoodItemCard from '@/components/itemCard/variants/Customer';

//decorators
import {withAuthentication, ROUTE_TYPE} from '@/decorators/withAuthentication';

//types
import {Food, Food_category} from '@prisma/client';

const ANIMATION_VARIANTS = {
  initial: {opacity: 0, y: 20},
  animate: {opacity: 1, y: 0},
  exit: {opacity: 0, y: 0},
};

const READ_FOOD_ITEMS_QUERY = gql`
  query ReadFoodItems {
    readFoodItems {
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
    }
  }
`;

const MenuPageBody = withAuthentication({
  routeType: ROUTE_TYPE.PUBLIC,
})(() => {
  const {loading, error, data, refetch} = useQuery<{readFoodItems: Array<Food>}>(
    READ_FOOD_ITEMS_QUERY,
  );

  if (loading || !data) {
    return <FullPageLoader />;
  }

  if (error) {
    return <FullPageErrorScreen refetch={refetch} />;
  }

  return (
    <Box py={20} px={4} maxWidth={1100} mx="auto">
      <Tabs isLazy variant="soft-rounded" colorScheme="brand" size={{sm: 'sm', md: 'md'}}>
        <TabList>
          <Tab>Breakfast</Tab>
          <Tab>Lunch</Tab>
          <Tab>Dinner</Tab>
          <Tab>Drinks</Tab>
          <Tab>Desserts</Tab>
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
                <Box
                  maxWidth={{md: '5xl', sm: 'full'}}
                  mx="auto"
                  display="grid"
                  gridTemplateColumns={{md: 'repeat(2, 1fr)', sm: '1fr'}}
                  gap={4}
                >
                  {data?.readFoodItems
                    .filter((foodItem) => foodItem.category === Food_category.BREAKFAST)
                    .map((foodItem) => (
                      <FoodItemCard key={foodItem.id} item={foodItem} />
                    ))}
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
                <Box
                  maxWidth="5xl"
                  mx="auto"
                  display="grid"
                  gridTemplateColumns={{md: 'repeat(2, 1fr)', sm: '1fr'}}
                  gap={4}
                >
                  {data?.readFoodItems
                    .filter((foodItem) => foodItem.category === Food_category.LUNCH)
                    .map((foodItem) => (
                      <FoodItemCard key={foodItem.id} item={foodItem} />
                    ))}
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
                <Box
                  maxWidth="5xl"
                  mx="auto"
                  display="grid"
                  gridTemplateColumns={{md: 'repeat(2, 1fr)', sm: '1fr'}}
                  gap={4}
                >
                  {data?.readFoodItems
                    .filter((foodItem) => foodItem.category === Food_category.DINNER)
                    .map((foodItem) => (
                      <FoodItemCard key={foodItem.id} item={foodItem} />
                    ))}
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
                <Box
                  maxWidth="5xl"
                  mx="auto"
                  display="grid"
                  gridTemplateColumns={{md: 'repeat(2, 1fr)', sm: '1fr'}}
                  gap={4}
                >
                  {data?.readFoodItems
                    .filter((foodItem) => foodItem.category === Food_category.DRINK)
                    .map((foodItem) => (
                      <FoodItemCard key={foodItem.id} item={foodItem} />
                    ))}
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
                <Box
                  maxWidth="5xl"
                  mx="auto"
                  display="grid"
                  gridTemplateColumns={{md: 'repeat(2, 1fr)', sm: '1fr'}}
                  gap={4}
                >
                  {data?.readFoodItems
                    .filter((foodItem) => foodItem.category === Food_category.DESSERT)
                    .map((foodItem) => (
                      <FoodItemCard key={foodItem.id} item={foodItem} />
                    ))}
                </Box>
              </motion.div>
            </TabPanel>
          </TabPanels>
        </AnimatePresence>
      </Tabs>
    </Box>
  );
});

export default function MenuPage() {
  return (
    <>
      <Head>
        <title>Menu</title>
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
          backgroundImage="https://preview.colorlib.com/theme/feliciano/images/bg_1.jpg.webp"
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
              Specialties
            </Box>

            <Breadcrumb fontSize="xs" color="white" textTransform="uppercase">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink href="/menu">Menu</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Stack>
        </Box>

        <MenuPageBody />
      </Box>
    </>
  );
}
