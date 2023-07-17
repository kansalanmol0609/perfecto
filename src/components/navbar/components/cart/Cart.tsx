//libs
import {gql, useQuery} from '@apollo/client';
import {useSession} from 'next-auth/react';
import {memo, useState, useCallback} from 'react';

//components
import {Badge, Box, Icon} from '@chakra-ui/react';

//icons
import {FaShoppingCart} from 'react-icons/fa';

//utils
import {getCartItemsCount} from './utils/getCartItemsCount';

//types
import {Cart} from '@/types/Cart';

const READ_CART_ITEMS = gql`
  query ReadCartItems {
    readCartItems {
      id
      items {
        count
      }
      userId
    }
  }
`;

const Cart = () => {
  const session = useSession();

  const {data} = useQuery<{
    readCartItems: Cart;
  }>(READ_CART_ITEMS, {
    skip: session.status !== 'authenticated',
  });

  const [isHovering, setIsHovering] = useState(false);

  const cart = data?.readCartItems;

  const count = getCartItemsCount(cart);

  const handleMouseOver = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsHovering(false);
  }, []);

  if (session.status !== 'authenticated') {
    return null;
  }

  return (
    <Box as="button" aria-label="Cart" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <Icon
        as={FaShoppingCart}
        boxSize={{base: 4, md: 6}}
        color={isHovering ? 'brand.500' : 'white'}
      />

      <Badge
        transform="translate(-50%, -100%)"
        borderRadius={12}
        bg="brand.500"
        color="white"
        fontSize={{base: 8, md: 12}}
        fontWeight="medium"
      >
        {count ?? 0}
      </Badge>
    </Box>
  );
};

const MemoizedCart = memo(Cart);

export {MemoizedCart as Cart};
