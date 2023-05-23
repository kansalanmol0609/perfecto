//libs
import {Poppins} from 'next/font/google';

//contexts
import {Box, ChakraProvider} from '@chakra-ui/react';
import {GlobalModalContextProvider} from '@/contexts/globalModalContext';

//components
import {Navbar} from '@/components/navbar';
import {Footer} from '@/components/Footer';

//constants
import {THEME} from '@/styles/themes';

//types
import type {AppProps} from 'next/app';

//styles
import '@/styles/globals.css';

// If loading a variable font, you don't need to specify the font weight
const poppins = Poppins({
  subsets: ['devanagari', 'latin', 'latin-ext'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function App({Component, pageProps}: AppProps) {
  return (
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
  );
}
