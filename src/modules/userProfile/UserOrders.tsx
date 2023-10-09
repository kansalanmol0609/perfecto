//libs
import {memo} from 'react';
import _isEmpty from 'lodash/isEmpty';

//hooks
import {useFetchUserDetails} from './hooks/useFetchUserDetails';
import {useRouter} from 'next/router';

//icons
import {FiHome} from 'react-icons/fi';

//components
import {Box, SimpleGrid, Button, HStack, Icon, VStack, Tag} from '@chakra-ui/react';

const UserOrders = (): JSX.Element => {
  const {data} = useFetchUserDetails();
  const orders = data?.fetchUserDetails?.orders;
  const {push} = useRouter();

  return (
    <SimpleGrid columns={1} spacing={10}>
      {orders?.map((order) => {
        const totalPrice = order?.items?.reduce((acc, item) => {
          return acc + +(item.food.price as {amount: number}).amount * item.count;
        }, 0);

        return (
          <Box key={order.id} shadow="md" borderWidth="1px">
            <Box p={5} borderWidth="1px" borderStyle="solid" borderColor="gray.200" mb={4}>
              <HStack justifyContent="flex-start" gap={2} mb={4}>
                <Tag size="md" variant="solid" colorScheme="brand" borderRadius={0} p={2}>
                  {order.status}
                </Tag>
                <Box color="brand.500" fontWeight="bold" fontSize="sm">
                  Order Placed on {new Date(+order.createdAt).toDateString()} for Amount ${' '}
                  {+(totalPrice ?? 0).toFixed(2)}
                </Box>
              </HStack>

              <VStack alignItems="flex-start" mb={4} gap={1}>
                {order.items?.map((item) => (
                  <HStack key={item.food.id} width="50%">
                    <Box flex={1}>{item.food?.name}</Box>
                    <Box>x {item.count}</Box>
                  </HStack>
                ))}
              </VStack>

              {order.address ? (
                <HStack>
                  <Icon as={FiHome} />

                  <Box>
                    {order.address.line1} {order.address.line2} {order.address.city}{' '}
                    {order.address.state} {order.address.country} {order.address.pinCode}
                  </Box>
                </HStack>
              ) : null}
            </Box>

            <HStack px={5} pb={4}>
              <Button colorScheme="brand" onClick={() => push(`/order/${order.id}`)}>
                View Details
              </Button>
              <Button colorScheme="brand" variant="outline">
                Mark as Favourite
              </Button>
            </HStack>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export default memo(UserOrders);
