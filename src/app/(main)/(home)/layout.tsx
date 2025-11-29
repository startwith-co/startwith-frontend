import Footer from '@/shared/ui/footer';
import Header from '@/shared/ui/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen overflow-y-scroll">
      <Header />
      <div className="flex grow justify-center">{children}</div>
      <Footer />
    </div>
  );
}
