//hooks
import {useMediaQuery} from '@chakra-ui/react';

export const useIsMobileDevice = (): boolean => {
  const [isMobileDevice] = useMediaQuery('(max-width: 768px)');

  return isMobileDevice;
};
