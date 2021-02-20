import React from 'react';

import Nav from '@components/nav';
import { useAuth } from '@hooks/useAuth';
import Redirect from './redirect';
import { Box, useColorModeValue } from '@chakra-ui/react';
import Footer from './footer';
import { navWidth, progressBarHeight } from '@utils/constants';

const Layout: React.FC = ({ children }) => {
  const { user, userLoaded } = useAuth();
  const bg = useColorModeValue('gray.100', 'gray.900');

  if (!user && userLoaded) {
    return <Redirect to="/" />;
  }

  return (
    <Box bg={bg} minH="100vh">
      <Nav />
      <Box as="main" ml={navWidth} px="8" pt="8" pb={`calc(2rem + ${progressBarHeight})`}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
