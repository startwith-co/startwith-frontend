import Footer from '@/shared/ui/footer';
import Header from '@/shared/ui/header';
import ProfileSide from '@/shared/ui/profile-side';

const routes = [
  { label: '솔루션 등록 관리', href: '/vendor/register' },
  { label: '실시간 상담 관리', href: '/vendor/chat' },
  { label: '정산 관리', href: '/vendor/calculate' },
  { label: '판매자 정보 관리', href: '/vendor/my/profile' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-vendor-bg flex w-screen flex-col overflow-y-scroll">
      <Header mode="vendor" />
      <main className="mt-10 mb-60 flex w-full">
        <ProfileSide routes={routes} companyName="스타트 윗" mode="vendor" />
        {children}
      </main>
      <Footer mode="vendor" />
    </div>
  );
}
