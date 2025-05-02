import Footer from '@/shared/ui/footer';
import Header from '@/shared/ui/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen overflow-y-scroll bg-gradient-to-t from-[#F4F8FF] to-[#F8F4FF]">
      <Header />
      <div className="flex grow justify-center">{children}</div>
      <Footer />
    </div>
  );
}
