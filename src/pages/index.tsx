//libs
import Head from 'next/head';

//components
import {Box} from '@chakra-ui/react';
import {CarouselSection} from '@/components/carouselSection';
import {AboutSection} from '@/modules/homePage/sections/AboutSection';
import {StatsSection} from '@/modules/homePage/sections/StatsSection';
import {SpecialtiesSection} from '@/modules/homePage/sections/SpecialtiesSection';
import {MakeReservationSection} from '@/modules/homePage/sections/MakeReservationSection';
import {RecentBlogPostsSection} from '@/modules/homePage/sections/RecentBlogPostsSection';

//constants
import {HOME_PAGE_CAROUSEL_CARDS, STATS} from '@/modules/homePage/constants';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main" height="100vh">
        <CarouselSection cards={HOME_PAGE_CAROUSEL_CARDS} />
        <AboutSection />
        <StatsSection stats={STATS} />
        <SpecialtiesSection />
        <MakeReservationSection />
        <RecentBlogPostsSection />
      </Box>
    </>
  );
}
