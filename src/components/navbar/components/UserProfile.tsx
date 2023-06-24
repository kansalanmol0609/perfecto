//libs
import {memo, useCallback} from 'react';
import NextLink from 'next/link';
import {signIn, signOut, useSession} from 'next-auth/react';

//components
import {
  Button,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

const getInitialsImage = (name: string) =>
  `https://ui-avatars.com/api/?background=AA8F66&color=fff&name=${name}`;

const UserProfile = (): JSX.Element => {
  const session = useSession();

  const handleSignOut = useCallback(() => signOut(), []);
  const handleSignIn = useCallback(() => signIn(), []);

  if (session.status !== 'authenticated') {
    return (
      <Button
        colorScheme="brand"
        variant="outline"
        fontSize="xs"
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
      <MenuButton>
        <Image
          alt="User Image"
          src={session.data.user?.image || ''}
          fallbackSrc={getInitialsImage(user?.name || 'User')}
          borderRadius="full"
          height="10"
          borderColor="blue"
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
