import UserHeader from './userheader';
import VendorHeader from './vendorheader';

interface HeaderProps {
  mode?: 'vendor' | 'user';
}

export default function Header({ mode = 'user' }: HeaderProps) {
  if (mode === 'user') return <UserHeader />;
  return <VendorHeader />;
}
