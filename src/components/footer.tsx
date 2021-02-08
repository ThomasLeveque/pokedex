import React from 'react';
import { Box } from '@chakra-ui/react';
import { useAuth } from '@hooks/useAuth';

const Footer: React.FC = () => {
  const { user } = useAuth();
  return (
    <Box
      as="footer"
      position="fixed"
      bottom="0"
      width="100%"
      backgroundColor="white"
      borderTopWidth="2px"
      textAlign="center"
      fontWeight="bold"
    >
      {user?.pokedexCount} / 151
    </Box>
  );
};

export default Footer;
