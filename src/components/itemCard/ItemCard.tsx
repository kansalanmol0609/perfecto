//libs
import {memo} from 'react';

//components
import {Box, Button, Image} from '@chakra-ui/react';

//types
import {FoodItem} from '@/types/FoodItem';

type Props = {
  item: FoodItem;
};

const ItemCard = ({item}: Props): JSX.Element => {
  return (
    <Box display="flex" borderWidth={1} borderStyle="solid" borderColor="black.400" width="full">
      <Image
        src={item.primaryImageUrl}
        alt={item.description}
        width="50%"
        objectFit="cover"
        _hover={{
          scale: 1.2,
        }}
      />

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        gap={2}
        p={4}
        flex={1}
        backgroundColor="white"
      >
        <Box display="flex" flexDirection="column" gap={2} backgroundColor="white">
          <Box display="flex" gap={2}>
            <Box fontWeight="bold" fontSize="lg">
              {item.title}
            </Box>
            <Box color="brand.500" fontWeight="semibold">
              ${item.pricePerUnit}
            </Box>
          </Box>

          <Box>{item.description}</Box>
        </Box>

        <Button colorScheme="brand" aria-label="Order now" borderRadius={0}>
          Order now
        </Button>
      </Box>
    </Box>
  );
};

const MemoizedItemCard = memo(ItemCard);

export {MemoizedItemCard as ItemCard};
