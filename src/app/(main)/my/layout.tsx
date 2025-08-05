import Footer from '@/shared/ui/footer';

import ProfileSide from '@/shared/ui/profile-side';
import { auth } from '@/auth';
import Header from '@/shared/ui/header';

const routes = [
  { label: '상세 정보', href: '/my/detail' },
  { label: '내 정보', href: '/my/profile' },
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <>
      <Header />
      <div className="flex w-screen justify-center overflow-y-scroll bg-[rgba(250,252,255,1)]">
        <main className="mt-20 mb-10 flex flex-row justify-center">
          <ProfileSide routes={routes} id={session?.consumerSeq || 0} />
          <div className="flex grow">{children}</div>
        </main>
      </div>
      <Footer />
    </>
  );
}
