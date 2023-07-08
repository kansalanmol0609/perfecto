//libs
import {memo, useCallback} from 'react';
import NextLink from 'next/link';
import {signIn, signOut, useSession} from 'next-auth/react';

//components
import {
  Avatar,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

const UserProfile = (): JSX.Element => {
  const session = useSession();

  const handleSignOut = useCallback(() => signOut(), []);
  const handleSignIn = useCallback(() => signIn(), []);

  if (session.status !== 'authenticated') {
    return (
      <Button
        colorScheme="brand"
        fontSize="sm"
        display="inline-block"
        textAlign="start"
        onClick={handleSignIn}
        isLoading={session.status === 'loading'}
      >
        Sign In
      </Button>
    );
  }

  const user = session.data.user;

  return (
    <Menu>
      <MenuButton textAlign="left">
        <Avatar
          src={session.data.user?.image || ''}
          name={user?.name ?? 'User'}
          size="sm"
          borderRadius={0}
        />
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
