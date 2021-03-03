import React from 'react';
import { Box, IconButton, useColorModeValue, Fade } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';

import ArrowUpIcon from '@components/icons/arrow-up-icon';
import { progressBarHeight, responsiveNavWidth } from '@utils/constants';

const BackToTop: React.FC = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const { ref, entry } = useInView();

  const handleScrollTop = (): void => {
    window.scrollTo({ top: 0 });
  };

  return (
    <Box position="absolute" top="0" right="0" h="100vh" w="1px" ref={ref}>
      {entry && (
        <Fade in={!entry.isIntersecting} unmountOnExit>
          <IconButton
            onClick={handleScrollTop}
            position="fixed"
            right={{ base: '3', md: '4' }}
            bottom={{
              base: `calc(2rem + ${progressBarHeight} + ${responsiveNavWidth})`,
              lg: `calc(2rem + ${progressBarHeight})`,
            }}
            bg={bg}
            borderWidth="2px"
            variant="outline"
            aria-label="Back to top buttton"
            icon={<ArrowUpIcon />}
          />
        </Fade>
      )}
    </Box>
  );
};

export default BackToTop;
