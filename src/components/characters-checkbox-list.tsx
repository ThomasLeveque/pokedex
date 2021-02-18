import React from 'react';
import Image from 'next/image';
import { Grid } from '@chakra-ui/react';

import { Character } from '@data-types/user.type';
import { allCharacters } from '@utils/all-characters';
import RadioCharacter from './radio-character';

interface CharactersCheckboxListProps {
  isChecked: (item: Character) => boolean;
  onChecked: (item: Character) => void;
}

const CharactersCheckboxList: React.FC<CharactersCheckboxListProps> = ({
  isChecked,
  onChecked,
}) => {
  return (
    <Grid templateColumns="repeat(3, minmax(0, 1fr))" gap={5}>
      {allCharacters.map((character) => {
        const characterChecked = isChecked(character);
        return (
          <RadioCharacter
            key={character}
            onClick={() => onChecked(character)}
            isChecked={characterChecked}
          >
            <Image src={`/images/${character}.png`} width={500} height={500} />
          </RadioCharacter>
        );
      })}
    </Grid>
  );
};

export default CharactersCheckboxList;
