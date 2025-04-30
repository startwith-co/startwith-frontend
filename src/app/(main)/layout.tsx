import Header from '@/shared/ui/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-[rgba(250,252,255,1)] px-4 sm:px-8 md:px-16 lg:px-32 2xl:px-[300px]">
      <Header />
      {children}
    </div>
  );
}
