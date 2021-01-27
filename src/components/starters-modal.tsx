import React, { useMemo, useState } from 'react';
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
  Center,
} from '@chakra-ui/react';

import { Pokemon } from '@data-types/pokemon.type';
import { getPokemons } from '@libs/pokeapi/db';
import RadioStarter from './radio-starter';
import { useCheckbox } from '@hooks/useCheckbox';
import StarterItem from './starter-item';
import { saveInPokedex } from '@libs/firebase/client/db';
import { useAuth } from '@hooks/useAuth';
import { errorToast, successToast } from '@utils/toasts';

const StartersModal: React.FC = () => {
  const { data: starters } = useSWR<Pokemon[]>('starters', () => getPokemons([1, 4, 7, 25]));
  const [loading, setLoading] = useState<boolean>(false);

  const { onOpen, onClose, isOpen } = useDisclosure();
  const { setUserStarter, user } = useAuth();
  const { data: selectedStarterId, onChange: setStarterId, isChecked } = useCheckbox<number>(0);

  const chosenStarter = useMemo(
    () => starters?.find((starter) => starter.apiId === selectedStarterId),
    [selectedStarterId, starters]
  );

  const handleChosenStarter = async () => {
    if (!chosenStarter) {
      errorToast({ description: 'You have to choose a starter' });
      return;
    }

    try {
      setLoading(true);
      successToast({
        title: `Well ${chosenStarter?.name} is a sweet choice !`,
        description: `may ${chosenStarter.types.join(' and ')} be with you`,
      });
      await saveInPokedex(user?.id as string, chosenStarter);
      await setUserStarter(
        user?.id as string,
        chosenStarter?.apiId as number,
        chosenStarter?.avatarUrl as string
      );
    } catch (err) {
      console.error(err);
      setLoading(false);
      errorToast({ description: err.message });
    }
  };

  return (
    <>
      <Center bg="white" borderWidth="1px" borderRadius="md" padding="8">
        <Button onClick={onOpen}>Pick a starter</Button>
      </Center>

      <Modal isOpen={isOpen} size="3xl" closeOnEsc closeOnOverlayClick onClose={onClose}>
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
              <Button
                mr="4"
                isLoading={loading}
                onClick={async () => {
                  await handleChosenStarter();
                  onClose();
                }}
              >
                I choose {chosenStarter.name}
              </Button>
            )}
            <Button
              onClick={() => {
                onClose();
                setStarterId(0);
              }}
            >
              Not now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StartersModal;
