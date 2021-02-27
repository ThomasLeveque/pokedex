import React from 'react';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';

import { Pokemon } from '@data-types/pokemon.type';
import { Document } from '@libs/firebase/firebase-types';
import PokemonDetail from './pokemon-detail';

interface PokedexModalProps {
  pokemon: Document<Pokemon>;
}

const PokedexModal: React.FC<PokedexModalProps> = ({ pokemon }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>More details</Button>
      <Modal isOpen={isOpen} closeOnEsc closeOnOverlayClick onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody px="8" pb="8" pt="12">
            <PokemonDetail pokemon={pokemon} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PokedexModal;
