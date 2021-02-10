import React, { memo } from 'react';
import { Box, Tooltip } from '@chakra-ui/react';
import { useAuth } from '@hooks/useAuth';

const Footer: React.FC = memo(() => {
  const { user } = useAuth();

  const progress = ((user?.pokedexCount as number) / 151) * 100;

  return (
    <Box
      as="footer"
      position="fixed"
      bottom="0"
      width="100%"
      borderTopWidth="2px"
      height="4"
      backgroundColor="white"
    >
      <Tooltip
        label={`${user?.pokedexCount} / 151`}
        aria-label="Progress tooltip"
        placement="top-end"
      >
        <Box
          position="absolute"
          left="-100%"
          bottom="0"
          height="100%"
          width="100%"
          backgroundColor="primary"
          transform={`translateX(${progress}%)`}
          transition="transform, 0.2s ease-out"
        />
      </Tooltip>
    </Box>
  );
});

export default Footer;
