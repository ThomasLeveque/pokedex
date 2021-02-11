import React from 'react';
import Image from 'next/image';
import { Pokemon } from '@data-types/pokemon.type';
import {
  Box,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Badge,
  Stack,
  Center,
  Grid,
  Text,
  Heading,
} from '@chakra-ui/react';

interface StarterItemProps {
  starter: Pokemon;
}

const StarterItem: React.FC<StarterItemProps> = ({ starter }) => {
  return (
    <Box>
      <Image priority width={475} height={475} src={starter.imageUrl} alt={starter.name} />
      <Stat mt="4">
        <Center flexDirection="column">
          <StatLabel>
            <Stack direction="row">
              {starter.types.map((type) => (
                <Badge
                  color={`${type}.text`}
                  bgGradient={`linear(to-r, ${type}.start, ${type}.end)`}
                  key={`${starter.name}-${type}`}
                >
                  {type}
                </Badge>
              ))}
            </Stack>
          </StatLabel>
          <StatNumber textTransform="capitalize">{starter.name}</StatNumber>
          <StatHelpText>
            {starter.height * 10} cm - {starter.weight / 10} kg
          </StatHelpText>
        </Center>
      </Stat>
      <Grid
        templateColumns="repeat(1, minmax(0, 1fr))"
        gap={1}
        borderWidth="2px"
        borderRadius="md"
        boxShadow="md"
        padding="4"
        mt="1"
      >
        <Heading size="sm" textAlign="center" mb="2">
          Stats
        </Heading>
        {starter.stats.map((stat) => (
          <Box key={stat.name}>
            <Text fontSize="xs">
              <Text as="span" fontWeight="700">
                {stat.name}:
              </Text>{' '}
              {stat.baseStat}
            </Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default StarterItem;
