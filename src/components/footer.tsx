import React, { memo } from 'react';
import { Box, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { useAuth } from '@hooks/useAuth';

const Footer: React.FC = memo(() => {
  const bg = useColorModeValue('white', 'gray.800');

  const { user } = useAuth();

  const progress = ((user?.pokedexCount as number) / 151) * 100;

  return (
    <Box
      as="footer"
      position="fixed"
      bottom="0"
      right="0"
      overflow="hidden"
      width="calc(100% - 6rem)"
      borderTopWidth="2px"
      height="1rem"
      bg={bg}
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
