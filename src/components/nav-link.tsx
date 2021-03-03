import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box, Tooltip, Link as ChakraLink } from '@chakra-ui/react';

interface NavLinkProps {
  href: string;
  label: string;
}

const activeBorderSize = '2px';

const NavLink: React.FC<NavLinkProps> = ({ href, label, children }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Tooltip label={label} aria-label="Nav link" placement="right">
      <Box
        position="relative"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p="2"
      >
        {isActive && (
          <Box
            h={{ base: activeBorderSize, lg: '100%' }}
            w={{ base: '100%', lg: activeBorderSize }}
            bg="primary"
            position="absolute"
            left="0"
            bottom="0"
          />
        )}
        <Link href={href} passHref>
          <ChakraLink display="block" my={{ lg: '2' }} maxW="100%">
            {children}
          </ChakraLink>
        </Link>
      </Box>
    </Tooltip>
  );
};

export default NavLink;
