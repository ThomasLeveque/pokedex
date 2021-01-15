import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import AuthProvider from '@hooks/useAuth';
import AuthLoading from '@components/auth-loading';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <AuthProvider>
        <AuthLoading>
          <Component {...pageProps} />
        </AuthLoading>
      </AuthProvider>
    </>
  );
};

export default MyApp;
