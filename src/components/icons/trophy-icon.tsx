import { Icon, IconProps } from '@chakra-ui/react';
import React from 'react';

const TrophyIcon: React.FC<IconProps> = (iconProps) => (
  <Icon fill="currentColor" viewBox="0 0 50 50" {...iconProps}>
    <path d="M25 3l-8 16 1.828 3.756L16 26l-7-4 1-2-8-8.875L5.28 34h11.779A8.935 8.935 0 0017 35c0 .338.022.671.059 1H5.566l1.579 11h35.71l1.577-11h-11.49c.036-.329.058-.662.058-1 0-.338-.022-.671-.059-1h11.78L48 11.125 40 20l1 2-7 4-2.783-3.197L33 19 25 3zm0 26a5.997 5.997 0 015.91 5h-3.094A2.997 2.997 0 0025 32a2.997 2.997 0 00-2.816 2H19.09A5.997 5.997 0 0125 29zm0 5a1.001 1.001 0 010 2 1.001 1.001 0 010-2zm-5.91 2h3.094A2.997 2.997 0 0025 38a2.997 2.997 0 002.816-2h3.094A5.997 5.997 0 0125 41a5.997 5.997 0 01-5.91-5z" />
  </Icon>
);

export default TrophyIcon;
