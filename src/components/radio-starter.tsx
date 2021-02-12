import React from 'react';
import Image from 'next/image';
import { Box } from '@chakra-ui/react';

interface RadioStarterProps {
  onClick: () => void;
  isChecked: boolean;
}

const RadioStarter: React.FC<RadioStarterProps> = ({ onClick, isChecked, children }) => {
  return (
    <Box onClick={onClick} cursor="pointer">
      {isChecked ? (
        children
      ) : (
        <Box>
          <Image src="/images/pokeball.png" width={200} height={200} alt="Pokeball" />
        </Box>
      )}
    </Box>
  );
};

export default RadioStarter;
