import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Link as ChakraLink, Center, Container } from '@chakra-ui/react';

import { useAuth } from '@hooks/useAuth';
import Redirect from './redirect';
import { PokemonLogo } from './icons/pokemon-logo-icon';

interface PublicLayoutProps {
  title: string;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ title, children }) => {
  const { user } = useAuth();

  if (user) {
    return <Redirect to="/pokedex" />;
  }

  return (
    <Container py="6">
      <Head>
        <title>{title}</title>
      </Head>
      <Center mb="12">
        <Link href="/" passHref>
          <ChakraLink>
            <PokemonLogo w="80" />
          </ChakraLink>
        </Link>
      </Center>
      {children}
    </Container>
  );
};

export default PublicLayout;
