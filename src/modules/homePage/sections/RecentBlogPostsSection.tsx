//libs
import {memo} from 'react';

//fonts
import {Great_Vibes} from 'next/font/google';

//components
import {Box} from '@chakra-ui/react';
import {BlogCard} from '@/components/blogCard';

//constants
import {BLOGS} from '../constants';

const greatVibesFont = Great_Vibes({
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
});

type Props = {};

const RecentBlogPostsSection = ({}: Props): JSX.Element => {
  return (
    <Box backgroundColor="blackAlpha.100">
      <Box
        maxWidth={1100}
        mx="auto"
        px={4}
        py={12}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box fontSize="7xl" color="brand.500" className={greatVibesFont.className}>
            Recent
          </Box>

          <Box color="black" fontSize="5xl" fontWeight="bold" lineHeight="shorter" mt={-16}>
            Blog Posts
          </Box>
        </Box>

        <Box display="grid" gridTemplateColumns={{md: 'repeat(3, 1fr)', sm: '1fr'}} gap={4} my={20}>
          {BLOGS.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const MemoizedRecentBlogPostsSection = memo(RecentBlogPostsSection);
export {MemoizedRecentBlogPostsSection as RecentBlogPostsSection};
