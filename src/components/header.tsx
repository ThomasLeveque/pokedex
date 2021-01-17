import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HStack, Link as ChakraLink, Button, Flex } from '@chakra-ui/react';

import { useAuth } from '@hooks/useAuth';

const Header: React.FC = memo(() => {
  const { signOut, user } = useAuth();

  return (
    <Flex as="header" justify="space-between" px="6" py="4" mb="8" backgroundColor="white">
      <HStack direction="row">
        <Link href="/pokedex" passHref>
          <ChakraLink p="1">Pokedex</ChakraLink>
        </Link>
        <Link href="/pokemons" passHref>
          <ChakraLink p="1">Pokemons</ChakraLink>
        </Link>
      </HStack>
      <HStack direction="row">
        <Image height="50px" width="50px" src={`/images/${user?.character}-avatar.png`} />
        <Button onClick={signOut}>Logout</Button>
      </HStack>
    </Flex>
  );
});

export default Header;
