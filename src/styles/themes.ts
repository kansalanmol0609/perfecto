//utils
import {extendTheme} from '@chakra-ui/react';

//components
import {tabsTheme} from './components/Tabs';

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
          _hover: {
            boxShadow: '0 0 0 1px  #AA8F66',
          },
          _focus: {
            boxShadow: '0 0 0 1px  #AA8F66',
          },
          _active: {
            backgroundColor: 'transparent',
          },
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
            boxShadow: '0 0 0 1px #AA8F66',
          },
          _focus: {
            boxShadow: '0 0 0 1px  #AA8F66',
          },
        },
      },
    },

    Input: {
      variants: {
        outline: {
          field: {
            borderRadius: '0px',
            _focus: {
              boxShadow: '0 0 0 1px #AA8F66', // remove the default focus box shadow
              borderColor: 'outline.500', // set the focus border color to blue.500
            },
            _hover: {
              boxShadow: '0 0 0 1px #AA8F66', // remove the default focus box shadow
              borderColor: 'outline.500',
            },
          },
        },
        filled: {
          field: {
            borderRadius: '0px',
            backgroundColor: 'whiteAlpha.300',
            textAlign: 'center',
            color: 'whiteAlpha.800',
            border: '0px',
            _placeholder: {
              color: 'whiteAlpha.800',
              textAlign: 'center',
            },
            _focus: {
              backgroundColor: 'whiteAlpha.300',
              boxShadow: '0 0 0 0',
              border: '0px',
            },
            _hover: {
              backgroundColor: 'whiteAlpha.300',
              boxShadow: '0 0 0 0',
              border: '0px',
            },
          },
        },
      },
    },

    Select: {
      variants: {
        outline: {
          field: {
            borderRadius: '0px',
            _hover: {
              boxShadow: '0 0 0 1px #AA8F66', // remove the default focus box shadow
              borderColor: 'outline.500',
            },
            _focus: {
              boxShadow: '0 0 0 1px #AA8F66', // remove the default focus box shadow
              borderColor: 'outline.500', // set the focus border color to blue.500
            },
          },
        },
      },
    },

    Modal: {
      baseStyle: {
        dialog: {
          borderRadius: '0',
        },
        overlay: {
          backdropFilter: 'blur(10px)',
          backgroundColor: 'blackAlpha.500',
        },
      },
    },

    Tabs: tabsTheme,
  },
});
