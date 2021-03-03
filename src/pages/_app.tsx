import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';

import AuthLoading from '@components/auth-loading';
import AuthProvider from '@hooks/useAuth';
import { Fonts } from '@theme/fonts';
import { theme } from '@theme/index';
import { GlobalStyle } from '@theme/global-style';
import BackToTop from '@components/back-to-top';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Fonts />
      <GlobalStyle />
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <AuthProvider>
        <AuthLoading>
          <Component {...pageProps} />
          <BackToTop />
        </AuthLoading>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;
