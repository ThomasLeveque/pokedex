import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { SWRConfig } from 'swr';

import AuthProvider from '@hooks/useAuth';
import AuthLoading from '@components/auth-loading';

import { colors } from '@theme/colors';
import { Button } from '@theme/button';

const theme = extendTheme({
  colors,
  components: {
    Button,
  },
});

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <SWRConfig
        value={{
          revalidateOnFocus: true,
          revalidateOnMount: false,
        }}
      >
        <AuthProvider>
          <AuthLoading>
            <Component {...pageProps} />
          </AuthLoading>
        </AuthProvider>
      </SWRConfig>
    </ChakraProvider>
  );
};

export default MyApp;
