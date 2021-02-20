import React, { memo } from 'react';
import { Center, useColorModeValue } from '@chakra-ui/react';

const ProfilStarterWrapper: React.FC = memo(({ children }) => {
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Center
      bg={bg}
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
});

export default ProfilStarterWrapper;
