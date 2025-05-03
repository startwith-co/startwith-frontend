import Footer from '@/shared/ui/footer';
import Header from '@/shared/ui/header';
import ProfileSide from '@/shared/ui/profile-side';

const routes = [
  { label: '정산 관리', href: '/vendor/my/compensationManage' },
  { label: '상담 관리', href: '/vendor/my/chatManage' },
  { label: '판매자 정보 관리', href: '/vendor/my/profile' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-screen flex-col justify-center overflow-y-scroll bg-[#212121]">
      <Header mode="vendor" />
      <main className="mt-10 mb-10 flex flex-row justify-center px-4 sm:px-8 md:px-16 lg:px-32 2xl:px-[300px]">
        <ProfileSide routes={routes} companyName="스타트 윗" mode="vendor" />
        {children}
      </main>
      <Footer mode="vendor" />
    </div>
  );
}
