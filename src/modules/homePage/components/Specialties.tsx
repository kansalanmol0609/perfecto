//libs
import {memo} from 'react';

//fonts
import {Great_Vibes} from 'next/font/google';

//components
import {Box} from '@chakra-ui/react';
import {FOOD_ITEMS} from '../constants';
import {ItemCard} from '@/components/itemCard';

const greatVibesFont = Great_Vibes({
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
});

type Props = {};

const Specialties = ({}: Props): JSX.Element => {
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

        <Box display="grid" gridTemplateColumns={{md: 'repeat(2, 1fr)', sm: '1fr'}}>
          {FOOD_ITEMS.map((foodItem) => (
            <ItemCard key={foodItem.id} item={foodItem} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const MemoizedSpecialties = memo(Specialties);
export {MemoizedSpecialties as Specialties};
