import { extendTheme } from '@chakra-ui/react';

import { colors } from '@theme/colors';
import { Button } from '@theme/button';
import { Input } from '@theme/input';
import { Divider } from '@theme/divider';
import { CloseButton } from '@theme/close-button';
import { breakpoints } from '@theme/breakpoints';

export interface StyleProps {
  colorMode: 'light' | 'dark';
}

export const theme = extendTheme({
  colors,
  breakpoints,
  fonts: {
    heading: 'Space Mono',
    body: 'Space Mono',
    mono: 'Space Mono',
  },
  components: {
    Button,
    Input,
    Divider,
    CloseButton,
  },
  config: {
    initialColorMode: 'system',
    useSystemColorMode: false,
  },
});
