//libs
import {memo} from 'react';
import Dinero from 'dinero.js';

//components
import {Box, Button, Image} from '@chakra-ui/react';

//types
import {Food} from '@prisma/client';

// eslint-disable-next-line react/display-name
const FoodItemCard = memo(({item}: {item: Food}): JSX.Element => {
  return (
    <Box display="flex" borderWidth={1} borderStyle="solid" borderColor="black.400" width="full">
      <Image
        src={`https://preview.colorlib.com/theme/feliciano/images/${item.category.toLowerCase()}-${
          (+item.name.length % 5) + 1
        }.jpg.webp`}
        alt={item.name}
        width="50%"
        objectFit="cover"
        _hover={{
          scale: 1.2,
        }}
      />

      <Box
        width="50%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        gap={2}
        p={4}
        flex={1}
        backgroundColor="white"
      >
        <Box display="flex" flexDirection="column" gap={2} backgroundColor="white">
          <Box display="flex" gap={2} justifyContent="space-between">
            <Box fontWeight="bold" fontSize={{sm: 'sm', md: 'lg'}}>
              {item.name}
            </Box>
            <Box color="brand.500" mt="0.5" fontWeight="semibold" fontSize={{sm: 'sm'}}>
              {Dinero({
                //@ts-ignore
                amount: +item.price?.amount * 100,
                //@ts-ignore
                currency: item.price?.currency,
              }).toFormat()}
            </Box>
          </Box>

          <Box fontSize={{sm: 'sm'}}>{item.description}</Box>
        </Box>

        <Button colorScheme="brand" aria-label="Order now" variant="solid" fontSize={{sm: 'sm'}}>
          Order now
        </Button>
      </Box>
    </Box>
  );
});

export default memo(FoodItemCard);
