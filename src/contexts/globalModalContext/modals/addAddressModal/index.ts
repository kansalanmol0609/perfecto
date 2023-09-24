//libs
import dynamic from 'next/dynamic';

//types
import type {Props} from './types';

export const AddAddressModal = dynamic<Props>(() => import('./AddAddressModal'), {
  loading: () => null,
});

export {Props};
