import { Icon, IconProps } from '@chakra-ui/react';
import React from 'react';

const FilterIcon: React.FC<IconProps> = (iconProps) => (
  <Icon fill="none" strokeWidth={3} stroke="currentColor" viewBox="0 0 24 24" {...iconProps}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    />
  </Icon>
);

export default FilterIcon;
