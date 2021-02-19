import React from 'react';

import { PokedexReward } from '@utils/format-pokedex-reward';
import { Box, Text } from '@chakra-ui/react';
import TrophyIcon from './trophy-icon';

const PokdexRewardToast: React.FC<PokedexReward> = ({ color, bg, description }) => {
  return (
    <Box
      color={color}
      px={4}
      py={3}
      bg={bg}
      w="auto"
      borderRadius="0.375rem"
      display="flex"
      alignItems="start"
      boxShadow="0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%)"
    >
      <TrophyIcon mr="3" mt="1" w="8" h="8" />
      <Box>
        <Text fontWeight="bold">Well done !</Text>
        <Text>{description}</Text>
      </Box>
    </Box>
  );
};

export default PokdexRewardToast;
