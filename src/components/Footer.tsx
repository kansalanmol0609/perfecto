//libs
import {memo} from 'react';

//components
import {Box, Button, Icon, Input} from '@chakra-ui/react';

//icons
import {FaFacebookF, FaInstagram, FaTwitter} from 'react-icons/fa';

const Footer = (): JSX.Element => {
  return (
    <Box width="full" backgroundColor="black">
      <Box
        maxWidth={1100}
        mx="auto"
        px={4}
        py={8}
        display="grid"
        gridTemplateColumns={{md: 'repeat(3, 1fr)', sm: '1fr'}}
        gap={8}
        my={20}
        color="white"
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Box fontSize="md" fontWeight="bold">
            Perfecto
          </Box>
          <Box color="whiteAlpha.600" fontSize="sm" fontWeight="semibold">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
            there live the blind texts.
          </Box>
          <Box display="flex" gap={2}>
            <Icon
              as={FaTwitter}
              color="white"
              borderRadius="full"
              backgroundColor="whiteAlpha.300"
              w={8}
              h={8}
              p={2}
            />
            <Icon
              as={FaInstagram}
              color="white"
              borderRadius="full"
              backgroundColor="whiteAlpha.300"
              w={8}
              h={8}
              p={2}
            />
            <Icon
              as={FaFacebookF}
              color="white"
              borderRadius="full"
              backgroundColor="whiteAlpha.300"
              w={8}
              h={8}
              p={2}
            />
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          <Box fontSize="md" fontWeight="bold">
            Open Hours
          </Box>

          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              color="whiteAlpha.600"
              fontSize="sm"
              fontWeight="semibold"
            >
              <Box>Monday</Box>
              <Box>9:00 - 24:00</Box>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              color="whiteAlpha.600"
              fontSize="sm"
              fontWeight="semibold"
            >
              <Box>Tuesday</Box>
              <Box>9:00 - 24:00</Box>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              color="whiteAlpha.600"
              fontSize="sm"
              fontWeight="semibold"
            >
              <Box>Wednesday</Box>
              <Box>9:00 - 24:00</Box>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              color="whiteAlpha.600"
              fontSize="sm"
              fontWeight="semibold"
            >
              <Box>Thursday</Box>
              <Box>9:00 - 24:00</Box>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              color="whiteAlpha.600"
              fontSize="sm"
              fontWeight="semibold"
            >
              <Box>Friday</Box>
              <Box>9:00 - 24:00</Box>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              color="whiteAlpha.600"
              fontSize="sm"
              fontWeight="semibold"
            >
              <Box>Saturday</Box>
              <Box>9:00 - 24:00</Box>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              color="whiteAlpha.600"
              fontSize="sm"
              fontWeight="semibold"
            >
              <Box>Sunday</Box>
              <Box>9:00 - 24:00</Box>
            </Box>
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" gap={1}>
          <Box fontSize="md" fontWeight="bold">
            Newsletter
          </Box>
          <Box color="whiteAlpha.600" fontSize="sm" fontWeight="semibold" mb={4}>
            Far far away, behind the word mountains, far from the countries.
          </Box>
          <Input type="email" placeholder="Enter email address" variant="filled" />
          <Button variant="solid" colorScheme="brand" mt={2}>
            Subscribe
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const MemoizedFooter = memo(Footer);
export {MemoizedFooter as Footer};
