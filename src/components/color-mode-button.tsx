import React, { memo } from 'react';
import { IconButton, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const ColorModeButton: React.FC = memo(() => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <IconButton
        icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
        borderWidth="2px"
        aria-label="Toggle color mode"
        onClick={toggleColorMode}
      />
    </>
  );
});

export default ColorModeButton;
