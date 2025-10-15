import Footer from '@/shared/ui/footer';
import Header from '@/shared/ui/header';

import VendorProfileSide from '@/widgets/vendorMy/ui/vendor-profile-side';

const routes = [
  { label: '솔루션 등록 관리', href: '/vendor/register' },
  { label: '솔루션 수정 관리', href: '/vendor/update' },
  { label: '정산 관리', href: '/vendor/calculate' },
  { label: '밴더 정보 관리', href: '/vendor/my/profile' },
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-vendor-bg flex w-screen flex-col overflow-y-scroll">
      <Header />
      <main className="mt-10 mb-60 flex w-full items-start">
        <VendorProfileSide routes={routes} />
        {children}
      </main>
      <Footer mode="vendor" />
    </div>
  );
}
