import React, { memo } from 'react';
import { IconButton, useColorMode, IconButtonProps } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const ColorModeButton: React.FC<IconButtonProps> = memo((iconButtonProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
      borderWidth="2px"
      onClick={toggleColorMode}
      {...iconButtonProps}
    />
  );
});

export default ColorModeButton;
