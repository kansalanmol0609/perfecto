//libs
import {gql, useQuery} from '@apollo/client';
import {memo} from 'react';
import {useSession} from 'next-auth/react';

//components
import DesktopCart from './variants/Desktop';

//hooks
import {useIsMobileDevice} from '@/hooks/useIsMobileDevice';

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

  const {data, loading} = useQuery<{
    readCartItems: Cart;
  }>(READ_CART_ITEMS, {
    skip: session.status !== 'authenticated',
  });

  const isMobileDevice = useIsMobileDevice();

  if (session.status !== 'authenticated') {
    return null;
  }

  return isMobileDevice ? null : <DesktopCart cart={data?.readCartItems} loading={loading} />;
};

const MemoizedCart = memo(Cart);

export {MemoizedCart as Cart};
