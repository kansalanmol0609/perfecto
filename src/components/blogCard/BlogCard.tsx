//libs
import {memo} from 'react';

//components
import {Box, Image, Link} from '@chakra-ui/react';

//icons
import {ChatIcon} from '@chakra-ui/icons';

//types
import {Blog} from '@/types/Blog';

type Props = {
  blog: Blog;
};

const BlogCard = ({blog}: Props): JSX.Element => {
  return (
    <Box
      borderWidth={1}
      borderStyle="solid"
      borderColor="black.400"
      width="full"
      display="flex"
      flexDirection="column"
    >
      <Image src={blog.thumbnailUrl} alt={blog.title} width="full" height={64} objectFit="cover" />

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        flex={1}
        gap={2}
        p={8}
        backgroundColor="white"
      >
        <Box color="blackAlpha.600" fontSize="sm" fontWeight="semibold">
          {new Date(blog.createdOn).toISOString().split('T')[0]}
        </Box>

        <Box fontWeight="bold" fontSize="lg">
          {blog.title}
        </Box>

        <Box display="flex" gap={4} justifyContent="space-between">
          <Link color="brand.500" fontSize="sm">
            Read More
          </Link>
          <Box fontSize="sm" color="blackAlpha.600">
            <ChatIcon mr={1} />
            {blog.comments.length}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const MemoizedBlogCard = memo(BlogCard);
export {MemoizedBlogCard as BlogCard};
