//libs
import {memo, useState, useCallback} from 'react';

//components
import {Badge, Box, Icon} from '@chakra-ui/react';

//icons
import {FaShoppingCart} from 'react-icons/fa';
import {Cart} from '@/types/Cart';

//utils
import {getCartItemsCount} from '../utils/getCartItemsCount';

type Props = {
  cart: Cart | undefined;
  loading: boolean;
};

const Desktop = ({cart}: Props): JSX.Element => {
  const [isHovering, setIsHovering] = useState(false);

  const count = getCartItemsCount(cart);

  const handleMouseOver = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsHovering(false);
  }, []);

  return (
    <Box as="button" aria-label="Cart" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <Icon as={FaShoppingCart} boxSize={6} color={isHovering ? 'brand.500' : 'white'} />

      <Badge
        transform="translate(-50%, -100%)"
        borderRadius={12}
        bg="brand.500"
        color="white"
        fontSize="12"
        fontWeight="medium"
      >
        {count ?? 0}
      </Badge>
    </Box>
  );
};

export default memo(Desktop);
