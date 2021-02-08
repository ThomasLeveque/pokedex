import React, { memo } from 'react';
import { Progress } from '@chakra-ui/react';
import { useAuth } from '@hooks/useAuth';

const Footer: React.FC = memo(() => {
  const { user } = useAuth();

  const progress = ((user?.pokedexCount as number) / 151) * 100;

  return (
    <Progress
      isAnimated
      as="footer"
      position="fixed"
      bottom="0"
      width="100%"
      value={progress}
      min={0}
      max={100}
      borderTopWidth="2px"
      height="4"
      variant="primary"
      backgroundColor="white"
    />
  );
});

export default Footer;
