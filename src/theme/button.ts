import { StyleProps } from '.';

export const Button = {
  baseStyle: {
    fontWeight: 'bold',
  },
  variants: {
    primary: {
      bg: 'primary',
      color: 'white',
      _hover: {
        bg: 'primary-dark',
        _disabled: null,
      },
      _disabled: {
        opacity: 0.4,
        bg: 'primary',
      },
    },
    google: ({ colorMode }: StyleProps): unknown => ({
      bg: colorMode === 'light' ? 'white' : 'gray.400',
      color: 'gray.900',
      borderColor: colorMode === 'light' ? 'gray.200' : 'gray.500',
      borderWidth: '2px',
      _hover: {
        bg: colorMode === 'light' ? 'gray.100' : 'gray.300',
      },
    }),
    github: {
      bg: 'gray.900',
      color: 'white',
      _hover: {
        bg: 'gray.700',
      },
    },
  },
};
