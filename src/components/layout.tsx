import React from 'react';

import Header from '@components/header';
import { useAuth } from '@hooks/useAuth';
import Redirect from './redirect';
import { Box, useColorModeValue } from '@chakra-ui/react';
import Footer from './footer';

const Layout: React.FC = ({ children }) => {
  const { user, userLoaded } = useAuth();
  const bg = useColorModeValue('gray.100', 'gray.900');

  if (!user && userLoaded) {
    return <Redirect to="/" />;
  }

  return (
    <Box bg={bg} minH="100vh">
      <Header />
      <Box as="main" ml="6rem" px="8" pt="8" pb="3rem">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
