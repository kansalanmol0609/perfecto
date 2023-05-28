//utils
import {mode} from '@chakra-ui/theme-tools'; // import utility for setting light and dark mode props
import {tabsAnatomy} from '@chakra-ui/anatomy';
import {StyleFunctionProps, createMultiStyleConfigHelpers} from '@chakra-ui/react';

const {definePartsStyle, defineMultiStyleConfig} = createMultiStyleConfigHelpers(tabsAnatomy.keys);

// define custom sizes
const sizes = {
  sm: definePartsStyle({
    tab: {
      bg: '#F6F1E9',
      px: 4,
      py: 2,
      _selected: {
        _after: {
          display: 'none',
        },
      },
    },

    tablist: {
      flexDirection: 'column',
      gap: 1,
      px: 4,
    },
  }),
};

// define custom variants
const softRoundedVariant = definePartsStyle((props: StyleFunctionProps) => {
  const {colorScheme, size} = props; // add colorScheme as a prop

  return {
    tab: {
      bg: 'white',

      borderRadius: '0px',
      px: 4,
      py: 2,

      _selected: {
        bg: 'brand.500',
        color: 'white',
        borderRadius: '0px',
        position: 'relative',

        _after: {
          content: `""`,
          position: 'absolute',
          left: 0,
          right: 0,
          top: '100%',
          margin: '0 auto',
          width: 0,
          height: 0,
          borderTop: '10px solid',
          borderTopColor: mode(`${colorScheme}.500`, `${colorScheme}.500`)(props),
          borderLeft: '14px solid transparent',
          borderRight: '14px solid transparent',
        },
      },

      _hover: {
        bg: mode(`${colorScheme}.500`, `${colorScheme}.500`)(props),
        color: 'white',
        borderRadius: '0px',
      },
    },

    tablist: {
      flexDirection: size === 'sm' ? 'column' : 'row',
    },
  };
});

const variants = {
  'soft-rounded': softRoundedVariant,
};

// export the component theme
export const tabsTheme = defineMultiStyleConfig({
  sizes,
  variants,
});
