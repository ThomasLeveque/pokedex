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
import PokedexIcon from './icons/pokedex-icon';
import PokeballIcon from './icons/pokeball-icon';
import { navWidth, responsiveNavWidth } from '@utils/constants';

const Nav: React.FC = memo(() => {
  const { user } = useAuth();
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Flex
      as="nav"
      flexDirection={{ base: 'row', lg: 'column' }}
      alignItems="center"
      justifyContent={{ base: 'space-evenly', lg: 'top' }}
      w={{ base: '100%', lg: navWidth }}
      h={{ base: responsiveNavWidth, lg: '100vh' }}
      position="fixed"
      top={{ lg: '0' }}
      bottom={{ base: '0', lg: 'none' }}
      left="0"
      py={{ lg: '8' }}
      bg={bg}
      zIndex="110"
      borderRightWidth={{ lg: '2px' }}
      borderTopWidth={{ base: '2px', lg: '0' }}
    >
      <Tooltip label="Pokedex" aria-label="Pokedex link" placement="right">
        <Box mb={{ lg: '3' }}>
          <Link href="/pokedex" passHref>
            <ChakraLink display="block">
              <PokedexIcon w="14" h="14" />
            </ChakraLink>
          </Link>
        </Box>
      </Tooltip>
      <Tooltip label="All pokemon" aria-label="Pokemons link" placement="right">
        <Box mb={{ lg: '3' }}>
          <Link href="/all-pokemon" passHref>
            <ChakraLink display="block" p="2">
              <PokeballIcon w="2.25rem" h="2.25rem" />
            </ChakraLink>
          </Link>
        </Box>
      </Tooltip>
      <Tooltip label="Profil" aria-label="Profil link" placement="right">
        <Box mb={{ lg: '8' }}>
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
      <Spacer display={{ base: 'none', lg: 'block' }} />
      <ColorModeButton />
    </Flex>
  );
});

export default Nav;
