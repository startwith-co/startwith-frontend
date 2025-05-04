import Footer from '@/shared/ui/footer';
import Header from '@/shared/ui/header';
import ProfileSide from '@/shared/ui/profile-side';

const routes = [
  { label: '상세 정보', href: '/my/detail' },
  { label: '내 정보', href: '/my/profile' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex w-screen justify-center overflow-y-scroll bg-[rgba(250,252,255,1)]">
        <main className="mt-20 flex flex-row justify-center">
          <ProfileSide routes={routes} companyName="스타트윗" />
          <div className="flex grow">{children}</div>
        </main>
      </div>
      <Footer />
    </>
  );
}
