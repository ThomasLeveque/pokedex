import React, { memo } from 'react';
import Link from 'next/link';

import { signOut } from '@libs/client/auth';

const Header: React.FC = memo(() => {
  return (
    <header>
      <Link href="/dashboard">
        <a>Dashboard</a>
      </Link>
      <Link href="/account">
        <a>Account</a>
      </Link>
      <button onClick={signOut}>Logout</button>
    </header>
  );
});

export default Header;
