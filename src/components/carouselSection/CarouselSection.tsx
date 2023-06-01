//libs
import {memo, useState, useCallback} from 'react';
import Slider from 'react-slick';

//fonts
import {Great_Vibes} from 'next/font/google';

//components
import {Box, IconButton, Stack, Text} from '@chakra-ui/react';

//icons
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';

//types
import {CarouselCard} from './types';

const greatVibesFont = Great_Vibes({
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
});

type Props = {
  cards: Array<CarouselCard>;
};

const CarouselSection = ({cards}: Props): JSX.Element => {
  const [slider, setSlider] = useState<Slider | null>(null);

  const goToPreviousSlide = useCallback(() => slider?.slickPrev(), [slider]);

  const goToNextSlide = useCallback(() => slider?.slickNext(), [slider]);

  return (
    <Box position="relative" height="400px" width="full" overflow="hidden">
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      <IconButton
        aria-label="Go to Previous Slide"
        variant="unstyled"
        position="absolute"
        left={4}
        top="50%"
        zIndex={2}
        onClick={goToPreviousSlide}
        color="whiteAlpha.700"
      >
        <ChevronLeftIcon fontSize="4xl" />
      </IconButton>

      <IconButton
        aria-label="Go to Next Slide"
        variant="unstyled"
        position="absolute"
        right={4}
        top="50%"
        zIndex={2}
        onClick={goToNextSlide}
        color="whiteAlpha.700"
      >
        <ChevronRightIcon fontSize="4xl" />
      </IconButton>

      <Slider arrows={false} fade infinite autoplay speed={500} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            height={'400px'}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}
            width="full"
            display="flex"
            alignItems="center"
          >
            <Stack
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              height="full"
              backgroundColor="blackAlpha.700"
            >
              <Box
                fontSize={{sm: 60, md: 100}}
                color="brand.500"
                className={greatVibesFont.className}
              >
                {card.title}
              </Box>
              <Text
                fontSize={{sm: 20, md: 50}}
                color="white"
                textTransform="uppercase"
                fontWeight="bold"
              >
                {card.text}
              </Text>
            </Stack>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

const MemoizedCarouselSection = memo(CarouselSection);
export {MemoizedCarouselSection as CarouselSection};
