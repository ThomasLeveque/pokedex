import { extendTheme } from '@chakra-ui/react';

import { colors } from '@theme/colors';
import { Button } from '@theme/button';
import { Input } from '@theme/input';
import { Divider } from '@theme/divider';

export interface StyleProps {
  colorMode: 'light' | 'dark';
}

export const theme = extendTheme({
  colors,
  fonts: {
    heading: 'Work Sans',
    body: 'Work Sans',
  },
  components: {
    Button,
    Input,
    Divider,
  },
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
});
