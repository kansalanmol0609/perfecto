//libs
import {memo} from 'react';

//components
import {Mobile as MobileNavbar} from './variants/mobile';
import {Desktop as DesktopNavbar} from './variants/desktop';

//hooks
import {useIsMobileDevice} from '@/hooks/useIsMobileDevice';

const Navbar = (): JSX.Element => {
  const isMobileDevice = useIsMobileDevice();

  return isMobileDevice ? <MobileNavbar /> : <DesktopNavbar />;
};

const MemoizedNavbar = memo(Navbar);

export {MemoizedNavbar as Navbar};
