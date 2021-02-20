import React, { memo } from 'react';
import { Center, Spinner } from '@chakra-ui/react';

import { useAuth } from '@hooks/useAuth';

const AuthLoading: React.FC = memo(({ children }) => {
  const { userLoaded } = useAuth();

  return (
    <>
      {userLoaded ? (
        children
      ) : (
        <Center w="100%" h="100vh">
          <Spinner size="lg" />
        </Center>
      )}
    </>
  );
});

export default AuthLoading;
