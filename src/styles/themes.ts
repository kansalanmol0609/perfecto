//utils
import {extendTheme} from '@chakra-ui/react';

export const THEME = extendTheme({
  colors: {
    brand: {
      100: '#ba3b46',
      200: '#61c9a8',
      300: '#ffeedb',
      400: '#ed9b40',
      500: '#AA8F66',
    },
    outline: {
      100: '#ba3b46',
      200: '#61c9a8',
      300: '#ffeedb',
      400: '#ed9b40',
      500: '#AA8F66',
    },
  },
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
  },
  components: {
    Button: {
      variants: {
        outline: {
          border: '1px solid',
          borderColor: 'outline.500',
          color: 'outline.500',
          borderRadius: '0px',
        },
        solid: {
          borderRadius: '0px',
          border: '1px solid',
          borderColor: 'transparent',
          _hover: {
            color: 'brand.500',
            backgroundColor: 'transparent',
            border: '1px solid',
            borderColor: 'outline.500',
          },
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            _focus: {
              boxShadow: '0 0 0 1px #10B981', // remove the default focus box shadow
              borderColor: 'outline.500', // set the focus border color to blue.500
            },
            borderRadius: '0px',
          },
        },
      },
    },
    Select: {
      variants: {
        outline: {
          field: {
            borderRadius: '0px',
          },
        },
      },
    },
  },
});
