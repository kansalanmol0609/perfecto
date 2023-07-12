//libs
import {memo, useCallback} from 'react';
import NextLink from 'next/link';

//components
import {Box, Button, Collapse, Link, useDisclosure} from '@chakra-ui/react';
import {UserProfile} from '../../components/UserProfile';

//hooks
import {useRouter} from 'next/router';
import {useGlobalModalContext, MODAL_TYPES} from '@/contexts/globalModalContext';
import {useSession} from 'next-auth/react';

//icons
import {HamburgerIcon} from '@chakra-ui/icons';

//constants
import {NAVBAR_HEIGHT, ROUTES} from '../../constants';

const Mobile = (): JSX.Element => {
  const {isOpen, onToggle} = useDisclosure();

  const {pathname} = useRouter();

  const {openModal} = useGlobalModalContext();

  const session = useSession();

  const openMakeReservationModal = useCallback(
    () =>
      openModal({
        type: MODAL_TYPES.MAKE_RESERVATION_MODAL,
        payload: {props: {}},
      }),
    [openModal],
  );

  return (
    <Box backgroundColor="black" width="100%" px={12} gap={4}>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height={NAVBAR_HEIGHT}
        gap={4}
      >
        <Box flexGrow={1} color="white" fontSize="lg" fontWeight="black">
          Perfecto
        </Box>

        <Button
          aria-label="Open Navbar"
          variant="unstyled"
          color={isOpen ? 'white' : 'gray'}
          leftIcon={<HamburgerIcon />}
          _hover={{textDecoration: 'none', color: 'white'}}
          display="flex"
          alignItems="center"
          textTransform="uppercase"
          onClick={onToggle}
        >
          Menu
        </Button>
      </Box>

      <Collapse in={isOpen} animateOpacity>
        <Box display="flex" flexDirection="column" alignItems="stretch" gap={4} marginBottom={4}>
          {ROUTES.map(({name, href}) => (
            <NextLink href={href} passHref key={name} legacyBehavior>
              <Link
                fontSize="sm"
                fontWeight="medium"
                color={pathname === href ? 'white' : 'whiteAlpha.600'}
                _hover={{textDecoration: 'none', color: 'white'}}
              >
                {name}
              </Link>
            </NextLink>
          ))}

          {session.status === 'authenticated' ? (
            <Link
              fontSize="sm"
              fontWeight="medium"
              color="whiteAlpha.600"
              _hover={{textDecoration: 'none', color: 'white'}}
              onClick={openMakeReservationModal}
            >
              Book a Table
            </Link>
          ) : null}

          <UserProfile />
        </Box>
      </Collapse>
    </Box>
  );
};

const MemoizedMobile = memo(Mobile);

export {MemoizedMobile as Mobile};
