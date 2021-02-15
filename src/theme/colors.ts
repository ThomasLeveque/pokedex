import { Type } from '@data-types/pokemon.type';

const typesColors: { [type in Type]: { start: string; end: string; text: string } } = {
  normal: {
    start: '#a4acaf',
    end: '#a4acaf',
    text: 'black',
  },
  fighting: {
    start: '#d56723',
    end: '#d56723',
    text: 'black',
  },
  flying: {
    start: '#3dc7ef',
    end: '#bdb9b8',
    text: 'white',
  },
  poison: {
    start: '#b97fc9',
    end: '#b97fc9',
    text: 'black',
  },
  ground: {
    start: '#ab9842',
    end: '#f7de3f',
    text: 'black',
  },
  rock: {
    start: '#a38c21',
    end: '#a38c21',
    text: 'black',
  },
  bug: {
    start: '#729f3f',
    end: '#729f3f',
    text: 'white',
  },
  ghost: {
    start: '#7b62a3',
    end: '#7b62a3',
    text: 'white',
  },
  fire: {
    start: '#fd7d24',
    end: '#fd7d24',
    text: 'black',
  },
  water: {
    start: '#4592c4',
    end: '#4592c4',
    text: 'white',
  },
  grass: {
    start: '#9bcc50',
    end: '#9bcc50',
    text: 'black',
  },
  electric: {
    start: '#eed535',
    end: '#eed535',
    text: 'black',
  },
  psychic: {
    start: '#f366b9',
    end: '#f366b9',
    text: 'black',
  },
  ice: {
    start: '#51c4e7',
    end: '#51c4e7',
    text: 'white',
  },
  dragon: {
    start: '#53a4cf',
    end: '#f16e57',
    text: 'white',
  },
};

export const colors = {
  primary: '#d35821',
  ...typesColors,
};
