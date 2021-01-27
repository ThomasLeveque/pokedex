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
import { errorToast } from '@utils/toasts';

const Header: React.FC = memo(() => {
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(err);
      errorToast({ description: err.message });
    }
  };

  return (
    <Flex as="header" py="4" backgroundColor="white">
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
          <Avatar mr="2" backgroundColor="white" src={`/images/${user?.character}-avatar.png`}>
            {user?.starterAvatarUrl && (
              <AvatarBadge left="-30px" boxSize="2.25em" border="none">
                <Image src={user?.starterAvatarUrl} width={50} height={50} />
              </AvatarBadge>
            )}
          </Avatar>
          <Button onClick={handleSignOut}>Leave</Button>
          <HStack direction="row"></HStack>
        </Flex>
      </Container>
    </Flex>
  );
});

export default Header;
