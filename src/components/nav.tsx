import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Link as ChakraLink,
  Flex,
  Avatar,
  AvatarBadge,
  useColorModeValue,
  Tooltip,
  Box,
  Spacer,
} from '@chakra-ui/react';

import { useAuth } from '@hooks/useAuth';
import ColorModeButton from './color-mode-button';
import PokedexIcon from './pokedex-icon';
import PokeballIcon from './pokeball-icon';
import { navWidth } from '@utils/constants';

const Nav: React.FC = memo(() => {
  const { user } = useAuth();
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Flex
      as="nav"
      flexDirection="column"
      alignItems="center"
      justifyContent="top"
      w={navWidth}
      h="100vh"
      position="fixed"
      top="0"
      left="0"
      py="8"
      bg={bg}
      borderRightWidth="2px"
    >
      <Tooltip label="Pokedex" aria-label="Pokedex link" placement="right">
        <Box mb="3">
          <Link href="/pokedex" passHref>
            <ChakraLink display="block">
              <PokedexIcon w="14" h="14" />
            </ChakraLink>
          </Link>
        </Box>
      </Tooltip>
      <Tooltip label="All pokemon" aria-label="Pokemons link" placement="right">
        <Box mb="3">
          <Link href="/all-pokemon" passHref>
            <ChakraLink display="block" p="2">
              <PokeballIcon w="2.25rem" h="2.25rem" />
            </ChakraLink>
          </Link>
        </Box>
      </Tooltip>
      <Tooltip label="Profil" aria-label="Profil link" placement="right">
        <Box mb="8">
          <Link href="/profil">
            <ChakraLink display="block">
              <Avatar
                ml={user?.starterId ? '4' : 0}
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
        </Box>
      </Tooltip>
      <Spacer />
      <ColorModeButton />
    </Flex>
  );
});

export default Nav;
