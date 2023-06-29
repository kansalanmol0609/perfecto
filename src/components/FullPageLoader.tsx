//components
import {Box, Spinner} from '@chakra-ui/react';

export const FullPageLoader = () => (
  <Box width="full" height="50vh" display="flex" alignItems="center" justifyContent="center">
    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="brand.500" size="xl" />
  </Box>
);
