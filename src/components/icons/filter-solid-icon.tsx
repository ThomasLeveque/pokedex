import React from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

const FilterSolidIcon: React.FC<IconProps> = (iconProps) => (
  <Icon stroke="currentColor" viewBox="0 0 20 20" {...iconProps}>
    <path
      fillRule="evenodd"
      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
      clipRule="evenodd"
    />
  </Icon>
);

export default FilterSolidIcon;
