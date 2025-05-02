import Footer from '@/shared/ui/footer';
import Header from '@/shared/ui/header';
import ProfileSide from '@/entities/my/ui/profile-side';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex w-screen justify-center overflow-y-scroll bg-[#FAFCFF]">
        <main className="mt-20 flex flex-row justify-center">
          <ProfileSide />
          <div className="flex grow">{children}</div>
        </main>
      </div>
      <Footer />
    </>
  );
}
