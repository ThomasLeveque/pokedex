import React from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

const ArrowUpIcon: React.FC<IconProps> = (iconProps) => (
  <Icon fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24" {...iconProps}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
  </Icon>
);

export default ArrowUpIcon;
