export const Button = {
  baseStyle: {
    fontWeight: 'bold',
  },
  variants: {
    primary: {
      bg: 'primary',
      color: 'white',
      _hover: {
        opacity: 0.85,
        bg: 'primary',
        _disabled: null,
      },
      _disabled: {
        opacity: 0.4,
        bg: 'primary',
      },
    },
    google: {
      bg: 'white',
      color: 'gray.900',
      border: 'gray.400',
      borderWidth: '2px',
      _hover: {
        bg: 'gray.100',
      },
    },
    github: {
      bg: 'gray.900',
      color: 'white',
      _hover: {
        bg: 'gray.700',
      },
    },
  },
};
