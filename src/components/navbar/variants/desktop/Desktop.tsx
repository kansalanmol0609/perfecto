//libs
import {memo, useCallback} from 'react';
import NextLink from 'next/link';

//components
import {Box, Center, Divider, HStack} from '@chakra-ui/react';
import {Link} from '@chakra-ui/react';
import {UserProfile} from '../../components/UserProfile';
import {Cart} from '../../components/cart';

//hooks
import {useRouter} from 'next/router';
import {useGlobalModalContext, MODAL_TYPES} from '@/contexts/globalModalContext';
import {useSession} from 'next-auth/react';

//constants
import {NAVBAR_HEIGHT, ROUTES} from '../../constants';

const Desktop = (): JSX.Element => {
  const {pathname} = useRouter();
  const session = useSession();

  const {openModal} = useGlobalModalContext();

  const openMakeReservationModal = useCallback(
    () =>
      openModal({
        type: MODAL_TYPES.MAKE_RESERVATION_MODAL,
        payload: {props: {}},
      }),
    [openModal],
  );

  return (
    <Box
      position="absolute"
      width="100%"
      borderBottomWidth={1}
      borderBottomStyle="solid"
      borderBottomColor="blackAlpha.200"
      px={4}
      gap={4}
      zIndex={999}
      backgroundColor="blackAlpha.500"
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
            <NextLink href={href} passHref key={name} legacyBehavior>
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

          {session.status === 'authenticated' ? (
            <Link
              fontSize="sm"
              fontWeight="medium"
              color="white"
              _hover={{textDecoration: 'none', color: 'brand.500'}}
              onClick={openMakeReservationModal}
            >
              Book a Table
            </Link>
          ) : null}

          <Center height="10">
            <Divider orientation="vertical" />
          </Center>

          <HStack display="flex">
            <Cart />
            <UserProfile />
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

const MemoizedDesktop = memo(Desktop);

export {MemoizedDesktop as Desktop};
