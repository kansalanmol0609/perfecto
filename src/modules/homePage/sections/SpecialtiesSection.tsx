//libs
import {memo} from 'react';
import {gql, useQuery} from '@apollo/client';

//fonts
import {Great_Vibes} from 'next/font/google';

//components
import {Box} from '@chakra-ui/react';
import {FullPageLoader} from '@/components/FullPageLoader';
import {FullPageErrorScreen} from '@/components/FullPageErrorScreen';
import FoodItemCard from '@/components/itemCard/variants/Customer';

//types
import {Food} from '@prisma/client';

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

const greatVibesFont = Great_Vibes({
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
});

type Props = {};

const SpecialtiesSection = ({}: Props): JSX.Element => {
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
    <Box backgroundColor="brand.300">
      <Box
        maxWidth={1100}
        mx="auto"
        mt={12}
        py={12}
        px={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        gap={8}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box fontSize="7xl" color="brand.500" className={greatVibesFont.className}>
            Specialties
          </Box>

          <Box color="black" fontSize="5xl" fontWeight="bold" lineHeight="shorter" mt={-16}>
            Our Menu
          </Box>
        </Box>

        <Box display="grid" gridTemplateColumns={{md: 'repeat(2, 1fr)', sm: '1fr'}} gap={4}>
          {data?.readFoodItems.slice(0, 6).map((foodItem) => (
            <FoodItemCard key={foodItem.id} item={foodItem} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const MemoizedSpecialtiesSection = memo(SpecialtiesSection);
export {MemoizedSpecialtiesSection as SpecialtiesSection};
