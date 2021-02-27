import React, { memo } from 'react';
import { Flex, useColorModeValue, Spacer } from '@chakra-ui/react';

import ColorModeButton from './color-mode-button';
import PokedexNavIcon from './icons/pokedex-nav-icon';
import AllPokemonNavIcon from './icons/all-pokemon-nav-icon';
import ProfilNavIcon from './icons/profil-nav-icon';
import { navWidth, responsiveNavWidth } from '@utils/constants';
import NavLink from './nav-link';

const Nav: React.FC = memo(() => {
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
        <PokedexNavIcon w="12" />
      </NavLink>
      <NavLink href="/all-pokemon" label="All pokemon">
        <AllPokemonNavIcon w="10" />
      </NavLink>
      <NavLink href="/profil" label="Profil">
        <ProfilNavIcon w="10" />
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
