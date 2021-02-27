import React from 'react';
import { Grid } from '@chakra-ui/react';

const PokemonListWrapper: React.FC = ({ children }) => {
  return (
    <Grid
      templateColumns={{
        base: 'repeat(1, minmax(0px, 1fr))',
        sm: 'repeat(2, minmax(0px, 1fr))',
        md: 'repeat(3, minmax(0px, 1fr))',
        lg: 'repeat(4, minmax(0px, 1fr))',
        xl: 'repeat(5, minmax(0px, 1fr))',
        '2xl': 'repeat(7, minmax(0px, 1fr))',
      }}
      gap={{ base: 6, md: 8 }}
    >
      {children}
    </Grid>
  );
};

export default PokemonListWrapper;
