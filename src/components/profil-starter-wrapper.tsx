import { Center } from '@chakra-ui/react';
import React from 'react';

const ProfilStarterWrapper: React.FC = ({ children }) => {
  return (
    <Center
      bg="white"
      borderWidth="2px"
      borderRadius="md"
      padding="8"
      maxW="300px"
      w="100%"
      ml="8"
      flexDirection="column"
    >
      {children}
    </Center>
  );
};

export default ProfilStarterWrapper;
