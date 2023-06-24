//libs
import {Poppins} from 'next/font/google';
import {getServerSession} from 'next-auth/next';

//utils
import {authOptions} from './api/auth/[...nextauth]';

//contexts
import {Box, ChakraProvider} from '@chakra-ui/react';
import {GlobalModalContextProvider} from '@/contexts/globalModalContext';
import {ApolloProvider} from '@apollo/client';
import {SessionProvider} from 'next-auth/react';

//components
import {Navbar} from '@/components/navbar';
import {Footer} from '@/components/Footer';

//hooks
import {useApollo} from '@/libs/apolloClient';

//constants
import {THEME} from '@/styles/themes';

//types
import type {PageProps} from '@/types/PageProps';
import type {ComponentType} from 'react';
import type {Session} from 'next-auth';
import type {NextApiRequest, NextApiResponse} from 'next';

//styles
import '@/styles/globals.css';

// If loading a variable font, you don't need to specify the font weight
const poppins = Poppins({
  subsets: ['devanagari', 'latin', 'latin-ext'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

function App({
  Component,
  pageProps: {session, ...pageProps} = {},
}: {
  pageProps: PageProps & {session?: Session};
  Component: ComponentType<PageProps>;
}) {
  const apolloClient = useApollo(pageProps);

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <ChakraProvider theme={THEME}>
          <GlobalModalContextProvider>
            <Box className={poppins.className}>
              <Navbar />
              <Box display="flex" flexDirection="column" height="100vh">
                <Component {...pageProps} />
                <Footer />
              </Box>
            </Box>
          </GlobalModalContextProvider>
        </ChakraProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

App.getServerSideProps = async ({ctx}: {ctx: {req: NextApiRequest; res: NextApiResponse}}) => {
  return {
    props: {
      session: await getServerSession(ctx.req, ctx.res, authOptions),
    },
  };
};

export default App;
