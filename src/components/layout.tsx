import React from 'react';

import Header from '@components/header';
import { useAuth } from '@hooks/useAuth';
import Redirect from './redirect';
import { Box, Container } from '@chakra-ui/react';
import Footer from './footer';

const Layout: React.FC = ({ children }) => {
  const { user, userLoaded } = useAuth();

  if (!user && userLoaded) {
    return <Redirect to="/" />;
  }

  return (
    <Box backgroundColor="gray.100" minH="100vh">
      <Header />
      <Container maxW="6xl" pt="8" pb="12">
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
