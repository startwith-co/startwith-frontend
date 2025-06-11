import EditInfo from '@/features/my/ui/edit-info';
import { SessionProvider } from 'next-auth/react';

function MyProfile() {
  return (
    <SessionProvider>
      <section>
        <h1 className="mb-3 text-2xl font-bold">내 정보</h1>
        <div className="relative mb-40 rounded-xl bg-white p-8 shadow-md">
          <EditInfo />
        </div>
      </section>
    </SessionProvider>
  );
}

export default MyProfile;
