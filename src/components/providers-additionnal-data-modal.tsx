import React, { useState, useEffect, memo } from 'react';
import Image from 'next/image';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
  FormLabel,
  FormControl,
  Grid,
} from '@chakra-ui/react';

import RadioCharacter from '@components/radio-character';
import { allCharacters } from '@utils/all-characters';
import { useCheckbox } from '@hooks/useCheckbox';
import { Character } from '@data-types/user.type';
import { auth } from '@libs/firebase/firebase';
import { errorToast } from '@utils/toasts';

interface ProvidersAdditionnalDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (providersPseudo: string, providersCharacter: Character) => Promise<void>;
}

const ProvidersAdditionnalDataModal: React.FC<ProvidersAdditionnalDataModalProps> = memo(
  ({ isOpen, onClose, onSubmit }) => {
    const [providersDataLoading, setProvidersDataLoading] = useState<boolean>(false);
    const [providersPseudo, setProvidersPseudo] = useState<string>('');
    const { data: providersCharacter, onChange: setProvidersCharacter, isChecked } = useCheckbox<
      Character
    >('red');

    useEffect(() => {
      if (isOpen) {
        setProvidersPseudo(auth.currentUser?.displayName as string);
      }
    }, [isOpen]);

    return (
      <Modal
        size="2xl"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Confirm your pseudo and choose a character</ModalHeader>
          <ModalBody>
            <FormControl id="pseudo" isRequired mb="4">
              <FormLabel>Pseudo</FormLabel>
              <Input
                maxLength={40}
                placeholder="Enter a pseudo"
                value={providersPseudo}
                autoComplete="off"
                onChange={(event) => setProvidersPseudo(event.target.value)}
              />
            </FormControl>
            <FormControl id="character" isRequired mb="6">
              <FormLabel>Character</FormLabel>
              <Grid templateColumns="repeat(3, minmax(0, 1fr))" gap={5}>
                {allCharacters.map((character) => {
                  const characterChecked = isChecked(character);
                  return (
                    <RadioCharacter
                      key={character}
                      onClick={() => setProvidersCharacter(character)}
                      isChecked={characterChecked}
                    >
                      <Image src={`/images/${character}.png`} width={500} height={500} />
                    </RadioCharacter>
                  );
                })}
              </Grid>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="primary"
              isLoading={providersDataLoading}
              onClick={async () => {
                if (providersPseudo.length === 0 || providersCharacter.length === 0) {
                  errorToast({ description: 'You must provide all the required data.' });
                  return;
                }
                try {
                  setProvidersDataLoading(true);
                  await onSubmit(providersPseudo, providersCharacter);
                  setProvidersDataLoading(false);
                  onClose();
                } catch (err) {
                  errorToast({ description: err.message });
                  setProvidersDataLoading(false);
                  console.error(err);
                }
              }}
              ml={3}
            >
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
);

export default ProvidersAdditionnalDataModal;
