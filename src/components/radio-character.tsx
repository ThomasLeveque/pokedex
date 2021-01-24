import React from 'react';
import { Box } from '@chakra-ui/react';

interface RadioCharacterProps {
  onClick: () => void;
  isChecked: boolean;
}

const RadioCharacter: React.FC<RadioCharacterProps> = ({ onClick, isChecked, children }) => {
  return (
    <Box
      onClick={onClick}
      cursor="pointer"
      opacity={isChecked ? '1' : '0.5'}
      borderWidth="1px"
      borderRadius="full"
      boxShadow="md"
    >
      {children}
    </Box>
  );
};

export default RadioCharacter;
