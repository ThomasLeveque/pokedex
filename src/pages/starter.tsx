import React, { useState, useMemo } from 'react';
import { NextPage, GetStaticProps } from 'next';
import Image from 'next/image';
import {
  Box,
  Button,
  Grid,
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import PrivateLayout from '@components/private-layout';
import RadioStarter from '@components/radio-starter';
import { Pokemon } from '@data-types/pokemon.type';
import { useAuth } from '@hooks/useAuth';
import { useCheckbox } from '@hooks/useCheckbox';
import { getPokemons } from '@libs/pokeapi/db';
import { errorToast, successToast } from '@utils/toasts';
import Redirect from '@components/redirect';
import PokemonDetail from '@components/pokemon-detail';

export const getStaticProps: GetStaticProps<StarterPageProps> = async () => {
  const starters = await getPokemons([1, 4, 7, 25]);
  return {
    props: {
      starters,
    },
  };
};

type StarterPageProps = {
  starters: Pokemon[];
};

const Starter: NextPage<StarterPageProps> = ({ starters }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { data: selectedStarterId, onChange: setStarterId, isChecked } = useCheckbox<number>(0);
  const { setUserStarter, saveInPokedex, user } = useAuth();
  const router = useRouter();
  const { onOpen, onClose, isOpen } = useDisclosure();

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
      await saveInPokedex(user?.id as string, chosenStarter, 1);
      await setUserStarter(user?.id as string, {
        starterId: chosenStarter.apiId,
        starterAvatarUrl: chosenStarter.avatarUrl,
        chosenStarterDate: Date.now(),
        updatedAt: Date.now(),
      });
      successToast({
        title: `Well ${chosenStarter.name} is a sweet choice !`,
        description: `may ${chosenStarter.types.join(' and ')} be with you`,
      });
      router.push('/pokedex');
    } catch (err) {
      console.error(err);
      setLoading(false);
      errorToast({ description: err.message });
    }
  };

  if (user?.starterId) {
    return <Redirect to="/pokedex" />;
  }

  return (
    <PrivateLayout title="Pick your starter for this adventure">
      <Heading as="h1" mb="8" size="2xl">
        Choose your starter
      </Heading>
      <Center w="100%" flexDirection={{ base: 'column', md: 'row' }}>
        <Box
          w={{ base: '150px', md: '200px' }}
          mr={{ base: '0', md: '10' }}
          mb={{ base: '10', md: '0' }}
        >
          <Image priority src="/images/chen.png" width={268} height={500} />
        </Box>
        <Center flexDirection="column">
          <Text fontSize="lg" mb="6" textAlign="center">
            Welcome to this adventure ! before becoming the greatest pokemon hunter, you must choose
            your starter.{' '}
          </Text>
          <Grid templateColumns="repeat(4, minmax(0, 1fr))" gap={6} maxW="450px" width="100%">
            {starters.map((starter) => {
              const starterChecked = isChecked(starter.apiId);
              return (
                <RadioStarter
                  key={starter.apiId}
                  isChecked={starterChecked}
                  onClick={() => {
                    setStarterId(starter.apiId);
                    onOpen();
                  }}
                >
                  <Modal
                    isOpen={isOpen}
                    closeOnEsc
                    closeOnOverlayClick
                    onClose={() => {
                      setStarterId(0);
                      onClose();
                    }}
                  >
                    <ModalOverlay />
                    <ModalContent p="8">
                      <ModalCloseButton />
                      <ModalBody p="0">
                        <PokemonDetail pokemon={starter} />
                      </ModalBody>
                      <ModalFooter p="0">
                        <Button
                          m="auto"
                          variant="primary"
                          mt="6"
                          isLoading={loading}
                          onClick={handleChosenStarter}
                        >
                          Pick {chosenStarter?.name}
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </RadioStarter>
              );
            })}
          </Grid>
        </Center>
      </Center>
    </PrivateLayout>
  );
};

export default Starter;
