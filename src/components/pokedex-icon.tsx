import { Icon, IconProps } from '@chakra-ui/react';
import React from 'react';

const PokedexIcon: React.FC<IconProps> = (iconProps) => (
  <Icon viewBox="0 0 48 48" fill="primary" {...iconProps}>
    <path d="M33 27h6c3.313 0 6 2.688 6 6 0 3.313-2.688 6-6 6h-6z" fill="#37474F" />
    <path
      d="M43 33c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4zM11 25a8 8 0 000 16z"
      fill="#546E7A"
    />
    {/* primary.dark */}
    <path d="M13 23h19v2H13z" fill="#DD2C00" />
    <path d="M11 25v16h20c3 0 3-3 3-3V25zM31 7H14c-3 0-3 3-3 3v13h23V10s0-3-3-3z" />
    <path
      d="M23 28H10.977c-2.72 0-4.918 2.281-4.918 5s2.199 5 4.918 5H23zM29 19c0 .555-.445 1-1 1H15c-.555 0-1-.445-1-1v-8c0-.555.445-1 1-1h13c.555 0 1 .445 1 1z"
      fill="#263238"
    />
    <path
      d="M31 38a1 1 0 01-1 1H18a1 1 0 01-1-1V28a1 1 0 011-1h12a1 1 0 011 1zM31 20a1 1 0 01-1 1H18a1 1 0 01-1-1V10a1 1 0 011-1h12a1 1 0 011 1z"
      fill="#90A4AE"
    />
    <path d="M19 11h10v8H19zM19 29h10v8H19z" fill="#BBDEFB" />
    <path d="M11 30h2v6h-2z" fill="#ECEFF1" />
    <path d="M9 32h6v2H9z" fill="#ECEFF1" />
    <path
      d="M41 33a1.999 1.999 0 11-4 0 1.999 1.999 0 114 0zM3 32.992V33c0 .3.023.598.05.89.009.04.013.075.016.11H4a1 1 0 100-2h-.93c-.007.04-.015.074-.02.113-.027.29-.05.582-.05.88z"
      fill="#AEEA00"
    />
  </Icon>
);

export default PokedexIcon;
