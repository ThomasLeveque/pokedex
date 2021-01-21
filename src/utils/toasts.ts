import { createStandaloneToast } from '@chakra-ui/react';

const toast = createStandaloneToast();

interface ErrorToast {
  title?: string;
  description: string;
  duration?: number;
  isClosable?: boolean;
}

export const errorToast = ({ title, description, duration, isClosable }: ErrorToast): void => {
  toast({
    position: 'top-right',
    title: title || 'An error occured.',
    description,
    status: 'error',
    duration: duration || 5000,
    isClosable: isClosable || true,
  });
};
