import React from 'react';

import Header from '@components/header';
import { useAuth } from '@hooks/useAuth';
import Redirect from './redirect';
import { Box, Container } from '@chakra-ui/react';

const Layout: React.FC = ({ children }) => {
  const { user, userLoaded } = useAuth();

  if (!user && userLoaded) {
    return <Redirect to="/" />;
  }

  return (
    <Box backgroundColor="gray.100" minH="100vh">
      <Header />
      <Container maxW="7xl" py="8">
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
