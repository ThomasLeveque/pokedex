import { Box, useRadio, UseRadioProps } from '@chakra-ui/react';
import React from 'react';

const RadioCharacter: React.FC<UseRadioProps> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" w="calc((100% / 3) - 20px)">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        opacity="0.5"
        borderWidth="1px"
        borderRadius="full"
        boxShadow="md"
        _checked={{
          opacity: '1',
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default RadioCharacter;
