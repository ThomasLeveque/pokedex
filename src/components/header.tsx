import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  HStack,
  Link as ChakraLink,
  Button,
  Flex,
  Avatar,
  AvatarBadge,
  Container,
  Spacer,
} from '@chakra-ui/react';

import { useAuth } from '@hooks/useAuth';
import { PokemonLogo } from './pokemon-logo';

const Header: React.FC = memo(() => {
  const { signOut, user } = useAuth();

  return (
    <Flex as="header" py="4" mb="8" backgroundColor="white">
      <Container maxW="7xl">
        <Flex justify="space-between" align="center">
          <Link href="/pokedex" passHref>
            <ChakraLink mr="4">
              <PokemonLogo width="100px" height="100%" />
            </ChakraLink>
          </Link>
          <Link href="/pokedex" passHref>
            <ChakraLink p="2">Pokedex</ChakraLink>
          </Link>
          <Link href="/pokemons" passHref>
            <ChakraLink p="2">Pokemons</ChakraLink>
          </Link>
          <Spacer />
          <Avatar mr="2" backgroundColor="white" src={`/images/${user?.character}-avatar.png`}>
            {user?.starterAvatarUrl && (
              <AvatarBadge left="0" boxSize="1.25em" border="none">
                <Image src={user?.starterAvatarUrl} width={20} height={20} />
              </AvatarBadge>
            )}
          </Avatar>
          <Button onClick={signOut}>Leave</Button>
          <HStack direction="row"></HStack>
        </Flex>
      </Container>
    </Flex>
  );
});

export default Header;
