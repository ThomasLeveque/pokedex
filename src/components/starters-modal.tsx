import React, { useMemo } from 'react';
import useSWR from 'swr';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Grid,
} from '@chakra-ui/react';

import { Pokemon } from '@data-types/pokemon.type';
import { getPokemons } from '@libs/pokeapi/db';
import RadioStarter from './radio-starter';
import { useCheckbox } from '@hooks/useCheckbox';
import StarterItem from './starter-item';

const StartersModal: React.FC = () => {
  const { data: starters } = useSWR<Pokemon[]>('starters', () => getPokemons([1, 4, 7, 25]));
  const { onOpen, onClose } = useDisclosure();

  const { data: selectedStarterId, onChange: setStarterId, isChecked } = useCheckbox<number>(0);

  const chosenStarter = useMemo(
    () => starters?.find((starter) => starter.apiId === selectedStarterId),
    [selectedStarterId, starters]
  );

  return (
    <>
      <Button onClick={onOpen}>Pick a starter</Button>
      <Modal isOpen={true} size="3xl" closeOnEsc closeOnOverlayClick onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Choose your starter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(4, minmax(0, 1fr))" gap={4}>
              {starters?.map((starter) => {
                const starterChecked = isChecked(starter.apiId);
                return (
                  <RadioStarter
                    key={starter.apiId}
                    isChecked={starterChecked}
                    onClick={() => (starterChecked ? setStarterId(0) : setStarterId(starter.apiId))}
                  >
                    <StarterItem starter={starter} />
                  </RadioStarter>
                );
              })}
            </Grid>
          </ModalBody>
          <ModalFooter>
            {chosenStarter && (
              <Button mr="4" onClick={onClose}>
                I choose {chosenStarter.name}
              </Button>
            )}
            <Button onClick={onClose}>Not now</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StartersModal;
