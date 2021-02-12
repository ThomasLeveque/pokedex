import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import AuthProvider from '@hooks/useAuth';
import AuthLoading from '@components/auth-loading';

import { colors } from '@theme/colors';
import { Button } from '@theme/button';
import { Input } from '@theme/input';
import { Divider } from '@theme/divider';
import { Fonts } from '@theme/fonts';

const theme = extendTheme({
  colors,
  fonts: {
    heading: 'Work Sans',
    body: 'Work Sans',
  },
  components: {
    Button,
    Input,
    Divider,
  },
});

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Fonts />
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <AuthProvider>
        <AuthLoading>
          <Component {...pageProps} />
        </AuthLoading>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;
