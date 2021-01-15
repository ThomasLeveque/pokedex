import React, { memo } from 'react';
import Link from 'next/link';

import { signOut } from '@libs/client/auth';

const Header: React.FC = memo(() => {
  return (
    <header>
      <Link href="/pokedex">
        <a>Pokedex</a>
      </Link>
      <Link href="/pokemons">
        <a>Pokemons</a>
      </Link>
      <button onClick={signOut}>Logout</button>
    </header>
  );
});

export default Header;
