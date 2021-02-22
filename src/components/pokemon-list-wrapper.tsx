import React from 'react';
import { Grid } from '@chakra-ui/react';

const PokemonListWrapper: React.FC = ({ children }) => {
  return (
    <Grid templateColumns="repeat(5, minmax(0px, 1fr))" gap={8}>
      {children}
    </Grid>
  );
};

export default PokemonListWrapper;
