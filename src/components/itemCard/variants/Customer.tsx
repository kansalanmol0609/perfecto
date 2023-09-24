//libs
import {memo, useCallback} from 'react';
import Dinero from 'dinero.js';

//components
import {Box, Button, IconButton, Image, Spinner} from '@chakra-ui/react';

//hooks
import {useFoodCountMap} from '@/hooks/useFoodCountMap';
import {useAddFoodItemInCart} from '@/hooks/useAddFoodItemInCart';
import {useRemoveFoodItemFromCart} from '@/hooks/useRemoveFoodItemFromCart';

//types
import {Food} from '@prisma/client';

//icons
import {AddIcon, MinusIcon} from '@chakra-ui/icons';

const FoodItemCard = ({item}: {item: Food}): JSX.Element => {
  const {foodCountMap, loading} = useFoodCountMap();

  const count = foodCountMap?.[item.id] ?? 0;

  const {addItemInCart, loading: isAddingItemInCart} = useAddFoodItemInCart();
  const {removeItemFromCart, loading: isRemovingItemFromCart} = useRemoveFoodItemFromCart();

  const handleAddItemInCart = useCallback(
    () => addItemInCart({variables: {foodId: item.id}}),
    [addItemInCart, item.id],
  );

  const handleRemoveItemFromCart = useCallback(
    () => removeItemFromCart({variables: {foodId: item.id}}),
    [item.id, removeItemFromCart],
  );

  const isUpdatingCart = isAddingItemInCart || isRemovingItemFromCart;

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

        {count ? (
          <Box display="flex" gap={0} alignItems="center" width="full">
            <Box
              display="flex"
              gap={0}
              alignItems="center"
              width={{base: '75%', md: '64%'}}
              borderColor="blackAlpha.500"
              borderStyle="solid"
              borderWidth={1}
            >
              <IconButton
                colorScheme="brand"
                variant="solid"
                aria-label="Add Item"
                onClick={handleRemoveItemFromCart}
                disabled={isUpdatingCart}
              >
                <MinusIcon />
              </IconButton>

              <Box flex={1} textAlign="center" fontWeight="semibold">
                {count}
              </Box>

              <IconButton
                colorScheme="brand"
                variant="solid"
                aria-label="Add"
                icon={<AddIcon />}
                onClick={handleAddItemInCart}
                disabled={isUpdatingCart}
              />
            </Box>
            {isUpdatingCart ? <Spinner ml={4} /> : null}
          </Box>
        ) : (
          <Button
            isLoading={loading || isUpdatingCart}
            loadingText={isUpdatingCart ? 'Add To Cart' : ''}
            colorScheme="brand"
            aria-label="Order now"
            variant="solid"
            fontSize={{sm: 'xs', md: 'sm'}}
            onClick={handleAddItemInCart}
          >
            Add To Cart
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default memo(FoodItemCard);
