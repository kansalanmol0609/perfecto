//libs
import {memo} from 'react';

//components
import {Box} from '@chakra-ui/react';
import FoodItemCard from '@/components/itemCard/variants/Admin';

//types
import {Food} from '@prisma/client';

type Props = {
  foodItems: Food[];
};

const FoodItemsGrid = ({foodItems}: Props): JSX.Element => {
  return (
    <Box
      maxWidth="5xl"
      mx="auto"
      display="grid"
      gridTemplateColumns={{md: 'repeat(2, 1fr)', sm: '1fr'}}
      gap={8}
    >
      {foodItems.map((foodItem) => (
        <FoodItemCard key={foodItem.id} item={foodItem} />
      ))}
    </Box>
  );
};

export default memo(FoodItemsGrid);
