//components
import {Box} from '@chakra-ui/react';
import {MakeReservationForm} from '@/components/makeReservationForm';

const MakeReservationSection = (): JSX.Element => {
  return (
    <Box
      width="full"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundAttachment="fixed"
      backgroundImage="https://preview.colorlib.com/theme/feliciano/images/bg_3.jpg.webp"
      px={4}
      py={12}
    >
      <Box maxWidth={1100} mx="auto">
        <MakeReservationForm />
      </Box>
    </Box>
  );
};

export {MakeReservationSection};
