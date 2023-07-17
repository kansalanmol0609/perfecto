//libs
import {memo, useCallback} from 'react';
import NextLink from 'next/link';
import {signIn, signOut, useSession} from 'next-auth/react';

//components
import {
  Avatar,
  Button,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

//icons
import {BsFillPersonFill} from 'react-icons/bs';

const UserProfile = (): JSX.Element => {
  const session = useSession();

  const handleSignOut = useCallback(() => signOut(), []);
  const handleSignIn = useCallback(() => signIn(), []);

  if (session.status !== 'authenticated') {
    return (
      <Button
        colorScheme="brand"
        fontSize="sm"
        display="flex"
        textAlign="start"
        onClick={handleSignIn}
        isLoading={session.status === 'loading'}
        leftIcon={<BsFillPersonFill size="24" />}
      >
        Sign In
      </Button>
    );
  }

  const user = session.data.user;

  return (
    <Menu>
      <MenuButton color="white" _hover={{color: 'brand.500'}}>
        <Icon as={BsFillPersonFill} ml={-2} boxSize={{base: 4, md: 8}} />
      </MenuButton>
      <MenuList>
        <MenuGroup title={user?.name || 'User'}>
          <NextLink href="/profile" passHref>
            <MenuItem>
              <Link _hover={{textDecoration: 'none'}}>View Profile</Link>
            </MenuItem>
          </NextLink>

          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

const MemoizedUserProfile = memo(UserProfile);

export {MemoizedUserProfile as UserProfile};
