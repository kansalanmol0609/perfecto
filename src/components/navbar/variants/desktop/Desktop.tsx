//libs
import {memo} from 'react';
import NextLink from 'next/link';

//components
import {Box, Button} from '@chakra-ui/react';
import {Link} from '@chakra-ui/react';

//hooks
import {useRouter} from 'next/router';

//constants
import {NAVBAR_HEIGHT, ROUTES} from '../../constants';

const Desktop = (): JSX.Element => {
  const {pathname} = useRouter();

  return (
    <Box
      position="absolute"
      width="100%"
      borderBottomWidth={1}
      borderBottomStyle="solid"
      borderBottomColor="blackAlpha.200"
      px={4}
      gap={4}
    >
      <Box
        maxWidth={1100}
        mx="auto"
        height={NAVBAR_HEIGHT}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box flexGrow={1} color="white" fontSize="lg" fontWeight="black">
          Perfecto
        </Box>

        <Box display="flex" alignItems="center" gap={8}>
          {ROUTES.map(({name, href}) => (
            <NextLink href={href} passHref key={name}>
              <Link
                fontSize="sm"
                fontWeight="medium"
                color={pathname === href ? 'brand.500' : 'white'}
                _hover={{textDecoration: 'none', color: 'brand.500'}}
              >
                {name}
              </Link>
            </NextLink>
          ))}

          <Button colorScheme="brand" fontSize="xs">
            Book a Table
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const MemoizedDesktop = memo(Desktop);

export {MemoizedDesktop as Desktop};