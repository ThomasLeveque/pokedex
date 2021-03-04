import { createStandaloneToast } from '@chakra-ui/react';

const toast = createStandaloneToast();

interface ToastProps {
  title?: string;
  description?: string;
  duration?: number;
  isClosable?: boolean;
}

export const errorToast = ({ title, description, duration, isClosable }: ToastProps): void => {
  toast({
    position: 'top-right',
    title: title || 'An error occured.',
    description: description || null,
    status: 'error',
    duration: duration || 4000,
    isClosable: isClosable || true,
  });
};

export const warningToast = ({ title, description, duration, isClosable }: ToastProps): void => {
  toast({
    position: 'top-right',
    title: title || 'Warning (!)',
    description: description || null,
    status: 'warning',
    duration: duration || 4000,
    isClosable: isClosable || true,
  });
};

export const infoToast = ({ title, description, duration, isClosable }: ToastProps): void => {
  toast({
    position: 'top-right',
    title: title || 'Info (i)',
    description: description || null,
    status: 'info',
    duration: duration || 4000,
    isClosable: isClosable || true,
  });
};

export const successToast = ({ title, description, duration, isClosable }: ToastProps): void => {
  toast({
    position: 'top-right',
    title: title || 'Success (o)',
    description: description || null,
    status: 'success',
    duration: duration || 4000,
    isClosable: isClosable || true,
  });
};
