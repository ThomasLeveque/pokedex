import React from 'react';
import { Center, Spinner } from '@chakra-ui/react';

const DataLoader: React.FC = () => {
  return (
    <Center>
      <Spinner my="8" />
    </Center>
  );
};

export default DataLoader;
