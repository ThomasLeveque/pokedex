export const Button = {
  baseStyle: {
    fontWeight: 'bold',
  },
  variants: {
    solid: {
      bg: 'primary',
      color: 'white',
      _hover: {
        opacity: 0.8,
        bg: 'primary',
        _disabled: null,
      },
      _disabled: {
        opacity: 0.4,
        bg: 'primary',
      },
    },
  },
};
