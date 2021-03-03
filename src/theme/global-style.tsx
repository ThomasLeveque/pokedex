import React from 'react';
import { Global } from '@emotion/react';
import { useTheme } from '@chakra-ui/react';

export const GlobalStyle: React.FC = () => {
  const theme = useTheme();

  return (
    <Global
      styles={`
      #__next {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
  
        html {
          scroll-behavior: smooth;
        }

        body {
          overscroll-behavior: none;
        }
  
        ::selection {
          background-color: ${theme.colors.primary};
          color: white;
        }
      `}
    />
  );
};
