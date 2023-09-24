//types
import {Address} from '@prisma/client';

export type Props = {
  onSuccess: () => void;
  address: Address;
};
