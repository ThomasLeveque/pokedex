import React, { memo } from 'react';
import Link from 'next/link';
import { useAuth } from '@hooks/useAuth';

const Header: React.FC = memo(() => {
  const { signOut } = useAuth();

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
