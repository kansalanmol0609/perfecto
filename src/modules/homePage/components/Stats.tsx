//libs
import {memo} from 'react';

//components
import {Box} from '@chakra-ui/react';

type Props = {
  stats: Array<{
    label: string;
    value: number;
  }>;
};

const Stats = ({stats}: Props): JSX.Element => {
  return (
    <Box
      maxWidth={1100}
      mx="auto"
      my={12}
      px={4}
      display="flex"
      flexDirection={{md: 'row', sm: 'column'}}
      alignItems="center"
      justifyContent="space-between"
      gap={8}
    >
      <Box
        width="70%"
        display="flex"
        flexDirection={{md: 'row', sm: 'column'}}
        alignItems="center"
        justifyContent="space-between"
        gap={8}
      >
        {stats.map((stat) => (
          <Box key={stat.label} textAlign="center">
            <Box color="brand.500" fontWeight="bold" fontSize="3xl">
              {stat.value}
            </Box>
            <Box color="gray.600" fontSize="sm" textTransform="uppercase">
              {stat.label}
            </Box>
          </Box>
        ))}
      </Box>

      <Box color="gray.600" flex={1}>
        A small river named Duden flows by their place and supplies it with the necessary
        regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your
        mouth.
      </Box>
    </Box>
  );
};

const MemoizedStats = memo(Stats);
export {MemoizedStats as Stats};
