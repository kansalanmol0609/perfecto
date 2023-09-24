//libs
import dynamic from 'next/dynamic';

//types
import type {Props} from './types';

export const EditAddressModal = dynamic<Props>(() => import('./EditAddressModal'), {
  loading: () => null,
});

export {Props};
