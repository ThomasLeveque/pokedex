import React, { memo } from 'react';
import Image from 'next/image';
import { Flex, useColorModeValue, Spacer, Box } from '@chakra-ui/react';

import ColorModeButton from './color-mode-button';
import { navWidth, responsiveNavWidth } from '@utils/constants';
import NavLink from './nav-link';
import { useAuth } from '@hooks/useAuth';

const Nav: React.FC = memo(() => {
  const { user } = useAuth();
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Flex
      as="nav"
      flexDirection={{ base: 'row', lg: 'column' }}
      justifyContent={{ base: 'space-between', lg: 'top' }}
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
      <NavLink href="/pokedex" label="Pokedex">
        <Box w="12">
          <Image priority height={113} width={120} src={`/images/pokedex.png`} />
        </Box>
      </NavLink>
      <NavLink href="/all-pokemon" label="All pokemon">
        <Box w="10">
          <Image priority height={200} width={200} src={`/images/pokeball.png`} />
        </Box>
      </NavLink>
      <NavLink href="/profil" label="Profil">
        <Box w="12" borderWidth="2px" borderRadius="99999px" overflow="hidden">
          <Image priority height={150} width={150} src={`/images/${user?.character}-avatar.png`} />
        </Box>
      </NavLink>
      <Spacer display={{ base: 'none', lg: 'block' }} />
      <ColorModeButton
        mx={{ base: '6', lg: '0' }}
        alignSelf="center"
        aria-label="Nav toggle color mode"
      />
    </Flex>
  );
});

export default Nav;
