import React from 'react';
import useSWR from 'swr';
import Image from 'next/image';
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
  Box,
} from '@chakra-ui/react';

import { Pokemon } from '@data-types/pokemon.type';
import { getPokemons } from '@libs/pokeapi/db';

const StartersModal: React.FC = () => {
  const { onOpen, onClose } = useDisclosure();
  const { data: starters } = useSWR<Pokemon[]>('starters', () => getPokemons([1, 4, 7, 25]));

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
              {starters?.map((starter) => (
                <Box key={starter.apiId}>
                  <Image width={475} height={475} src={starter.imageUrl} alt={starter.name} />
                </Box>
              ))}
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Not now</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StartersModal;
