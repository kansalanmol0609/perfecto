//libs
import {memo} from 'react';

//fonts
import {Great_Vibes} from 'next/font/google';

//components
import {Box, Image} from '@chakra-ui/react';

const greatVibesFont = Great_Vibes({
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
});

const AboutSection = (): JSX.Element => {
  return (
    <Box
      maxWidth={1100}
      mx="auto"
      my={12}
      display="flex"
      px={4}
      gap={8}
      flexDirection={{md: 'row', sm: 'column'}}
    >
      <Box display="flex" gap={4} flex={1}>
        <Image
          src="https://preview.colorlib.com/theme/feliciano/images/about.jpg"
          flex={1}
          objectFit="cover"
          width="48%"
          height={500}
          mt={-2}
          alt=""
        />

        <Image
          src="https://preview.colorlib.com/theme/feliciano/images/about-1.jpg"
          flex={1}
          objectFit="cover"
          width="48%"
          height={500}
          mt={2}
          alt=""
        />
      </Box>

      <Box flex={1} display="flex" flexDirection="column" alignItems="flex-start" gap={4}>
        <Box fontSize="7xl" color="brand.500" className={greatVibesFont.className}>
          About
        </Box>

        <Box color="black" fontSize="5xl" fontWeight="bold" lineHeight="shorter" mt={-20}>
          Pefecto Restaurant
        </Box>

        <Box color="gray.600">
          A small river named Duden flows by their place and supplies it with the necessary
          regelialia. It is a paradisematic country, in which roasted parts of sentences fly into
          your mouth.
        </Box>

        <Box display="flex" gap={1}>
          <Box color="gray.600">Mon - Fri</Box>
          <Box color="gray.600" fontWeight="bold">
            8 AM - 11 PM
          </Box>
        </Box>

        <Box color="brand.500" fontWeight="bold" fontSize="3xl" as="a" href="tel:+19781234567">
          + 1-978-123-4567
        </Box>
      </Box>
    </Box>
  );
};

const MemoizedAboutSection = memo(AboutSection);
export {MemoizedAboutSection as AboutSection};
