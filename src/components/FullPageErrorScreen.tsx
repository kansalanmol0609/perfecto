//libs
import {useCallback} from 'react';

//icons
import {WarningTwoIcon} from '@chakra-ui/icons';

//components
import {Box, Button} from '@chakra-ui/react';

export const FullPageErrorScreen = ({refetch}: {refetch?: () => void}) => {
  const handleRefetch = useCallback(() => refetch?.(), [refetch]);

  return (
    <Box
      width="full"
      height="50vh"
      display="flex"
      flexDirection="column"
      gap={2}
      alignItems="center"
      justifyContent="center"
    >
      <WarningTwoIcon boxSize="40" color="brand.500" />
      <Box>An Error Occurred while fetching Data!</Box>

      {refetch ? (
        <Button variant="outline" colorScheme="brand" fontSize="md" mt={4} onClick={handleRefetch}>
          Reload
        </Button>
      ) : null}
    </Box>
  );
};
