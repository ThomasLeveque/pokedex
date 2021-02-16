import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Link as ChakraLink,
  Flex,
  Avatar,
  AvatarBadge,
  Container,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react';

import { useAuth } from '@hooks/useAuth';
import { PokemonLogo } from './pokemon-logo';
import ColorModeButton from './color-mode-button';

const Header: React.FC = memo(() => {
  const { user } = useAuth();
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Flex as="header" py="4" bg={bg} borderBottomWidth="2px">
      <Container maxW="6xl">
        <Flex justify="space-between" align="center">
          <Link href="/pokedex" passHref>
            <ChakraLink mr="4">
              <PokemonLogo width="100px" height="100%" />
            </ChakraLink>
          </Link>
          <Link href="/pokedex" passHref>
            <ChakraLink fontWeight="700" p="2">
              Pokedex
            </ChakraLink>
          </Link>
          <Link href="/pokemons" passHref>
            <ChakraLink fontWeight="700" p="2">
              Pokemons
            </ChakraLink>
          </Link>
          <Spacer />
          <Link href="/profil">
            <ChakraLink>
              <Avatar
                mr="2"
                backgroundColor="transparent"
                src={`/images/${user?.character}-avatar.png`}
              >
                {user?.starterAvatarUrl && (
                  <AvatarBadge left="-30px" boxSize="2.25em" border="none">
                    <Image
                      key={user?.starterAvatarUrl}
                      src={user?.starterAvatarUrl}
                      width={50}
                      height={50}
                    />
                  </AvatarBadge>
                )}
              </Avatar>
            </ChakraLink>
          </Link>
          <ColorModeButton />
        </Flex>
      </Container>
    </Flex>
  );
});

export default Header;
