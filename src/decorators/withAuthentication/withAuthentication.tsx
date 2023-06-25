//libs
import {ComponentType, useCallback} from 'react';
import {signIn, useSession} from 'next-auth/react';

//components
import {Box, Button, Spinner} from '@chakra-ui/react';
import {LockIcon} from '@chakra-ui/icons';

//types
import {Role} from '@prisma/client';

export enum ROUTE_TYPE {
  ADMIN = 'ADMIN',
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}

export const withAuthentication =
  ({routeType}: {routeType: ROUTE_TYPE}) =>
  <T extends object>(WrappedComponent: ComponentType<T>) => {
    const Component = (props: T): JSX.Element => {
      const session = useSession();

      const handleSignIn = useCallback(() => signIn(), []);

      if (routeType === ROUTE_TYPE.PUBLIC) {
        return <WrappedComponent {...props} />;
      }

      if (session.status === 'loading') {
        return (
          <Box
            width="full"
            height="50vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="brand.500"
              size="xl"
            />
          </Box>
        );
      }

      if (session.status !== 'authenticated') {
        return (
          <Box
            width="full"
            height="70vh"
            display="flex"
            flexDirection="column"
            gap={2}
            alignItems="center"
            justifyContent="center"
          >
            <LockIcon boxSize="40" color="brand.500" />
            <Box>You must be authenticated to view this Page!</Box>

            <Button
              variant="outline"
              colorScheme="brand"
              fontSize="md"
              mt={4}
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </Box>
        );
      }

      if (routeType === ROUTE_TYPE.PRIVATE) {
        return <WrappedComponent {...props} />;
      }

      if (session.data.user?.role !== Role.ADMIN) {
        return (
          <Box
            width="full"
            height="50vh"
            display="flex"
            flexDirection="column"
            gap={2}
            alignItems="center"
            justifyContent="center"
          >
            <LockIcon boxSize="40" color="brand.500" />
            <Box>Only Admins are allowed to access this Page!</Box>
          </Box>
        );
      }

      return <WrappedComponent {...props} />;
    };

    Component.displayName = `withAuthentication(${WrappedComponent.displayName ?? 'Component'})`;

    return Component;
  };
