//libs
import dynamic from 'next/dynamic';

//types
import type {Props} from './types';

export const ConfirmationModal = dynamic<Props>(() => import('./ConfirmationModal'), {
  loading: () => null,
});

export {Props};
