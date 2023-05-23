//libs
import dynamic from 'next/dynamic';

//types
import type {Props} from './types';

export const MakeReservationModal = dynamic<Props>(() => import('./MakeReservationModal'), {
  loading: () => null,
});

export {Props};
