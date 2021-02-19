import { Icon, IconProps } from '@chakra-ui/react';
import React from 'react';

const PokeballIcon: React.FC<IconProps> = (iconProps) => (
  <Icon viewBox="0 0 48 48" fill="primary" {...iconProps}>
    <path d="M24 4C12.953 4 4 12.953 4 24h40c0-11.047-8.953-20-20-20z" />
    <path d="M24 44c11.047 0 20-8.953 20-20H4c0 11.047 8.953 20 20 20z" fill="#E4E8EA" />
    <path
      d="M24 44c11.047 0 20-8.953 20-20 0 0-.16 16-20 16S4 24 4 24c0 11.047 8.953 20 20 20z"
      fill="#CFD8DC"
    />
    <path
      d="M4 24c0 .34.035.668.05 1h39.9c.019-.332.05-.66.05-1 0-.34-.035-.668-.05-1H4.05c-.015.332-.05.66-.05 1z"
      fill="#37474F"
    />
    <path
      d="M30 24c0 3.313-2.688 6-6 6-3.313 0-6-2.688-6-6 0-3.313 2.688-6 6-6 3.313 0 6 2.688 6 6z"
      fill="#FFF"
    />
    <path
      d="M24 20c2.207 0 4 1.793 4 4s-1.793 4-4 4-4-1.793-4-4 1.793-4 4-4m0-2c-3.313 0-6 2.688-6 6 0 3.313 2.688 6 6 6 3.313 0 6-2.688 6-6 0-3.313-2.688-6-6-6z"
      fill="#37474F"
    />
    <path d="M26 24a1.999 1.999 0 11-4 0 1.999 1.999 0 114 0z" fill="#37474F" />
  </Icon>
);

export default PokeballIcon;
